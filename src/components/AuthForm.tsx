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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="auth-container"
    >
      <div className="auth-form-container">
        <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        {error && <div className="auth-error">{error}</div>}
        
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
      </div>
    </motion.div>
  );
};

export default AuthForm;
