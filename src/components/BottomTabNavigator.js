import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
// import {Ionicons} from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import RiwayatScreen from './RiwayatScreen';
import {Text} from 'react-native';

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          // <Ionicons name="home" size={24} color={tintColor} />
          <Text>a</Text>
        ),
      },
    },
    Riwayat: {
      screen: RiwayatScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Text>b</Text>,
      },
    },
    Scan: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Text>c</Text>,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
      },
    },
  },
);

export default BottomTabNavigator;
