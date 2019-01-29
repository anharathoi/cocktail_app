import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <ul>
          <li><Link to='/contact_us'>Contact Us</Link></li>
          <li><Link to='/faqs'>FAQs</Link></li>
          <li><Link to='/liquor_licence'>Liquor Licence</Link></li>
          <li><Link to='/privacy'>Privacy</Link></li>
          <li><Link to='/terms'>Terms</Link></li>
          <li><Link to='/who_we_are'>Who we are</Link></li>
        </ul>
      </footer>
      </>
    
  )
}

//to make the Link's work - make sure that the uri's in this file match up to the uri's in the app.js file within the Switch statement