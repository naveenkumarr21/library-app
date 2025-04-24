import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookList from '../components/BookList';
import styles from './Search.module.scss';

const ITEMS_PER_PAGE = 10;

const Search: React.FC = () => {
    const books = useSelector((state: RootState) => state.books.books);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            // Check if sidebar is expanded in localStorage
            const savedState = localStorage.getItem('sidebarExpanded');
            setIsSidebarExpanded(savedState ? JSON.parse(savedState) : window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);
        // Also listen for custom event from navbar when sidebar toggles
        window.addEventListener('sidebarToggle', handleResize);

        // Initial check
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('sidebarToggle', handleResize);
        };
    }, []);

    // Memoize filtered books
    const filteredBooks = useMemo(() => {
        return books.filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase())
        );
    }, [books, query]);

    const totalPages = useMemo(() => {
        return Math.ceil(filteredBooks.length / ITEMS_PER_PAGE) || 1;
    }, [filteredBooks]);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, filteredBooks]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const maxVisible = windowWidth <= 768 ? 3 : 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        const pages = [];
        
        if (startPage > 1) {
            pages.push(
                <button key={1} onClick={() => handlePageChange(1)} className={styles.pageButton}>
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(<span key="left-ellipsis" className={styles.ellipsis}>...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`${styles.pageButton} ${currentPage === i ? styles.active : ''}`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="right-ellipsis" className={styles.ellipsis}>...</span>);
            }
            pages.push(
                <button key={totalPages} onClick={() => handlePageChange(totalPages)} className={styles.pageButton}>
                    {totalPages}
                </button>
            );
        }

        return (
            <div className={styles.paginationContainer}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={styles.navButton}
                    aria-label="Previous page"
                >
                    &lt;
                </button>
                
                {pages}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={styles.navButton}
                    aria-label="Next page"
                >
                    &gt;
                </button>
            </div>
        );
    };

    // Calculate dynamic margin based on sidebar state and window width
    const getContentMargin = () => {
        if (windowWidth <= 768) return '0';
        return isSidebarExpanded ? '250px' : '80px';
    };

    return (
        <div 
            className={styles.searchContainer}
            style={{
                marginLeft: getContentMargin(),
                transition: 'margin-left 0.3s ease'
            }}
        >
            <div className={styles.searchHeader}>
                <h2 className={styles.searchTitle}>Search Books</h2>
                <div className={styles.searchInputContainer}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search by title..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Search books by title"
                    />
                    <span className={styles.searchIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                    </span>
                </div>
            </div>

            <div className={styles.resultsContainer}>
                {query && (
                    <p className={styles.resultsCount}>
                        Showing {currentItems.length} of {filteredBooks.length} results
                        {filteredBooks.length > ITEMS_PER_PAGE && (
                            <span> (page {currentPage} of {totalPages})</span>
                        )}
                    </p>
                )}
                <BookList books={currentItems} />
                {renderPagination()}
            </div>
        </div>
    );
};

export default Search;