import React, {useEffect, useState} from 'react';

import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import avatar from '../../public/profileHD.png';

import Icon from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';

export default function Profilepage() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  const navigation = useNavigation();

  const getData = async () => {
    try {
      const val = await AsyncStorage.getItem('userData');

      if (val !== null) {
        setName(JSON.parse(val).data.name);
        setEmail(JSON.parse(val).data.email);
      }
    } catch (e) {
      setEmail('error');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleIconClick = () => {
    navigation.dispatch(StackActions.replace('Mainpage'));
  };

  const logout = () => {
    const keyToRemove = 'userData';
    AsyncStorage.removeItem(keyToRemove)
      .then(() => {
        console.log(`Successfully removed item with key: ${keyToRemove}`);
        navigation.dispatch(StackActions.replace('Login'));
      })
      .catch(error => {
        console.error(`Error removing item: ${error.message}`);
      });
  };
  return (
    <View style={{flex: 1}} className=" bg-white">
      {/* Gambar profil dan nama pengguna */}
      <View className="flex-row items-center  p-5">
        {/* <Image source={avatar} className="w-8 h-8 mr-4" /> */}
        <TouchableOpacity onPress={handleIconClick}>
          <Icon name="arrowleft" size={30} />
        </TouchableOpacity>
        <Text className="text-lg font-['Poppins-SemiBold'] capitalize ml-4 text-black">
          Profile Screen
        </Text>
      </View>

      <View className="w-full p-4 justify-center items-center">
        <Image source={avatar} className="w-32 h-32" />
        <Text className="mt-4 font-bold font-['Poppins-SemiBold'] text-xl text-black">
          {name}
        </Text>
        <Text className="mt-1 font-bold font-['Poppins'] ">{email}</Text>
        <TouchableOpacity className="mt-3 bg-[#295FA6] pt-2 pb-2 pl-12 pr-12 rounded-full">
          <Text className="text-white font-[Poppins-SemiBold]">
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-ful px-4 mt-8">
        <View className="justify-between flex flex-row">
          <View className="flex flex-row">
            <View className="w-10 h-10 rounded-full bg-[#CCE3FF] justify-center items-center">
              <IconIonicons
                name="document-text-outline"
                size={24}
                color="black"
              />
            </View>
            <View className="justify-center ml-2">
              <Text
                className="font-['Poppins-SemiBold'] text-black
              ">
                Terms of Services
              </Text>
            </View>
          </View>
          <View>
            <View className="w-8 h-8 rounded-full bg-[#CCE3FF] justify-center items-center">
              <IconMaterialIcons name="arrow-forward-ios" size={16} />
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={logout}>
        <View className="w-ful px-4 mt-4">
          <View className="justify-between flex flex-row">
            <View className="flex flex-row">
              <View className="w-10 h-10 rounded-full bg-[#CCE3FF] justify-center items-center">
                <IconMaterialIcons name="logout" size={24} color="black" />
              </View>
              <View className="justify-center ml-2">
                <Text className="font-['Poppins-SemiBold'] text-black">
                  Logout
                </Text>
              </View>
            </View>
            <View>
              <View className="w-8 h-8 rounded-full bg-[#CCE3FF] justify-center items-center ">
                <IconMaterialIcons name="arrow-forward-ios" size={16} />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
