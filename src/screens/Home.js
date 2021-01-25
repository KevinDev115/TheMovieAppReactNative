import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Title} from 'react-native-paper';

import {getNewsMoviesApi} from '../api/movies';
import CarouselVertical from '../components/CarouselVertical';
import MoviesByGenre from '../components/MoviesByGenre';

export default function Home(props) {
  const {navigation} = props;

  const [newMovies, setNewMovies] = useState(null);

  useEffect(() => {
    getNewsMoviesApi().then((response) => {
      setNewMovies(response.results);
    });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas Peliculas</Title>
          <CarouselVertical data={newMovies} navigation={navigation} />
        </View>
      )}
      <MoviesByGenre navigation={navigation} />
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
});
