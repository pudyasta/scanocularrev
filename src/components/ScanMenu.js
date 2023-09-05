import React from 'react';
import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import avatar from '../../public/profile.png';
import {useNavigation} from '@react-navigation/native';

const ScanMenu = () => {
  const navigation = useNavigation();

  return (
    <View className="p-4 h-full bg-white">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profilepage');
        }}>
        <View className="flex-row items-center pb-5">
          <Image source={avatar} className="w-8 h-8 left-1 top-1 absolute" />
          <Text className="text-lg text-black font-bold  w-full flex-1 text-center">
            Screening
          </Text>
        </View>
      </TouchableOpacity>

      <View className="border-t border-gray-300 pt-4 ">
        {DATA.map((e, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => {
                navigation.navigate(e.navigate);
              }}>
              <View
                className="bg-white rounded-2xl drop-shadow-xl p-4 mb-4 "
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
                    source={{
                      uri: e.image,
                    }}
                    className="w-20 s mr-2 rounded-xl h-full"
                  />
                  <View className="flex" style={{flex: 1}}>
                    <Text
                      className="text-lg font-['Poppins-SemiBold'] mb-1 text-justify text-[#295FA6]"
                      numberOfLines={2}>
                      {e.title}
                    </Text>
                    <Text
                      className="text-sm font-['Poppins'] mb-1 text-justify text-black"
                      numberOfLines={2}>
                      {e.content}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const DATA = [
  {
    image:
      'https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2021/06/23030719/Katarak.jpg.webp',
    title: 'Scan Penyakit Katarak',
    content: 'Deteksi penyakit katarak menggunakan kamera smartphone',
    navigate: 'ScanScreen',
  },
  {
    image:
      'https://seebetterflorida.com/wp-content/uploads/2014/05/glaucoma-300x228.jpg',
    title: 'Scan Penyakit Glukoma',
    content: 'Deteksi penyakit katarak menggunakan kamera smartphone',
    navigate: 'GlukomaScreen',
  },
  {
    image:
      'https://res.cloudinary.com/dk0z4ums3/image/upload/v1640311815/attached_image/penyakit/oftalmologi/retinopati.jpg',
    title: 'Scan Penyakit Diabetes Retinopati',
    content: 'Deteksi penyakit katarak menggunakan kamera smartphone',
    navigate: 'DiabetesScreen',
  },
];

export default ScanMenu;
