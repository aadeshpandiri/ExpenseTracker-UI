import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

// Mock the react-router-dom useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200, data: { accessToken: 'mockToken', name: 'mockUser' } }),
  })
);

test('renders without crashing', () => {
  render(<Login />);
  expect(screen.getByText('Login Page')).toBeInTheDocument();
});

test('handles login correctly', async () => {
    render(<Login />);
  
    // Mock the fetch function to simulate a successful login
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 200, data: { accessToken: 'mockToken', name: 'mockUser' } }),
      })
    );
  
    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'gokul@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '12341234' } });
  
    // Trigger the login function
    fireEvent.click(screen.getByText('Login'));
  
    // Wait for the asynchronous actions to complete
    await waitFor(() => {
      // Expect the fetch function to have been called
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/login'), expect.any(Object));
  
      // Expect success toast to be called
      //expect(screen.getByText('Login successful!')).toBeInTheDocument();
  
      // Expect sessionStorage to be updated
      expect(sessionStorage.getItem('access_token')).toEqual('mockToken');
      expect(sessionStorage.getItem('userdata')).toEqual('mockUser');
  
      // Expect navigation to home page
      //expect(useNavigate()).toHaveBeenCalledWith('/');
    });
});

test('handles login failure correctly', async () => {
    render(<Login />);
  
    // Mock the fetch function to simulate a failed login
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 404, message: 'User Not Registered' }),
      })
    );
  
    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  
    // Trigger the login function
    fireEvent.click(screen.getByText('Login'));
  
    // Wait for the asynchronous actions to complete
    await waitFor(() => {
      // Expect the fetch function to have been called
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/login'), expect.any(Object));
  
      
    });
  });