import { useState } from 'react'
import "./Footer.css"
import { GitHubIcon, GmailIcon, InfoIcon, LinkedInIcon, TelegramIcon, XMarkIcon } from '../../shared/svg'

export default function Footer () {
  const [showDetails, setShowDetails] = useState(false)
  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer>
        <div className="footer-content">
          <div className="footer-main">
            <span className="footer-made-with">Made with ⚔️ and lots of ☕</span>
            <span className="footer-separator">•</span>
            <span className="footer-year">© {currentYear}</span>
          </div>
          
          <button type='button'
            className="footer-toggle"
            onClick={() => setShowDetails(!showDetails)}
            aria-label="Show details"
          >
          {InfoIcon}
          </button>
        </div>
      </footer>
      
      {showDetails && (
        <>
          {/** biome-ignore lint/a11y/useSemanticElements: <explanation> */}
          <div
            className="footer-overlay"
            onClick={() => setShowDetails(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setShowDetails(false)
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Close details overlay"
          />
          <div className="footer-modal">
            <div className="footer-modal-header">
              <h3>⚔️ MoneyHero</h3>
              <button 
                className="footer-modal-close" type='button'
                onClick={() => setShowDetails(false)}
              >
                {XMarkIcon}
              </button>
            </div>
            
            <div className="footer-modal-content">
              <div className="footer-links">
                <a href="https://github.com/johnx199x" target="_blank" rel="noopener noreferrer">
                  {GitHubIcon}
                  <span>GitHub</span>
                </a>
                <a href="mailto:jeremydev666@gmail.com">
                  {GmailIcon}
                  <span>Contact</span>
                </a>
                <a href="https://www.linkedin.com/in/jonathan-cruz-martin-741a30268/" target="_blank" rel="noopener noreferrer">
                  {LinkedInIcon}
                  <span>LinkedIn</span>
                </a>
                <a href="https://t.me/Johnx199x" target="_blank" rel="noopener noreferrer">
                  {TelegramIcon}
                  <span>Telegram</span>
                </a>
              </div>
              
              <div className="footer-info">
                <p><strong>⚔️ MoneyHero</strong></p>
                <p>Your financial adventure begins here</p>
                <p>• Crafted by Hero John • </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}