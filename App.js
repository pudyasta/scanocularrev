import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from './src/modules/LoginPage';
import SignupPage from './src/modules/Signup';
import SplashScreen from './src/modules/SplashScreen';
import MainPage from './src/modules/MainPage';
import ResultPage from './src/modules/ResultPage';
import ProfilePage from './src/modules/ProfilePage';
import GlukomaTest from './src/modules/GlukomaTest';
import ArticleView from './src/modules/ArticleView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, StatusBar, ToastAndroid} from 'react-native';
import ScanScreen from './src/modules/ScanScreen';

const Stack = createStackNavigator();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkLogin = async () => {
    try {
      const val = await AsyncStorage.getItem('userData');
      if (val !== null) {
        setIsLogin(true);
      }
    } catch (e) {
      ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (isLoading) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="red" />;
  }

  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={'dark-content'}
      />
      {/* <Stack.Navigator initialRouteName={isLogin ? 'Mainpage' : 'Login'}> */}
      <Stack.Navigator initialRouteName={isLogin ? 'Mainpage' : 'Login'}>
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginPage}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          options={{headerShown: false}}
          component={SignupPage}
        />
        <Stack.Screen
          name="Mainpage"
          options={{headerShown: false}}
          component={MainPage}
        />
        <Stack.Screen
          name="Resultpage"
          options={{headerShown: false}}
          component={ResultPage}
        />

        <Stack.Screen
          name="ArticleView"
          options={{headerShown: false}}
          component={ArticleView}
        />
        <Stack.Screen
          name="ScanScreen"
          options={{headerShown: false}}
          component={ScanScreen}
        />
        <Stack.Screen
          name="GlukomaScreen"
          options={{headerShown: false}}
          component={GlukomaTest}
        />

        <Stack.Screen
          name="Profilepage"
          options={{headerShown: false}}
          component={ProfilePage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
