import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {Text, Title, IconButton} from 'react-native-paper';
import {map} from 'lodash';

import {BASE_PATH_IMG} from '../utils/constants';
import {getMovieById} from '../api/movies';
import ModalVideo from '../components/ModalVideo';
import MovieRating from '../components/MovieRating';

export default function Movie(props) {
  const {
    route: {
      params: {id},
    },
    navigation,
  } = props;

  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    getMovieById(id).then((response) => {
      setMovie(response);
    });
  }, [id]);

  if (!movie) return null;

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieImage posterPath={movie.poster_path} />
        <MovieTrailer setShowVideo={setShowVideo} />
        <MovieTitle movie={movie} />
        <View style={styles.viewRating}>
          <MovieRating
            voteCount={movie.vote_count}
            voteAverage={movie.vote_average}
            inLine
            showMedia
          />
        </View>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={[styles.overview, {marginBottom: 30}]}>
          Fecha de lanzamiento: {movie.release_date}
        </Text>
      </ScrollView>
      <ModalVideo show={showVideo} setShow={setShowVideo} idMovie={id} />
    </>
  );
}

function MovieImage(props) {
  const {posterPath} = props;

  return (
    <View style={styles.viewPoster}>
      <Image
        style={styles.poster}
        source={{uri: `${BASE_PATH_IMG}/w500${posterPath}`}}
      />
    </View>
  );
}

function MovieTrailer(props) {
  const {setShowVideo} = props;

  return (
    <View style={styles.viewPlay}>
      <IconButton
        icon="play"
        color="#000"
        size={30}
        style={styles.play}
        onPress={() => setShowVideo(true)}
      />
    </View>
  );
}

function MovieTitle(props) {
  const {movie} = props;

  return (
    <View style={styles.viewInfo}>
      <Title>{movie.title}</Title>
      <View style={styles.viewGenres}>
        {map(movie.genres, (genre) => (
          <Text key={genre.id} style={styles.genre}>
            {genre.name}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  viewPlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  play: {
    backgroundColor: '#FFF',
    marginTop: -40,
    marginRight: 30,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  viewInfo: {
    marginHorizontal: 30,
  },
  viewGenres: {
    flexDirection: 'row',
  },
  genre: {
    marginRight: 20,
    color: '#8697a5',
  },
  viewRating: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  overview: {
    marginHorizontal: 30,
    marginTop: 20,
    textAlign: 'justify',
    color: '#8697a5',
  },
});
