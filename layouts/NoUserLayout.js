import clsx from 'clsx';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';

const NoUserLayout = ({ children }) => {
  const { pathname } = useRouter();
  const isForm = pathname === '/register' || pathname === '/login';

  return (
    <div className="page">
      <Head>
        <title>BillKeep - never lose a recipt again.</title>
        <meta
          name="description"
          content="Easily and secure archive all
          important invoices, bills and receipts."
        />
      </Head>
      <motion.div className={clsx('card', isForm && 'isForm')}>
        {children}
      </motion.div>
    </div>
  );
};

export default NoUserLayout;
