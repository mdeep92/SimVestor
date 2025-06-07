import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '../firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  loginAsTestUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginAsTestUser = async () => {
    // Create a mock user object that matches Firebase User interface
    const mockUser = {
      email: 'tester1234@gmail.com',
      uid: 'test-user-123',
      displayName: 'Test User',
      photoURL: null,
      phoneNumber: null,
      providerId: 'password',
      emailVerified: true,
      isAnonymous: false,
      metadata: {
        creationTime: Date.now().toString(),
        lastSignInTime: Date.now().toString()
      },
      providerData: [],
      refreshToken: 'mock-refresh-token',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => 'mock-token',
      getIdTokenResult: async () => ({ token: 'mock-token', claims: {}, signInProvider: 'password', expirationTime: '', authTime: '', issuedAtTime: '' }),
      reload: async () => {},
      toJSON: () => ({}),
      // Additional required methods from User interface
      updatePassword: async () => {},
      updateEmail: async () => {},
      updatePhoneNumber: async () => {},
      updateProfile: async () => {},
      linkWithPopup: async () => ({ user: mockUser, credential: null }),
      unlink: async () => mockUser,
      reauthenticateWithPopup: async () => ({ user: mockUser, credential: null }),
      // Any additional methods from the User interface
      multiFactor: {
        enrolledFactors: [],
        getSession: async () => ({ auth: {} }),
        unenroll: async () => mockUser,
        enroll: async () => mockUser,
      }
    };

    // Set the mock user as unknown first to satisfy TypeScript
    setUser(mockUser as unknown as User);
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Email sign in error:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Email sign up error:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const signInWithApple = async () => {
    try {
      await signInWithPopup(auth, appleProvider);
    } catch (error) {
      console.error('Apple sign in error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithApple,
    loginAsTestUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
