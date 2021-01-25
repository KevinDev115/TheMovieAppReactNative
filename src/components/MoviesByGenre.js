import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Title} from 'react-native-paper';
import {map} from 'lodash';

import usePreferences from '../hooks/usePreferences';
import {getAllGendersApi, getGenreMoviesApi} from '../api/movies';
import CarouselMulti from './CarouselMulti';

export default function MoviesByGenre(props) {
  const {navigation} = props;
  const {theme} = usePreferences();

  const [genreList, setGenreList] = useState(null);
  const [genreMovies, setGenreMovies] = useState(null);
  const [genreSelected, setGenreSelected] = useState(null);

  useEffect(() => {
    getAllGendersApi().then((response) => {
      setGenreList(response.genres);
      onChangeGenre(response.genres[0].id);
    });
  }, []);

  useEffect(() => {
    getGenreMoviesApi(genreSelected).then((response) => {
      setGenreMovies(response.results);
    });
  }, [genreSelected]);

  const onChangeGenre = (id) => {
    setGenreSelected(id);
  };

  return (
    <View style={styles.genres}>
      <Title style={styles.genresTitle}>Películas por genero</Title>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.genresList}>
        {map(genreList, (genre, index) => (
          <Text
            style={[
              styles.genre,
              genre.id !== genreSelected
                ? theme === 'dark'
                  ? styles.genreDark
                  : styles.genreLight
                : theme === 'dark'
                ? styles.genreActiveDark
                : styles.genreActiveLight,
            ]}
            key={index}
            onPress={() => onChangeGenre(genre.id)}>
            {genre.name}
          </Text>
        ))}
      </ScrollView>
      {genreMovies && (
        <CarouselMulti data={genreMovies} navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  genres: {
    // marginTop: 5,
    marginBottom: 50,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genresList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 10,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
  genreActiveDark: {
    color: '#FFF',
  },
  genreDark: {
    color: '#8697a5',
  },
  genreActiveLight: {
    color: '#000',
  },
  genreLight: {
    color: '#8997a5',
  },
});
