import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import Home from '../app/(tabs)/index';

const initialState = {
  dataEnded: false,
  loadingMovies: false,
  moviesList: [],
  favouritesList: [],
  pageNo: 1
}

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Home', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selector) =>
      selector({
        movies: initialState, // Mocking the initial state of the counter
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clean up after each test
  });

  it('renders correctly', () => {
    const tree = render(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
