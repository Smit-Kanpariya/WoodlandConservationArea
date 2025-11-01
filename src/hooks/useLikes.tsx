import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/components/ui/use-toast';

// Generate a session ID for anonymous users
const getSessionId = () => {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem('anonymous_session_id');
  if (!sessionId) {
    sessionId = 'anon_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('anonymous_session_id', sessionId);
  }
  return sessionId;
};

interface UseLikesResult {
  likes: number;
  isLiked: boolean;
  loading: boolean;
  toggleLike: () => Promise<void>;
}

export const useLikes = (photoId: string): UseLikesResult => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const fetchLikes = useCallback(async () => {
    if (!photoId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    
    try {
      // Get total likes count for this specific photo
      const { count, error: countError } = await supabase
        .from('photo_likes')
        .select('*', { count: 'exact', head: true })
        .eq('photo_id', photoId);
      
      if (countError) throw countError;
      
      setLikes(count || 0);
      
      // Check if current user/session has liked this photo
      if (user) {
        const { data, error: likeError } = await supabase
          .from('photo_likes')
          .select('id')
          .eq('photo_id', photoId)
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (likeError) throw likeError;
        setIsLiked(!!data);
      } else {
        const sessionId = getSessionId();
        if (sessionId) {
          const { data, error: sessionError } = await supabase
            .from('photo_likes')
            .select('id')
            .eq('photo_id', photoId)
            .eq('session_id', sessionId)
            .maybeSingle();
            
          if (sessionError) throw sessionError;
          setIsLiked(!!data);
        }
      }
    } catch (error) {
      console.error('Error in fetchLikes:', error);
      toast({
        title: 'Error',
        description: 'Failed to load like information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [photoId, user]);

  // Initialize likes on mount and when photoId changes
  useEffect(() => {
    if (photoId) {
      fetchLikes();
    }
  }, [photoId, fetchLikes]);

  // Toggle like status
  const toggleLike = async () => {
    if (loading || !photoId) {
      console.warn('Cannot toggle like: No photo ID provided or operation in progress');
      return;
    }
    
    setLoading(true);
    
    try {
      if (isLiked) {
        // Remove like
        const deleteConditions: any = { photo_id: photoId };
        
        if (user) {
          deleteConditions.user_id = user.id;
        } else {
          const sessionId = getSessionId();
          if (!sessionId) throw new Error('No session ID available');
          deleteConditions.session_id = sessionId;
        }

        const { error } = await supabase
          .from('photo_likes')
          .delete()
          .match(deleteConditions);
          
        if (error) throw error;
        
        setLikes(prev => Math.max(0, prev - 1));
        setIsLiked(false);
      } else {
        // Add like
        const likeData = user 
          ? { photo_id: photoId, user_id: user.id }
          : { photo_id: photoId, session_id: getSessionId() };

        const { error } = await supabase
          .from('photo_likes')
          .insert(likeData);
        
        if (error) throw error;
        
        setLikes(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error in toggleLike:', error);
      toast({
        title: 'Error',
        description: 'Failed to update like. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { likes, isLiked, loading, toggleLike };
};

export default useLikes;