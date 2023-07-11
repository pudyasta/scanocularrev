import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from './src/modules/LoginPage';
import SignupPage from './src/modules/Signup';
import SplashScreen from './src/modules/SplashScreen';
import MainPage from './src/modules/MainPage';

const Stack = createStackNavigator();

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLogin ? 'Mainpage' : 'Splash'}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginPage}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
