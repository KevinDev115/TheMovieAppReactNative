import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import {Searchbar, Text} from 'react-native-paper';
import {map, size} from 'lodash';

import {searchMoviesApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');

export default function Search(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    if (size(textSearch) > 2) {
      searchMoviesApi(textSearch).then((response) => {
        setMovies(response.results);
      });
    }
  }, [textSearch]);

  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Busca tu pelicula"
        iconColor={Platform.OS === 'ios' && 'transparent'}
        icon="arrow-left"
        style={styles.input}
        onChangeText={(e) => setTextSearch(e)}
      />
      <ScrollView>
        <View style={styles.container}>
          {map(movies, (movie, index) => (
            <Movie key={index} movie={movie} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Movie(props) {
  const {
    navigation,
    movie: {id, title, poster_path},
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
  input: {
    marginTop: -3,
    backgroundColor: '#15212b',
  },
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
});
