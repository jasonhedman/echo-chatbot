import { motion } from 'framer-motion';
import { Logo } from './logo';

export const Greeting = () => {
  return (
    <div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20 px-8 size-full flex flex-col justify-center items-center gap-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold"
      >
        <Logo className="size-24" />
      </motion.div>
      <div className="flex flex-col items-center justify-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold"
        >
          Welcome to Echo Chat
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-zinc-500 max-w-md text-center"
        >
          A reference implementation of Echo in a feature-complete Next.js
          chatbot
        </motion.div>
      </div>
    </div>
  );
};
