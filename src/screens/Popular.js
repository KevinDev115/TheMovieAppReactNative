import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text, Title, Button} from 'react-native-paper';
import {map} from 'lodash';

import {getPopularMoviesApi} from '../api/movies';
import usePreferences from '../hooks/usePreferences';
import MovieRating from '../components/MovieRating';
import Loading from '../components/Loading';

//IMGs
import {BASE_PATH_IMG} from '../utils/constants';
import defaultImage from '../assets/img/default-imgage.png';

export default function Popular(props) {
  const {navigation} = props;
  const {theme} = usePreferences();

  const [movies, setMovies] = useState(null);
  const [showBtnMore, setShowBtnMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMovies, setLoadingMovies] = useState(false);

  useEffect(() => {
    getPopularMoviesApi(page).then((response) => {
      const totalPages = response.total_pages;

      if (page < totalPages) {
        if (!movies) {
          setMovies(response.results);
        } else {
          setMovies([...movies, ...response.results]);
        }
      } else {
        setShowBtnMore(false);
      }
    });
  }, [page]);

  const loadMoreMovies = () => {
    setLoadingMovies(true);
    setPage(page + 1);
  };

  if (!movies) return <Loading />;

  return (
    <ScrollView>
      {map(movies, (movie, index) => (
        <Movie
          key={index}
          movie={movie}
          theme={theme}
          navigation={navigation}
        />
      ))}
      {showBtnMore && (
        <Button
          loading={loadingMovies}
          mode="outlined"
          contentStyle={styles.loadMoreContainer}
          style={styles.loadMore}
          labelStyle={{color: theme === 'dark' ? '#FFF' : '#000'}}
          onPress={() => loadMoreMovies()}>
          Cargar mas...
        </Button>
      )}
    </ScrollView>
  );
}

function Movie(props) {
  const {
    movie: {id, poster_path, title, release_date, vote_count, vote_average},
    theme,
    navigation,
  } = props;

  const onNavigation = () => {
    navigation.navigate('movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={() => onNavigation()}>
      <View style={styles.movie}>
        <View style={styles.left}>
          <Image
            style={styles.image}
            source={
              poster_path
                ? {uri: `${BASE_PATH_IMG}/w500${poster_path}`}
                : defaultImage
            }
          />
        </View>
        <View>
          <Title>{title}</Title>
          <Text>{release_date}</Text>
          <MovieRating
            voteCount={vote_count}
            voteAverage={vote_average}
            theme={theme}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  movie: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    marginRight: 20,
  },
  image: {
    width: 100,
    height: 150,
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
});
