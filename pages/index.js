import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import Welcome from '../components/Welcome';
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

  if (isLoading)
    return (
      <div className={clsx('loader', isLoading && 'visible')}>
        <span className="loaderIcon"></span>
      </div>
    );

  if (!session) return <Welcome />;

  return <Dashboard key={session.user.id} session={session} />;
};

export default Home;
