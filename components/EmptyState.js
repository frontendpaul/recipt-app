import { FiPlus } from 'react-icons/fi';

const EmptyState = ({ createClickHandler }) => {
  return (
    <div className="emptyState">
      <div className="emptyStateImageWrapper">
        <img src="/empty-state.svg" alt="" />
      </div>

      <h1 className="heading mb-3">
        Looks like you have no documents stored yet.
      </h1>
      <p>
        Let’s add your first one! Simply <br /> scan a QR code or take o photo.
      </p>

      <button
        className="btn btn-primary btn-with-icon"
        onClick={createClickHandler}
      >
        <FiPlus />
      </button>
    </div>
  );
};
export default EmptyState;
