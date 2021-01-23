import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import {getPopularMoviesApi} from '../api/movies';

export default function Popular(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    getPopularMoviesApi(1).then((response) => {
      setMovies(response.results);
    });
  }, []);

  return (
    <View>
      <Text>Popular</Text>
    </View>
  );
}
