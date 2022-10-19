import clsx from 'clsx';
import { FiArrowRight } from 'react-icons/fi';
import Header from './Header';

const OffscreenCard = ({ title, isOpen, setIsOpen, children }) => {
  return (
    <aside className={clsx('offscreenCard', isOpen && 'open')}>
      <Header title={title}>
        <button
          className="btn btn-outline btn-with-icon round"
          onClick={() => setIsOpen(false)}
        >
          <FiArrowRight />
        </button>
      </Header>

      {children}
    </aside>
  );
};
export default OffscreenCard;
