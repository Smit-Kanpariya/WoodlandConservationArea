import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState('');
  const [resetSent, setResetSent] = React.useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter your email address first',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setResetSent(true);
      setResetEmail(email);
      toast({
        title: 'Email Sent',
        description: 'Check your email for the password reset link',
      });
    } catch (error) {
      console.error('Error sending reset email:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send reset email',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Successfully signed in!',
        });
        navigate('/');
      } else {
        if (!firstName || !lastName) {
          throw new Error('First name and last name are required');
        }
        const { error } = await signUp(email, password, { firstName, lastName });
        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Please check your email to confirm your account.',
        });
        // Reset form
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setIsLogin(true); // Switch to login form after signup
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? 'Sign In' : 'Create Account'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Enter your credentials to sign in' : 'Create a new account'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
            </Button>

            {isLogin && (
              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading || !email}
                  className={`text-sm ${!email ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:underline'}`}
                >
                  {loading ? 'Sending reset link...' : 'Forgot your password?'}
                </button>
                {resetSent && (
                  <p className="mt-2 text-sm text-green-600">
                    Reset link sent to {resetEmail}
                  </p>
                )}
              </div>
            )}
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading}
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
