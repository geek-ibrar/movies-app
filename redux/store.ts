import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moviesSlice, { MoviesState } from './slice/MoviesSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  movies: moviesSlice,
}) as Reducer<Partial<{ movies: MoviesState }>>;

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware(getDefault) {
    const defaultMiddlewares = getDefault({
      serializableCheck: {
        ignoredActions: [
          'persist/REGISTER',
          'persist/REHYDRATE',
          'persist/PERSIST',
        ],
      },
    });
    return defaultMiddlewares;
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);
export default store;
