import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';

import {StackActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginPage = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const setStorage = async data => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (e) {
      alert(e);
    }
  };
  const goToSignup = () => {
    navigation.navigate('Signup');
  };

  const handleLogin = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      ToastAndroid.show(
        'Please enter a valid email address',
        ToastAndroid.SHORT,
      );
      return;
    }
    axios
      .post('http://scanocular.online/api/users/signin/', {
        email: email,
        password: password,
      })
      .then(response => {
        setStorage(response.data);
        ToastAndroid.show('Login berhasil', ToastAndroid.SHORT);
        navigation.dispatch(StackActions.replace('Mainpage'));
      })
      .catch(function (error) {
        ToastAndroid.show('Email atau password invalid', ToastAndroid.SHORT);
      });
  };

  return (
    <View className="flex-1 items-center justify-center px-5 bg-white">
      <Image source={require('../../public/logo.png')} className="mb-4" />
      <Text className="text-2xl mb-2 font-[Poppins-SemiBold] text-black">
        Selamat Datang
      </Text>
      <Text className="text-center mb-4 font-[Poppins-Regular]">
        Mulai cek kesehatan mata anda secara rutin gratis dengan masuk ke
        aplikasi
      </Text>
      <View className="mb-3 w-full">
        <Text className=" mb-1 border-gray-300 text-gray-600 font-['Poppins-Regular']">
          Email
        </Text>
        <TextInput
          className="w-full p-2 border border-gray-300 rounded-lg font-['Poppins-Regular']"
          value={email}
          onChangeText={setEmail}
          cursorColor="#aeaeae"
        />
      </View>
      <View className="w-full mb-3">
        <Text className=" text-gray-600 mb-1 font-['Poppins-Regular']">
          Password
        </Text>
        <View className="mb-3 ">
          <TextInput
            className="w-full p-2 border border-gray-300 rounded-lg font-['Poppins-Regular']"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            cursorColor="#aeaeae"
          />
          <TouchableOpacity
            className="absolute right-2 top-3"
            onPress={togglePasswordVisibility}>
            <Icon
              size={24}
              color="black"
              name={showPassword ? 'eye' : 'eye-slash'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="bg-[#295FA6] rounded-lg p-3 w-full"
        onPress={() => handleLogin()}>
        <Text className="text-white text-center font-['Poppins-Medium']">
          Masuk
        </Text>
      </TouchableOpacity>

      <View className="mt-8 flex-row">
        <Text className="font-['Poppins-Medium']">Belum mempunyai akun? </Text>
        <Text
          className="text-blue-500 font-['Poppins-Regular']"
          onPress={goToSignup}>
          Daftar sekarang
        </Text>
      </View>
    </View>
  );
};

export default LoginPage;
