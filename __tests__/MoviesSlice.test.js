import moviesReducer, { setMoviesList, setPageNo, setLoadingMovies, toggleFavourite } from '../redux/slice/MoviesSlice';

const TestMovieItem = {
  "Title": "Beta Test",
  "Year": "2016",
  "imdbID": "tt4244162",
  "Type": "movie",
  "Poster": ""
}
describe('counter reducer', () => {
  const initialState = {
    dataEnded: false,
    loadingMovies: false,
    moviesList: [],
    favouritesList: [],
    pageNo: 1
  };

  it('should return the initial state when passed an empty action', () => {
    const result = moviesReducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should change page number', () => {
    const previousState = initialState;
    const result = moviesReducer(previousState, setPageNo(5));
    expect(result.pageNo).toBe(5);
  });

  it('should update movies list', () => {
    const previousState = initialState;
    const result = moviesReducer(previousState, setMoviesList([TestMovieItem]));
    expect(result.moviesList.length).toBe(1);
  });

  it('should toggle favourite', () => {
    const previousState = initialState;
    const favResult = moviesReducer(previousState, toggleFavourite(TestMovieItem));
    expect(favResult.favouritesList).toEqual([TestMovieItem]);

    const unFavResult = moviesReducer(favResult, toggleFavourite(TestMovieItem));
    expect(unFavResult.favouritesList).toEqual([]);
  });
});
