import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from "../../src/components/Footer";
describe('Navbar component', () => {
    test('renders the navbar with links', () => {
      render(
        <Router>
          <Footer />
        </Router>
      );
  
      // Check for desktop links
      expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
      expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
    });
  });