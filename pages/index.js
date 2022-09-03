import { motion } from 'framer-motion';
import Head from 'next/head';

export default function Home() {
  const container = {
    show: {
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.25,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] },
    },
  };

  return (
    <div className="container">
      <Head>
        <title>BillKeep</title>
        <meta
          name="description"
          content="Easily and secure archive all
          important invoices, bills and receipts."
        />
      </Head>

      <motion.div
        className="card"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="imageWrapper">
          <motion.img
            src="receipt.svg"
            alt="An illustration of a receipt laying on the mobile phone with a few coins around it."
            variants={item}
          />
        </div>
        <motion.div className="content" variants={item}>
          <h1 className="heading">
            Never lose <br /> a receipt again
          </h1>
          <p>
            Easily and secure archive all <br /> important invoices, bills and
            receipts.
          </p>
          <div className="buttonsWrapper">
            <button className="btn btn-primary">Create an account</button>
            <button className="btn btn-outline">Log in</button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
