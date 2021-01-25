import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Rating} from 'react-native-ratings';

import usePreferences from '../hooks/usePreferences';

// Img
import starDark from '../assets/img/starDark.png';
import starLight from '../assets/img/starLight.png';

export default function MovieRating(props) {
  const {voteCount, voteAverage, inLine, showMedia} = props;
  const media = voteAverage / 2;
  const {theme} = usePreferences();

  return (
    <View style={inLine ? styles.viewRatingInline : styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? starDark : starLight}
        ratingColor="#ffc205"
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={styles.rating}
        readonly={true}
      />
      {showMedia && <Text style={styles.mediaRating}>{media}</Text>}
      <Text style={styles.voteCountRating}>{voteCount} votos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewRating: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  viewRatingInline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginRight: 15,
  },
  mediaRating: {
    fontSize: 16,
    marginRight: 5,
  },
  voteCountRating: {
    fontSize: 12,
    color: '#8697a5',
  },
});
