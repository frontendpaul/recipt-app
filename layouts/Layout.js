import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <main className="page">
      <Head>
        <title>BillKeep - never lose a recipt again.</title>
        <meta
          name="description"
          content="Easily and secure archive all
          important invoices, bills and receipts."
        />
      </Head>
      <div className="card">{children}</div>
    </main>
  );
};

export default Layout;
