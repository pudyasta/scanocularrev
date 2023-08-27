import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import avatar from '../../public/profile.png';
import heroImage from '../../public/hero.png';
import newsData from './newsData.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const val = await AsyncStorage.getItem('userData');
      if (val !== null) {
        setData(JSON.parse(val).data.name);
      }
    } catch (e) {
      ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (data == null) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="blue" />;
  }

  const toProfile = () => {
    navigation.dispatch(StackActions.replace('Profilepage'));
  };

  return (
    <View style={{flex: 1}} className=" bg-white">
      {/* Gambar profil dan nama pengguna */}

      <TouchableOpacity onPress={toProfile}>
        <View className="flex-row items-center  p-5">
          <Image source={avatar} className="w-8 h-8 mr-4" />
          <Text className="text-lg font-['Poppins-SemiBold'] capitalize">
            {data}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Gambar hero */}
      <Image source={heroImage} className="w-[100vw] h-48 mb-4" />

      {/* Daftar berita */}
      <Text className="text-lg my-2 px-5 text-xl font-['Poppins-SemiBold'] text-black">
        Berita
      </Text>
      <ScrollView className="px-5 mt-2">
        {newsData.map((item, index) => (
          <View
            key={index}
            className="bg-white rounded-md drop-shadow-xl p-4 mb-4 "
            style={{
              backgroundColor: 'white',
              borderRadius: 8,
              elevation: 4,
              shadowColor: '#171717',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              padding: 10,
            }}>
            <View className="flex-row items-center mb-2 gap-2">
              <Image
                source={require(`../../public/images/new4.png`)}
                className="w-24 h-20 mr-2 rounded-lg h-full"
              />
              <View className="flex" style={{flex: 1}}>
                <Text
                  className="text-sm font-['Poppins-SemiBold'] mb-2 text-justify text-black"
                  numberOfLines={2}>
                  {item.title.substring(0, 70)}...
                </Text>
                <View className="flex flex-row">
                  <Text className="text-xs font-['Poppins-Regular']">BY </Text>
                  <Text className="text-xs text-blue-600 mr-2 font-['Poppins-Regular']">
                    {item.source}
                  </Text>
                  <Icon size={14} color="blue" name="clock-o" />
                  <Text className="text-xs ml-1 font-['Poppins-Regular']">
                    {item.datetime}
                  </Text>
                </View>
                <Text className="text-blue-600 font-['Poppins-SemiBold'] text-md mt-2">
                  Cek Selengkapnya
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
