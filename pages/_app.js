import NoUserLayout from '../layouts/noUserLayout';
import '../styles/globals.css';
import '../styles/variables.css';

function MyApp({ Component, pageProps }) {
  return (
    <NoUserLayout>
      <Component {...pageProps} />
    </NoUserLayout>
  );
}

export default MyApp;
