import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from "../../src/components/Navbar"
describe('Navbar component', () => {
    test('renders the navbar with links', () => {
      render(
        <Router>
          <Navbar />
        </Router>
      );
  
      // Check for desktop links
      expect(screen.getByText(/TeamWork Hub/i)).toBeInTheDocument();
      expect(screen.getByText(/Home/i)).toBeInTheDocument();
      expect(screen.getByText(/Login/i)).toBeInTheDocument();
      expect(screen.getByText(/Signup/i)).toBeInTheDocument();
    });
  });