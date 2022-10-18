import { FiUser } from 'react-icons/fi';

const Header = ({ title }) => {
  return (
    <header className="cardHeader">
      <h1 className="headline">{title}</h1>
      <button className="btn btn-grey btn-with-icon round">
        <FiUser />
      </button>
    </header>
  );
};
export default Header;
