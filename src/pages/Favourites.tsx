// src/pages/Favourites.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookList from '../components/BookList';
import styles from './Favorites.module.scss';

const Favourites: React.FC = () => {
    const favourites = useSelector((state: RootState) => state.books.favourites);

    return (
        <div className={styles.favoritesContainer}>
            <h2 className={`${styles.title} text-center mt-4`}>Favourites</h2>
            {favourites.length === 0 ? (
                <p className={styles.emptyMessage}>No favorite books yet.</p>
            ) : (
                <div className={styles.bookListWrapper}>
                    <BookList books={favourites} isFavouriteList />
                </div>
            )}
        </div>
    );
};

export default Favourites;