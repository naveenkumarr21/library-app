import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Favourites from './pages/Favourites';
import AdvancedSearch from './pages/AdvancedSearch';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  useEffect(() => {
    const updateBodyClass = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        document.body.classList.toggle(
          'sidebar-collapsed',
          !navbar.classList.contains('expanded')
        );
      }
    };

    // Initial check with retry mechanism
    const checkNavbar = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        updateBodyClass();
        const observer = new MutationObserver(updateBodyClass);
        observer.observe(navbar, { attributes: true, attributeFilter: ['class'] });
        return observer;
      }
      return null;
    };

    let observer = checkNavbar();
    if (!observer) {
      const interval = setInterval(() => {
        observer = checkNavbar();
        if (observer) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }

    return () => observer?.disconnect();
  }, []);

  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/advanced-search" element={<AdvancedSearch />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;