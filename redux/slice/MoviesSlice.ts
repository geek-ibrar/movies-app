import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { RemoveLoginDetails } from '../../common/Storage';
import { TypseAuthResponse } from '../../common/Types';
import { TypeMovie } from '@/constants/Types';
import axios from 'axios';


interface StoreType {
  dataEnded: boolean,
  loadingMovies: boolean,
  moviesList: TypeMovie[],
  favouritesList: TypeMovie[],
  pageNo: number
}

const initialState: StoreType = {
  dataEnded: false,
  loadingMovies: false,
  moviesList: [],
  favouritesList: [],
  pageNo: 1
};

const PageSize = 10;
export const getMovies = createAsyncThunk(
  'moviesData/getMovies',
  async ({ data }: any, thunkAPI) => {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "YOUR_API_KEY", // Change this
        ...data,
      }
    })

    return response.data
  },
);


export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMoviesList: (state, action) => {
      state.moviesList = action.payload;
    },
    setPageNo: (state, action) => {
      state.pageNo = action.payload;
      if (state.pageNo == 1) {
        state.dataEnded = false
      }
    },
    setLoadingMovies: (state, action) => {
      state.loadingMovies = action.payload;
    },
    toggleFavourite: (state, action) => {
      if (state.favouritesList.find((item: TypeMovie) => item.imdbID == action.payload.imdbID)) {
        // item finded, remove it
        state.favouritesList = state.favouritesList.filter((item: TypeMovie) => item.imdbID != action.payload.imdbID)
      }
      else {
        // item not finded, add it
        state.favouritesList = [...state.favouritesList, action.payload]
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getMovies.pending, (state, action) => {
      state.loadingMovies = action.meta.arg.data.page < 2;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      const data = action.payload
      if (data?.Response == "True") {
        // use this to only get movies and ignore series
        // const onlyMovies = data.Search.filter((item: TypeMovie) => item.Type == "movie")
        state.moviesList = state.pageNo > 1 ? [...state.moviesList, ...data.Search] : data.Search
        state.pageNo = state.pageNo + 1
        state.dataEnded = data.Search.length < PageSize
      }
      else {
        Alert.alert('Error', data?.Error || 'Unknown error')
        // state.moviesList
        state.dataEnded = false
      }
      state.loadingMovies = false
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      if (action.meta.arg.data.page < 2) {
        state.moviesList = []
      }
      state.loadingMovies = false
    });
  },
});

export const {
  setMoviesList,
  setPageNo,
  setLoadingMovies,
  toggleFavourite,
} = moviesSlice.actions;

export default moviesSlice.reducer;
export type MoviesState = StoreType
