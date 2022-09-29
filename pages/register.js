import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiLock, FiMail } from 'react-icons/fi';
import { supabase } from '../utils/supabaseClient';

function Register() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegistration = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      router.push('/');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="heading">Welcome!</h1>
      <p>
        Let’s create a new account for you. <br />
        Free forever!
      </p>
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
          <label htmlFor="password">
            <FiLock />
            <span>Password</span>
          </label>
          <input
            type="password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>Please enter valid email</p>
        </div>
        <div className="buttonsWrapper">
          <button
            type="submit"
            className={clsx('btn btn-primary', loading && 'disabled')}
            onClick={(e) => {
              e.preventDefault();
              handleRegistration(email, password);
            }}
          >
            Create an account
          </button>
          <div className="devider">
            <span>or</span>
          </div>
          <button type="submit" className="btn btn-outline icon-left">
            <FcGoogle />
            <span>Sign up with Google</span>
          </button>
        </div>
      </form>
      <footer className="cardFooter">
        <p>
          Already have an account? <Link href="login">Log in</Link>
        </p>
      </footer>
    </>
  );
}

export default Register;
