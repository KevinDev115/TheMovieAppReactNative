import React, {useMemo, useState} from 'react';
import {StatusBar, YellowBox} from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as DarkThemeNavigation,
  DefaultTheme as DefaultThemeNavigation,
} from '@react-navigation/native';
import DrawerNavigation from './src/navigations/DrawerNavigation';
import PreferencesContext from './src/contexts/PreferencesContext';

YellowBox.ignoreWarnings(['Calling `getNode()`']);

export default function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Paper
  DefaultThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.accent = '#1ae1f2';

  // Navigation
  DarkThemeNavigation.colors.background = '#192734';
  DarkThemeNavigation.colors.card = '#15212b';

  const preference = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme],
  );

  return (
    <PreferencesContext.Provider value={preference}>
      <PaperProvider
        theme={theme === 'dark' ? DarkThemePaper : DefaultThemePaper}>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <NavigationContainer
          theme={
            theme === 'dark' ? DarkThemeNavigation : DefaultThemeNavigation
          }>
          <DrawerNavigation />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
