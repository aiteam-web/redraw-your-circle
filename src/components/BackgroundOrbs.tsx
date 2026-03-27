import { motion } from "framer-motion";

const BackgroundOrbs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
    />
    <motion.div
      animate={{ x: [0, -25, 15, 0], y: [0, 25, -10, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-bubble-3/15 blur-3xl"
    />
    <motion.div
      animate={{ x: [0, 20, -15, 0], y: [0, -15, 25, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-20 right-10 w-56 h-56 rounded-full bg-bubble-2/12 blur-3xl"
    />
    <motion.div
      animate={{ x: [0, -10, 20, 0], y: [0, 20, -20, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-bubble-5/10 blur-3xl"
    />
  </div>
);

export default BackgroundOrbs;
