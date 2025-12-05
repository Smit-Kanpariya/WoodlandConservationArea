import { useState, useEffect, createContext, useContext, useCallback, useRef } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Token refresh interval (55 minutes to be safe, as tokens expire in 1 hour)
const TOKEN_REFRESH_INTERVAL = 55 * 60 * 1000;

interface UserMetadata {
  firstName?: string;
  lastName?: string;
  signup_date?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: AuthError | null;
  signUp: (email: string, password: string, userData?: { firstName: string; lastName: string }) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  refreshSession: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle token refresh
  const setupTokenRefresh = useCallback((session: Session | null) => {
    // Clear any existing interval
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    // Only set up refresh if we have a valid session
    if (session?.access_token) {
      const interval = setInterval(async () => {
        try {
          const { data, error: refreshError } = await supabase.auth.refreshSession();
          if (refreshError) throw refreshError;
          setSession(data.session);
          setUser(data.user);
        } catch (err) {
          console.error('Error refreshing session:', err);
          setError(err as AuthError);
        }
      }, TOKEN_REFRESH_INTERVAL);

      refreshIntervalRef.current = interval;
    }
  }, []);

  // Handle auth state changes
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Set up token refresh when session changes
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setupTokenRefresh(session);
        } else if (event === 'SIGNED_OUT') {
          if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
            refreshIntervalRef.current = null;
          }
        }
      }
    );

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession) {
          setupTokenRefresh(currentSession);
        }
      } catch (err) {
        setError(err as AuthError);
        console.error('Error initializing auth:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [setupTokenRefresh]);

  const signUp = async (email: string, password: string, userData?: { firstName: string; lastName: string }) => {
    try {
      setError(null);
      const redirectUrl = `${window.location.origin}/`;

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: userData?.firstName,
            last_name: userData?.lastName,
            signup_date: new Date().toISOString(),
          },
        },
      });

      if (error) throw error;

      // After successful signup, we'll update the user's profile in a separate table
      if (userData) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              email: user.email,
              first_name: userData.firstName,
              last_name: userData.lastName,
              updated_at: new Date().toISOString(),
            });

          if (profileError) {
            console.error('Error updating profile:', profileError);
            // Don't fail the signup if profile update fails
          }
        }
      }

      return { error: null };
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      console.error('Sign up error:', authError);
      return { error: authError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { error: null };
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      console.error('Sign in error:', authError);
      return { error: authError };
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
      return { error: null };
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      console.error('Sign out error:', authError);
      return { error: authError };
    }
  };

  const refreshSession = async () => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.refreshSession();

      if (error) throw error;

      setSession(data.session);
      setUser(data.user);
      return { error: null };
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      console.error('Session refresh error:', authError);
      return { error: authError };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        error,
        signUp,
        signIn,
        signOut,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};