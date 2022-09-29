import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Account from '../components/Account';
import { supabase } from '../utils/supabaseClient';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session);
        }

        setIsLoading(false);
      }
    }

    getInitialSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      mounted = false;

      subscription?.unsubscribe();
    };
  }, []);

  const container = {
    show: {
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.25,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
    },
  };

  return (
    <motion.div
      className="cardLayout"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {!session ? (
        <>
          <div className="imageWrapper">
            <motion.img
              src="receipt.svg"
              alt="An illustration of a receipt laying on the mobile phone with a few coins around it."
              variants={item}
            />
          </div>
          <motion.div className="content" variants={item}>
            <h1 className="heading">
              Never lose <br /> a receipt again
            </h1>
            <p>
              Easily and secure archive all <br /> important invoices, bills and
              receipts.
            </p>
            <div className="buttonsWrapper">
              <Link href="register">
                <a className="btn btn-primary">Create an account</a>
              </Link>
              <Link href="login">
                <a className="btn btn-outline">Log in</a>
              </Link>
            </div>
          </motion.div>
        </>
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </motion.div>
  );
};

export default Home;
