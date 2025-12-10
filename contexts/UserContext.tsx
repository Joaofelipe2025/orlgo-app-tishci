
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call your auth API
    console.log('Login attempt:', email);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful login
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email: email,
      };
      setUser(mockUser);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      logout,
      updateUser,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
