import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FiChevronRight, FiLogOut, FiUser } from 'react-icons/fi';
import { supabase } from '../utils/supabaseClient';
import Header from './Header';
import OffscreenCard from './OffscreenCard';

const Dashboard = ({ session }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
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
    <div className="dashboard">
      <div className={clsx('overlay', isProfileOpen && 'blurred')}></div>

      <Header title="Your documents">
        <button
          className="btn btn-grey btn-with-icon round"
          onClick={() => setIsProfileOpen(true)}
        >
          <FiUser />
        </button>
      </Header>

      <OffscreenCard
        title="Profile"
        isOpen={isProfileOpen}
        setIsOpen={setIsProfileOpen}
      >
        <div className="avatar">
          <FiUser />
        </div>
        <h2 className="heading mb-1">Name Lastname</h2>
        <span className="footnote color-stone-500">sample.mail@gmail.com</span>
        <nav className="settingsNav">
          <ul>
            <li>
              <button
                className="btn btn-white icon-left"
                onClick={() => setIsEditProfileOpen(true)}
              >
                <FiUser />
                <span>Edit profile</span>
                <div className="chevronIcon">
                  <FiChevronRight />
                </div>
              </button>
            </li>
            <li>
              <button
                className="btn btn-white icon-left"
                onClick={() => supabase.auth.signOut()}
              >
                <FiLogOut />
                <span>Sign out</span>
                <div className="chevronIcon">
                  <FiChevronRight />
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </OffscreenCard>

      <OffscreenCard
        title="Edit Profile"
        isOpen={isEditProfileOpen}
        setIsOpen={setIsEditProfileOpen}
      >
        {/* TODO: implement edit profile card */}
        <p>Change name</p>
        <p>Change avatar</p>
        <p>Change email</p>
        <p>Change password</p>
        <p>Delete accound</p>
      </OffscreenCard>

      {!loading &&
        bills.map((bill) => {
          return <div key={bill.id}>{bill.title}</div>;
        })}
    </div>
  );
};

export default Dashboard;
