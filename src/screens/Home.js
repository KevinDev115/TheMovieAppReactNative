import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Title} from 'react-native-paper';
import {map} from 'lodash';

import {
  getNewsMoviesApi,
  getAllGendersApi,
  getGenreMoviesApi,
} from '../api/movies';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';

export default function Home(props) {
  const {navigation} = props;
  const [newMovies, setNewMovies] = useState(null);
  const [genreList, setGenreList] = useState(null);
  const [genreSelected, setGenreSelected] = useState(null);
  const [genreMovies, setGenreMovies] = useState(null);

  useEffect(() => {
    getNewsMoviesApi().then((response) => {
      setNewMovies(response.results);
    });
  }, []);

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
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas Peliculas</Title>
          <CarouselVertical data={newMovies} navigation={navigation} />
        </View>
      )}

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
                {color: genre.id !== genreSelected ? '#8697a5' : '#FFF'},
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
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
});
