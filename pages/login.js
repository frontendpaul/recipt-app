import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiMail } from 'react-icons/fi';
import { supabase } from '../utils/supabaseClient';

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push('/');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  //TODO: handle form validation
  return (
    <div className="cardPadding">
      <h1 className="heading">Hello again!</h1>
      <p>Enter your credentials to log in.</p>
      <form id="login">
        <div className="formField">
          <label htmlFor="email">
            <FiMail />
            <span>Email</span>
          </label>
          <input
            type="email"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Please enter valid email</p>
        </div>
        <div className="formField">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>Password invalid</p>
        </div>
        <div className="buttonsWrapper">
          <button
            type="submit"
            className={clsx('btn btn-primary', loading && 'disabled')}
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email, password);
            }}
          >
            Log in
          </button>
          <div className="devider">
            <span>or</span>
          </div>
          <button type="submit" className="btn btn-outline icon-left">
            <FcGoogle />
            <span>Log in with Google</span>
          </button>
        </div>
      </form>
      <footer className="cardFooter">
        <p>
          Don&apos;t have an account yet? <Link href="register">Sign up</Link>
        </p>
      </footer>
    </div>
  );
}

export default Login;
