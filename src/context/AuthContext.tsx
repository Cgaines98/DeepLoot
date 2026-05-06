import React, { createContext, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setAuthToken } from '../services/api';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = React.useState<string | null>(null);
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    loginWithRedirect, 
    logout: auth0Logout,
    getAccessTokenSilently
  } = useAuth0();

  useEffect(() => {
    const updateToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: 'https://api.mockfield.com',
            }
          });
          setAuthToken(token);
          setToken(token);
        } catch (e: any) {
          // If audience is missing or login is required, don't crash
          console.warn('Silent token acquisition failed', e.error || e.message);
          setAuthToken(null);
          setToken(null);
        }
      } else {
        setAuthToken(null);
        setToken(null);
      }
    };
    updateToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  const login = () => {
    loginWithRedirect();
  };

  const logout = () => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const formattedUser = user ? {
    name: user.name || '',
    email: user.email || ''
  } : null;

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      token,
      user: formattedUser, 
      login, 
      logout 
    }}>
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
