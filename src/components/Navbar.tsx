import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSearch,
  faBook,
  faHeart,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(() => {
    const savedState = localStorage.getItem('sidebarExpanded');
    return savedState !== null ? JSON.parse(savedState) : window.innerWidth > 768;
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsExpanded(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarExpanded', JSON.stringify(isExpanded));
    if (isExpanded && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isExpanded, isMobile]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSidebar();
    }
  };

  const navItems = [
    { path: '/search', icon: faHome, text: 'Home', label: 'Home' },
    { path: '/advanced-search', icon: faSearch, text: 'Advanced Search', label: 'Advanced Search' },
    { path: '/favourites', icon: faHeart, text: 'Favorites', label: 'Favorites' }
  ];

  return (
    <>
      <nav
        className={`${styles.navbar} ${isExpanded ? styles.expanded : styles.collapsed}`}
        aria-label="Main navigation"
      >
        <div className={styles.navbarHeader}>
          
          <button
            className={styles.navbarToggle}
            onClick={toggleSidebar}
            onKeyDown={handleKeyDown}
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={isExpanded}
            tabIndex={0}
          >
            <FontAwesomeIcon icon={isExpanded ? faTimes : faBars} />
          </button>
        </div>

        <div className={styles.navbarCollapse}>
          <ul className={styles.navbarNav}>
            {navItems.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link
                  className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                  to={item.path}
                  title={isExpanded ? '' : item.label}
                  aria-label={item.label}
                  tabIndex={0}
                  onClick={() => isMobile && setIsExpanded(false)}
                >
                  <FontAwesomeIcon icon={item.icon} className={styles.navIcon} />
                  {isExpanded && <span className={styles.navText}>{item.text}</span>}
                  {!isExpanded && (
                    <span className={styles.tooltip}>{item.text}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isMobile && isExpanded && (
        <div
          className={styles.overlay}
          onClick={toggleSidebar}
          role="button"
          aria-label="Close sidebar"
          tabIndex={0}
        />
      )}
    </>
  );
}