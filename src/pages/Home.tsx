import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookList from '../components/BookList';
import './Home.module.scss'; // Import SCSS module

const Home: React.FC = () => {
    const books = useSelector((state: RootState) => state.books.books);

    return (
        <div>
            <h2 className="text-center mt-4">Library Home</h2>
            <BookList books={books} />
        </div>
    );
};

export default Home;
