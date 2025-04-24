import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BookList from '../components/BookList';
import './AdvancedSearch.module.scss.scss';

const AdvancedSearch: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);

  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [status, setStatus] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredBooks = books.filter((book) => {
    return (
      (title ? book.title.toLowerCase().includes(title.toLowerCase()) : true) &&
      (isbn ? book.isbn.includes(isbn) : true) &&
      (pageCount ? book.pageCount === parseInt(pageCount) : true) &&
      (status ? book.status.toLowerCase().includes(status.toLowerCase()) : true) &&
      (author
        ? book.authors.some((a: string) =>
          a.toLowerCase().includes(author.toLowerCase())
        )
        : true) &&
      (selectedCategories.length > 0
        ? selectedCategories.every((cat: string) => book.categories.includes(cat))
        : true)
    );
  });

  const allCategories = Array.from(
    new Set(books.flatMap((book) => book.categories))
  );

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  return (
    <div className="container mt-4">
      <h4>Advanced Search</h4>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label>Title</label>
          <input
            className="form-control"
            placeholder="Search by title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>ISBN</label>
          <input
            className="form-control"
            placeholder="Search by ISBN..."
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Page Count</label>
          <input
            className="form-control"
            type="number"
            placeholder="Filter by pages..."
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Status</label>
          <input
            className="form-control"
            placeholder="Filter by status..."
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Author</label>
          <input
            className="form-control"
            placeholder="Search by author..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Categories</label>
          <div className="dropdown">
            <button
              className="form-control dropdown-toggle text-start"
              type="button"
              onClick={toggleCategoryDropdown}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {selectedCategories.length > 0
                ? `${selectedCategories.length} selected`
                : 'Select categories...'}
            </button>
            {showCategoryDropdown && (
              <div
                className="dropdown-menu show w-100"
                style={{
                  maxHeight: '300px',
                  overflowY: 'auto',
                  padding: '0.5rem',
                }}
              >
                {allCategories.map((cat) => (
                  <div key={cat} className="dropdown-item">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={cat}
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                      />
                      <label className="form-check-label" htmlFor={cat}>
                        {cat}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedCategories.length > 0 && (
            <div className="mt-2">
              <small className="text-muted">
                Selected: {selectedCategories.join(', ')}
              </small>
            </div>
          )}
        </div>
      </div>
      <BookList books={filteredBooks} />
    </div>
  );
};

export default AdvancedSearch;