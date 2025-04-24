# Library App

The **Library App** is a React-based application that allows users to browse, search, and manage a collection of books. Users can perform advanced searches, view book details, and manage their favorite books.

## Features

- **Home Page**: Displays a list of all books in the library.
- **Search**: Search for books by title with pagination support.
- **Advanced Search**: Filter books by title, ISBN, page count, status, author, and categories.
- **Favorites**: Add or remove books from the favorites list.
- **Responsive Design**: Fully responsive UI for desktop and mobile devices.
- **State Management**: Uses Redux for managing the state of books and favorites.
- **Animations**: Smooth animations using Framer Motion.

## Tech Stack

- **Frontend**: React, TypeScript, SCSS
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Animations**: Framer Motion
- **Build Tool**: Vite

## Installation



Features in Detail:

1.Home Page
Displays all books in a grid layout.
Each book is represented by a card with its title, author, and thumbnail.

2.Search
Search for books by title.
Pagination support for navigating through results.


3.Advanced Search
Filter books by:
Title
ISBN
Page count
Status (e.g., Published, MEAP)
Author
Categories
Dropdown for selecting multiple categories.



4.Favorites
Add books to the favorites list.
View and manage favorite books.

5.Styling
SCSS: Modular SCSS is used for styling components.
Variables: Centralized SCSS variables for colors, spacing, and breakpoints.


6.State Management
Redux Toolkit: Manages the state of books and favorites.
Slices:
bookSlice: Handles books and favorites.


7.Animations
Framer Motion: Adds smooth animations to components like book cards and modals.