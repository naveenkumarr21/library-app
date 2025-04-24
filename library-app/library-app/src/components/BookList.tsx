import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import type Book from '../types/Book';
import BookCard from './BookCard';
import styles from './BookList.module.scss';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const emptyStateVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface Props {
  books: Book[];
  isFavouriteList?: boolean;
}

const BookList: React.FC<Props> = ({ books, isFavouriteList = false }) => {
  return (
    <div className={styles.bookList}>
      {books.length === 0 ? (
        <motion.div 
          className={styles.emptyState}
          variants={emptyStateVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.emptyIcon}>📚</div>
          <h3>No books found</h3>
          <p>{isFavouriteList ? 'You have no favorite books yet.' : 'Try a different search.'}</p>
        </motion.div>
      ) : (
        <motion.div
          className={styles.bookGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {books.map((book) => (
            <motion.div
              key={book._id}
              variants={itemVariants}
            >
              <BookCard
                book={book}
                isFavourite={isFavouriteList}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BookList;


