import React, {useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import avatar from '../../public/profile.png'; // Gambar profil
import heroImage from '../../public/hero.png'; // Gambar hero
import newsData from './newsData.json'; // Data berita dari JSON statis
// import { Ionicons } from '@expo/vector-icons';
const HomeScreen = () => {
  return (
    <View style={{flex: 1}} className=" bg-white">
      {/* Gambar profil dan nama pengguna */}
      <View className="flex-row items-center  p-5">
        <Image source={avatar} className="w-8 h-8 mr-4" />
        <Text className="text-lg font-['Poppins-SemiBold']">rasyidk</Text>
      </View>

      {/* Gambar hero */}
      <Image source={heroImage} className="w-[100vw] h-48 mb-4" />

      {/* Daftar berita */}
      <Text className="text-lg  my-2 px-5 text-xl font-['Poppins-SemiBold']">
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
                className="w-20 h-20 mr-2 rounded-lg h-full"
              />
              <View>
                <Text className="text-lg font-['Poppins-SemiBold'] flex-wrap mb-2 break-words">
                  {item.title.substring(0, 25)}...
                </Text>
                <View className="flex flex-row">
                  <Text className="text-xs font-['Poppins-Regular']">BY </Text>
                  <Text className="text-xs text-blue-600 mr-2 font-['Poppins-Regular']">
                    {item.source}
                  </Text>
                  {/* <Ionicons name="time" className="text-green-500" size={12} /> */}
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
