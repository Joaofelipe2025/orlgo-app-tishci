
import * as SecureStore from 'expo-secure-store';
import { supabase } from '@/app/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

const SESSION_KEY = 'orlgo_session';
const USER_KEY = 'orlgo_user';

// ============================================
// SECURE STORAGE
// ============================================

export async function saveSession(session: Session) {
  try {
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
    console.log('Session saved securely');
  } catch (error) {
    console.error('Error saving session:', error);
    throw error;
  }
}

export async function getStoredSession(): Promise<Session | null> {
  try {
    const sessionString = await SecureStore.getItemAsync(SESSION_KEY);
    if (sessionString) {
      return JSON.parse(sessionString);
    }
    return null;
  } catch (error) {
    console.error('Error getting stored session:', error);
    return null;
  }
}

export async function clearSession() {
  try {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
    console.log('Session cleared');
  } catch (error) {
    console.error('Error clearing session:', error);
  }
}

// ============================================
// AUTHENTICATION
// ============================================

export async function signUp(email: string, password: string, fullName?: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) throw error;

    if (data.session) {
      await saveSession(data.session);
    }

    return { user: data.user, session: data.session };
  } catch (error: any) {
    console.error('Sign up error:', error);
    throw new Error(error.message || 'Erro ao criar conta');
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    if (data.session) {
      await saveSession(data.session);
    }

    return { user: data.user, session: data.session };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw new Error(error.message || 'Email ou senha incorretos');
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    await clearSession();
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw new Error(error.message || 'Erro ao sair');
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    
    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error('Reset password error:', error);
    throw new Error(error.message || 'Erro ao enviar email de recuperação');
  }
}

export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error('Update password error:', error);
    throw new Error(error.message || 'Erro ao atualizar senha');
  }
}

export async function deleteAccount() {
  try {
    // First, get the current user
    const user = await getCurrentUser();
    if (!user) throw new Error('Usuário não encontrado');

    // Delete user profile and related data
    // This will cascade delete due to foreign key constraints
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', user.id);

    if (profileError) throw profileError;

    // Sign out
    await signOut();

    return { success: true };
  } catch (error: any) {
    console.error('Delete account error:', error);
    throw new Error(error.message || 'Erro ao deletar conta');
  }
}

// ============================================
// SESSION MANAGEMENT
// ============================================

export async function refreshSession(): Promise<Session | null> {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error) throw error;
    
    if (data.session) {
      await saveSession(data.session);
      return data.session;
    }
    
    return null;
  } catch (error) {
    console.error('Refresh session error:', error);
    return null;
  }
}

export async function initializeAuth(): Promise<User | null> {
  try {
    // Try to get stored session
    const storedSession = await getStoredSession();
    
    if (storedSession) {
      // Set the session in Supabase
      const { data, error } = await supabase.auth.setSession({
        access_token: storedSession.access_token,
        refresh_token: storedSession.refresh_token
      });
      
      if (error) {
        console.error('Error setting session:', error);
        await clearSession();
        return null;
      }
      
      return data.user;
    }
    
    // Check if there's an active session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      await saveSession(session);
      return session.user;
    }
    
    return null;
  } catch (error) {
    console.error('Initialize auth error:', error);
    return null;
  }
}

// ============================================
// AUTH STATE LISTENER
// ============================================

export function onAuthStateChange(callback: (user: User | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (session) {
        await saveSession(session);
        callback(session.user);
      } else {
        await clearSession();
        callback(null);
      }
    }
  );

  return subscription;
}
