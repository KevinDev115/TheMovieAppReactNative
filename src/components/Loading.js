import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, IconButton} from 'react-native-paper';

export default function Loading() {
  return (
    <View style={styles.viewLoading}>
      <IconButton icon="timer-sand-empty" size={120} color="#8997a5" />
      <Text style={styles.textLoading}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewLoading: {
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLoading: {
    height: 300,
  },
  textLoading: {
    fontSize: 22,
    color: '#8997a5',
  },
});
