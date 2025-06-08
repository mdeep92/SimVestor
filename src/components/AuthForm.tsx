import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { motion } from 'framer-motion';

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin = true }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Test credentials
  const TEST_EMAIL = 'tester1234@gmail.com';
  const TEST_PASSWORD = '123456';

  const { 
    signInWithEmail, 
    signUpWithEmail, 
    signInWithGoogle, 
    signInWithApple,
    loginAsTestUser 
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to authenticate');
    }

    setLoading(false);
  };

  const handleTestSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await loginAsTestUser();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with test account');
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithApple();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Apple');
    }
  };

  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="auth-layout"
      >
        <div className="auth-image" />
        <motion.div 
          className="auth-form-container"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isLogin 
              ? 'Sign in to continue your investing journey' 
              : 'Start your investing journey with Simvestor'}
          </p>
          
          {error && <div className="auth-error mb-6">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="auth-submit" 
            disabled={loading}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button 
            type="button"
            onClick={handleTestSignIn}
            className="auth-submit test-signin"
            disabled={loading}
          >
            Sign In with Test Account
          </button>

          <div className="test-credentials">
            <p>Test Account:</p>
            <p>Email: {TEST_EMAIL}</p>
            <p>Password: {TEST_PASSWORD}</p>
          </div>

          <div className="social-auth">
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              className="google-auth"
              disabled={loading}
            >
              <FcGoogle />
              <span>Continue with Google</span>
            </button>

            <button 
              type="button"
              onClick={handleAppleSignIn}
              className="apple-auth"
              disabled={loading}
            >
              <BsApple />
              <span>Continue with Apple</span>
            </button>
          </div>
        </form>

        <p className="auth-switch">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <a href="#" onClick={() => window.location.hash = 'signup'}>
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <a href="#" onClick={() => window.location.hash = 'login'}>
                Sign in
              </a>
            </>
          )}
        </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AuthForm;
