import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {map} from 'lodash';

import {BASE_PATH_IMG} from '../utils/constants';
import {getNewsMoviesApi} from '../api/movies';
import usePreferences from '../hooks/usePreferences';
import Loading from '../components/Loading';

const {width} = Dimensions.get('window');

export default function News(props) {
  const {navigation} = props;
  const {theme} = usePreferences();

  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [showBtnMore, setShowBtnMore] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(false);

  useEffect(() => {
    getNewsMoviesApi(page).then((response) => {
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
      setLoadingMovies(false);
    });
  }, [page]);

  const loadMoreMovies = () => {
    setLoadingMovies(true);
    setPage(page + 1);
  };

  if (!movies) return <Loading />;

  return (
    <ScrollView>
      <View style={styles.container}>
        {map(movies, (movie, index) => (
          <Movie movie={movie} key={index} navigation={navigation} />
        ))}
      </View>
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
    movie: {id, title, poster_path},
    navigation,
  } = props;

  const onNavigation = () => {
    navigation.navigate('movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={() => onNavigation()}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image
            style={styles.image}
            source={{uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
          />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
});
