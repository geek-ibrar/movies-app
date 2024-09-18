import * as React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getMovies, MoviesState, setLoadingMovies, setMoviesList, setPageNo } from '@/redux/slice/MoviesSlice';
import MoviesList from '@/components/MoviesList';

interface MovieSearchProps { }

// Debounce function: delays the API call by the specified wait time
let timeoutId: NodeJS.Timeout;
const debounce = (func: any, delay: number) => {
  return (...args: any) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const MovieSearch = (props: MovieSearchProps) => {

  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const dispatch = useDispatch();

  const { loadingMovies, moviesList, pageNo, dataEnded } = useSelector<RootState, MoviesState>(state => state.movies)

  // Fetch search results when query changes with debounce
  const fetchData = debounce(() => {
    if (searchQuery.length > 0) {
      dispatch(getMovies({ data: { s: searchQuery, page: pageNo } }))
    } else {
      dispatch(setMoviesList([]))
      dispatch(setLoadingMovies(false))
      dispatch(setPageNo(1))
    }
  }, 1000);

  const renderSearchbar = () => (
    <Searchbar
      placeholder="Movie Name"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  )

  const onRefresh = () => {
    dispatch(setPageNo(1))
    fetchData()
  }

  const loadMore = () => {
    fetchData()
  }

  React.useEffect(() => {
    fetchData()
  }, [searchQuery])

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.content}>
        <View style={styles.paddingHorizontal}>
          {renderSearchbar()}
        </View>

        <MoviesList
          data={moviesList}
          onRefresh={onRefresh}
          loadMore={loadMore}
          loadingMovies={loadingMovies}
          hideFooterLoading={!moviesList.length || dataEnded}
        />
      </View>
    </SafeAreaView>
  );
};

export default MovieSearch;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  paddingHorizontal: {
    padding: 20,
    paddingBottom: 0,
  },
  fill: {
    flex: 1
  },
});
