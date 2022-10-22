import { useEffect, useState } from 'react';
import { FiChevronRight, FiLogOut, FiPlus, FiUser } from 'react-icons/fi';
import { supabase } from '../utils/supabaseClient';
import Create from './Create';
import EmptyState from './EmptyState';
import Header from './Header';
import OffscreenCard from './OffscreenCard';

const Dashboard = ({ session }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bills, setBills] = useState([]);
  const [isEmptyList, setIsEmptyList] = useState(true);
  const [newDocumentId, setNewDocumentId] = useState(0);

  useEffect(() => {
    getUsersBills();
  }, []);

  useEffect(() => {
    setIsEmptyList(bills.length === 0);
    setNewDocumentId(bills.length + 1);
  }, [bills]);

  // const getUsersBills = async () => {
  //   setIsLoading(true);
  //   let { data: bills, error } = await supabase
  //     .from('bills')
  //     .select(
  //       `
  //       *,
  //       images (
  //         *
  //       )
  //     `
  //     )
  //     .eq('user_id', session.user.id);
  //   if (error) console.log('error', error);
  //   else {
  //     setBills(bills);
  //     setIsLoading(false);
  //   }
  // };
  const getUsersBills = async () => {
    setIsLoading(true);
    let { data: bills, error } = await supabase
      .from('bills')
      .select('*')
      .eq('user_id', session.user.id);
    if (error) console.log('error', error);
    else {
      setBills(bills);
      setIsLoading(false);
    }
  };

  const currentDate = new Date();

  return (
    <div className="dashboard">
      {/* <div className={clsx('overlay', isProfileOpen && 'blurred')}></div> */}

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
        title="Create new document"
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
      >
        <Create
          setIsCreateOpen={setIsCreateOpen}
          bills={bills}
          setBills={setBills}
          newDocumentId={newDocumentId}
          session={session}
          currentDate={currentDate}
        />
      </OffscreenCard>

      {!isLoading &&
        (isEmptyList ? (
          <EmptyState createClickHandler={() => setIsCreateOpen(true)} />
        ) : (
          <div className="cardPadding pt-0">
            <div className="billsList">
              {bills.map((bill) => {
                return (
                  <div className="bill" key={bill.id}>
                    <h3 className="headline">{bill.title}</h3>
                    <span className="footnote">{bill.id}</span>
                    <br />
                    <span className="footnote">{bill.created_at}</span>
                  </div>
                );
              })}
            </div>
            <button
              className="btn btn-primary btn-with-icon mx-auto my-5"
              onClick={() => setIsCreateOpen(true)}
            >
              <FiPlus />
            </button>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
