// /app/layout.js
'use client'
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/header';
import './globals.css'; // Import global styles
import { UserProvider } from './context/userContext';

const RootLayout = ({ children }) => {
  return (
    <UserProvider>
      <html lang="en">
        <body>
          <Header />
          <div className="container">
            {children}
          </div>
        </body>
      </html>
    </UserProvider>
  );
};

export default RootLayout;
