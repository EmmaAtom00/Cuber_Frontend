import { motion } from "framer-motion";

const animate = {
  initial: { opacity: 0, scale: 2 },
  animate: { opacity: 1, scale: 1 },
  // exit: { opacity: 0, x: -100 },
  transition: { duration: 1 },
};

function AnimatePage({ children }) {
  return (
    <motion.div
      variants={animate}
      initial="initial"
      animate="animate"
      exit="exit">
      {children}
    </motion.div>
  );
}
export default AnimatePage;
