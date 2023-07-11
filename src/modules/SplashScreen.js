import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Login'));
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../public/logo.png')} style={styles.image} />
      <Text className="text-black text-xl font-[Poppins-Bold] mt-2">
        SCANOCULAR
      </Text>
      <Text className="text-grey-100 text-md font-[Poppins-Regular] mt-2">
        Precision scans for a brighter vision!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
