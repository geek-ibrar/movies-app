import MoviesList from '@/components/MoviesList';
import { MoviesState } from '@/redux/slice/MoviesSlice';
import { RootState } from '@/redux/store';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';


export default function Favourites() {
  const { favouritesList } = useSelector<RootState, MoviesState>(state => state.movies)

  const doNothing = () => { }

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.content}>

        <Text variant='titleLarge' style={styles.title}>Favourites</Text>

        <MoviesList
          data={favouritesList}
          onRefresh={doNothing}
          loadMore={doNothing}
          loadingMovies={false}
          hideFooterLoading={true}
        />
      </View>
    </SafeAreaView>
  );
}

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
  title: {
    alignSelf: 'center',
  },
});
