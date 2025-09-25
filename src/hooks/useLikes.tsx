import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

// Generate a session ID for anonymous users
const getSessionId = () => {
  let sessionId = localStorage.getItem('anonymous_session_id');
  if (!sessionId) {
    sessionId = 'anon_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('anonymous_session_id', sessionId);
  }
  return sessionId;
};

export const useLikes = (photoId: string) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch like count and user's like status
  const fetchLikes = useCallback(async () => {
    try {
      // Get total likes count
      const { count } = await supabase
        .from('photo_likes')
        .select('*', { count: 'exact', head: true })
        .eq('photo_id', photoId);

      setLikes(count || 0);

      // Check if current user/session has liked
      if (user) {
        const { data } = await supabase
          .from('photo_likes')
          .select('id')
          .eq('photo_id', photoId)
          .eq('user_id', user.id)
          .single();
        setIsLiked(!!data);
      } else {
        const sessionId = getSessionId();
        const { data } = await supabase
          .from('photo_likes')
          .select('id')
          .eq('photo_id', photoId)
          .eq('session_id', sessionId)
          .single();
        setIsLiked(!!data);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  }, [photoId, user]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  // Toggle like status
  const toggleLike = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      if (isLiked) {
        // Remove like
        if (user) {
          await supabase
            .from('photo_likes')
            .delete()
            .eq('photo_id', photoId)
            .eq('user_id', user.id);
        } else {
          const sessionId = getSessionId();
          await supabase
            .from('photo_likes')
            .delete()
            .eq('photo_id', photoId)
            .eq('session_id', sessionId);
        }
        setLikes(prev => prev - 1);
        setIsLiked(false);
      } else {
        // Add like
        const likeData = user 
          ? { photo_id: photoId, user_id: user.id }
          : { photo_id: photoId, session_id: getSessionId() };

        await supabase
          .from('photo_likes')
          .insert(likeData);
        
        setLikes(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  return { likes, isLiked, loading, toggleLike };
};