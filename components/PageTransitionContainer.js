import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const variants = {
  in: {
    opacity: 1,
    y: 20,
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
    },
  },
  inactive: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
    },
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const PageTansitionContainer = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={asPath}
        variants={variants}
        initial="in"
        animate="inactive"
        exit="out"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTansitionContainer;
