import React from 'react';
import {IconButton} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens/Popular';
import Search from '../screens/Search';

const Stack = createStackNavigator();

export default function StackNavigation(props) {
  const {navigation} = props;

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <ButtonLeft navigation={navigation} />,
        headerRight: (props) => <ButtonRight navigation={navigation} />,
      }}>
      <Stack.Screen
        name="home"
        component={Home}
        options={{title: 'TheMovieApp'}}
      />
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => <ButtonReturn navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{title: 'Nuevas Películas'}}
      />
      <Stack.Screen
        name="popular"
        component={Popular}
        options={{title: 'Películas Populares'}}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: '',
          headerRight: null,
          headerLeft: () => <ButtonReturn navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
}

function ButtonLeft(props) {
  const {navigation} = props;
  return <IconButton icon="menu" onPress={() => navigation.openDrawer()} />;
}

function ButtonRight(props) {
  const {navigation} = props;
  return (
    <IconButton icon="magnify" onPress={() => navigation.navigate('search')} />
  );
}

function ButtonReturn(props) {
  const {navigation} = props;
  return <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />;
}
