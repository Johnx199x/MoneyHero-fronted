import { useState } from 'react';
import './NavBar.css';

function NavLinks({closeMenu}:{closeMenu?:()=>void}){
   function scrollInto(zone:string){
   document.getElementById(zone)?.scrollIntoView({ behavior: 'smooth' });
    if(closeMenu) closeMenu()

  }
    return (
    <>
    <button 
           type='button' 
           onClick={() => scrollInto("home")}
            className='navbar-link'>
              Home
             </button>
             <button 
           type='button' 
           onClick={() => scrollInto("how-it-works")}
            className='navbar-link'>
              How It Works
             </button>
             <button 
              type='button' 
              onClick={() => scrollInto("features")}
              className='navbar-link'>
              Features
             </button>
          <button className="button-x" type='button'>Start Quest</button>
    </>

        )
  }
export default function NavBar() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <span className="brand-icon">⚔️</span>
          <span className="brand-text">MoneyHero</span>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
              <NavLinks />
          
        </div>

        {/* Mobile Menu Button */}
        <button 
        type='button'
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu" >
          <NavLinks closeMenu={toggleMobileMenu} />
        </div>
      )}
    </nav>
  );
}