import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FiChevronRight, FiLogOut, FiUser } from 'react-icons/fi';
import { supabase } from '../utils/supabaseClient';
import EmptyState from './EmptyState';
import Header from './Header';
import OffscreenCard from './OffscreenCard';

const Dashboard = ({ session }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);
  const [isEmptyList, setIsEmptyList] = useState(true);

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
      setIsEmptyList(bills.length === 0);
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

      <OffscreenCard
        title="Create new"
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
      >
        {/* TODO: implement create card */}
        <p>create new item</p>
      </OffscreenCard>

      {!loading &&
        (isEmptyList ? (
          <EmptyState createClickHandler={() => setIsCreateOpen(true)} />
        ) : (
          bills.map((bill) => {
            return <div key={bill.id}>{bill.title}</div>;
          })
        ))}
    </div>
  );
};

export default Dashboard;
