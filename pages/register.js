import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiLock, FiMail } from 'react-icons/fi';
import { supabase } from '../utils/supabaseClient';

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegistration = async (email, password) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      await createProfile();
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setIsLoading(false);
      router.push('/');
    }
  };

  async function getCurrentUser() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    if (!session?.user) {
      throw new Error('User not logged in');
    }

    return session.user;
  }

  async function createProfile() {
    try {
      setIsLoading(true);
      const user = await getCurrentUser();

      const updates = {
        id: user.id,
        email: user.email,
      };

      let { error } = await supabase.from('users').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  //TODO: handle form validation
  return (
    <div className="cardPadding">
      <h1 className="heading mb-3">Welcome!</h1>
      <p>
        Let’s create a new account for you. <br />
        Free forever!
      </p>
      <form id="login">
        <div className="formField my-5">
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
        <div className="formField my-5">
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
            className={clsx('btn btn-primary', isLoading && 'disabled')}
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
    </div>
  );
}

export default Register;
