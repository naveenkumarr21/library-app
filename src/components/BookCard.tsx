
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Book from '../types/Book';
import { addToFavourites, removeFromFavourites } from '../redux/bookSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import styles from './BookCard.module.scss';

export const useAppDispatch: () => AppDispatch = useDispatch;

interface Props {
  book: Book;
  isFavourite?: boolean;
}

const BookCard: React.FC<Props> = ({ book, isFavourite = false }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavourite) {
      dispatch(removeFromFavourites(String(book._id)));
    } else {
      dispatch(addToFavourites(book));
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className={`${styles.card} ${isFavourite ? styles.favourite : ''}`}
        onClick={openModal}
        role="button"
        tabIndex={0}
      >
        <div className={styles.imageWrapper}>
          <img
            src={book.thumbnailUrl || '/book-placeholder.jpg'}
            alt={book.title}
            className={styles.image}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`${styles.favouriteBtn} ${isFavourite ? styles.active : ''}`}
            onClick={handleFavourite}
          >
            {isFavourite ? '❤️' : '♡'}
          </motion.button>
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.author}>{book.authors?.join(', ') || 'Unknown Author'}</p>
          <p className={styles.description}>
            {book.shortDescription || 'No description available'}
          </p>
        </div>

        <div className={styles.footer}>
          {book.pageCount && <span className={styles.pages}>{book.pageCount} pages</span>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.viewDetails}
            onClick={openModal}
          >
            View Details
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={styles.closeButton}
                onClick={closeModal}
              >
                ×
              </motion.button>

              <div className={styles.modalContent}>
                <div className={styles.modalImageWrapper}>
                  <img
                    src={book.thumbnailUrl || '/book-placeholder.jpg'}
                    alt={book.title}
                    className={styles.modalImage}
                  />
                </div>

                <div className={styles.modalDetails}>
                  <h2 className={styles.title}>{book.title}</h2>
                  <p className={styles.authors}>
                    By: {book.authors?.join(', ') || 'Unknown Author'}
                  </p>

                  {book.categories && (
                    <p className={styles.categories}>
                      Categories: {book.categories.join(', ')}
                    </p>
                  )}

                  {book.pageCount && (
                    <p className={styles.pageCount}>Pages: {book.pageCount}</p>
                  )}

                  {book.publishedDate && (
                    <p className={styles.publishedDate}>
                      Published: {new Date(book.publishedDate.$date).toLocaleDateString()}
                    </p>
                  )}

                  <div className={styles.description}>
                    <h4>Description</h4>
                    <p>
                      {book.longDescription || book.shortDescription || 'No description available'}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${styles.favouriteModalBtn} ${isFavourite ? styles.active : ''}`}
                    onClick={handleFavourite}
                  >
                    {isFavourite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookCard;