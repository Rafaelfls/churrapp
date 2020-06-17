import 'react-native-gesture-handler';
import React, { useState } from 'react';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'patua-one': require('./src/assets/fonts/PatuaOne-Regular.ttf'),
    'poppins-black': require('./src/assets/fonts/Poppins/Poppins-Black.ttf'),
    'poppins-bold': require('./src/assets/fonts/Poppins/Poppins-Bold.ttf'),
    'poppins-extra-bold': require('./src/assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    'poppins-extra-light': require('./src/assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
    'poppins-light': require('./src/assets/fonts/Poppins/Poppins-Light.ttf'),
    'poppins-medium': require('./src/assets/fonts/Poppins/Poppins-Medium.ttf'),
    'poppins-regular': require('./src/assets/fonts/Poppins/Poppins-Regular.ttf'),
    'poppins-semi-bold': require('./src/assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'poppins-thin': require('./src/assets/fonts/Poppins/Poppins-Thin.ttf'),
  });
};

import Routes from './src/routes'

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  return (
    <Routes />
  );
}

