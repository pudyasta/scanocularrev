import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import RiwayatScreen from './RiwayatScreen';
import {Text} from 'react-native';
import ScanScreen from './ScanScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Riwayat') {
            iconName = 'calendar';
          } else if (route.name === 'Scan') {
            iconName = 'eye';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#295FA6',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          paddingBottom: 9,
          fontSize: 12,
        },
      })}>
      <Tab.Screen
        name="Home"
        options={{headerShown: false}}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Scan"
        options={{headerShown: false}}
        component={ScanScreen}
      />
      <Tab.Screen
        name="Riwayat"
        options={{headerShown: false}}
        component={RiwayatScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
