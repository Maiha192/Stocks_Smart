// Get the current year value to display on the Footer component
const currentYear = new Date().getFullYear();

// Footer component
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>STOCKS SMART PTY LTD</p>
          <p>Email: info@stockssmart.org</p>
        </div>
        <div className="footer-text">
          <div className="footer-text-content">
            &copy; {currentYear} Stocks Smart. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
