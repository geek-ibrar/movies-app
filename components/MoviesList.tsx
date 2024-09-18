import { TypeMovie } from '@/constants/Types';
import { MoviesState, toggleFavourite } from '@/redux/slice/MoviesSlice';
import { RootState } from '@/redux/store';
import * as React from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Image, ActivityIndicator } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';

interface MoviesListProps {
    data: TypeMovie[],
    onRefresh: () => void
    loadMore: () => void,
    loadingMovies: boolean,
    hideFooterLoading: boolean,
}

const MoviesList = ({ data, onRefresh, loadMore, loadingMovies, hideFooterLoading }: MoviesListProps) => {

    const { favouritesList } = useSelector<RootState, MoviesState>(state => state.movies)
    const dispatch = useDispatch();

    const emptyMsg = () => {
        return <View style={{ alignItems: 'center', margin: 30, }}>
            <Text>No data</Text>
        </View>
    }

    const renderMovie = ({ item, index }: { item: TypeMovie, index: number }) => {

        const isFavourite = favouritesList.find((movie: TypeMovie) => movie.imdbID == item.imdbID)

        return <View style={styles.row} key={index}>
            <Image source={{ uri: item.Poster }} fadeDuration={500} style={styles.poster} />
            <View style={styles.details}>
                <Text variant='titleMedium'>{item.Title}</Text>
                <Text variant='labelSmall'>Release: {item.Year}</Text>
            </View>

            <View style={styles.iconWrapper}>
                <Ionicons
                    name={isFavourite ? 'heart' : 'heart-outline'}
                    size={18} color={isFavourite ? 'red' : 'black'}
                    onPress={() => dispatch(toggleFavourite(item))}
                />
            </View>
        </View>
    }

    const renderFooter = () => {
        if (hideFooterLoading) { return null }
        return (
            <ActivityIndicator size={"large"} />
        )
    }

    return (
        <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={loadingMovies}
                    onRefresh={onRefresh}
                />
            }
            ItemSeparatorComponent={() => <Divider />}
            data={data}
            renderItem={renderMovie}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={emptyMsg}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            contentContainerStyle={styles.paddingHorizontal}
        />
    );
};

export default MoviesList;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    poster: {
        width: 60,
        height: 60,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    details: {
        flex: 1,
        marginLeft: 10,
    },
    iconWrapper: {
        height: '100%'
    },
    paddingHorizontal: {
        padding: 20,
        paddingBottom: 0,
    },
});
