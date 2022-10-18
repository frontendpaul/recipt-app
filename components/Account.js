import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState(null);

  useEffect(() => {
    getUsersBills();
  }, []);

  const getUsersBills = async () => {
    setLoading(true);
    let { data: bills, error } = await supabase
      .from('bills')
      .select(
        `
        *,
        images (
          *
        )
      `
      )
      .eq('user_id', session.user.id);
    if (error) console.log('error', error);
    else {
      setBills(bills);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
        {!loading &&
          bills.map((bill) => {
            return <div key={bill.id}>{bill.title}</div>;
          })}
      </div>
    </div>
  );
}
