const Header = ({ title, children }) => {
  return (
    <header className="cardHeader">
      <h1 className="headline">{title}</h1>
      {children}
    </header>
  );
};
export default Header;
