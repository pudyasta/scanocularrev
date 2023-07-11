import React from 'react';
import {View, Text, Image} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import avatar from '../../public/profile.png';
const RiwayatScreen = () => {
  // Data JSON contoh
  const data = [
    {
      id: 1,
      kondisiMata: 'sehat',
      tanggalPeriksa: '12 Juli 2023',
      pesan: 'Mata dalam kondisi sehat',
    },
    {
      id: 2,
      kondisiMata: 'terindikasi',
      tanggalPeriksa: '15 Juli 2023',
      pesan: 'Ada indikasi masalah pada mata',
    },
    {
      id: 3,
      kondisiMata: 'terkonfirmasi',
      tanggalPeriksa: '18 Juli 2023',
      pesan: 'Mata terkonfirmasi mengalami masalah',
    },
  ];

  return (
    <View className="p-4 h-full bg-white">
      <View className="flex-row items-center pb-8">
        <Image source={avatar} className="w-8 h-8 mr-4 absolute" />
        <Text className="text-lg font-bold  w-full flex-1 text-center">
          Riwayat
        </Text>
      </View>
      {/* ... */}
      {/* List */}
      <View className="border-t border-gray-300 pt-4 ">
        {data.map(item => (
          <React.Fragment key={item.id}>
            {/* List Item */}
            <View className="flex-row items-center">
              {item.kondisiMata === 'sehat' ? (
                <View className="w-12 h-12 rounded-full bg-green-700 flex items-center justify-center">
                  {/* <Ionicons name="eye" size={24} color={'white'} /> */}
                  <Text>ok</Text>
                </View>
              ) : item.kondisiMata === 'terindikasi' ? (
                <View className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
                  {/* <Ionicons name="eye" size={24} color={'white'} /> */}
                  <Text>ok</Text>
                </View>
              ) : (
                <View className="w-12 h-12 rounded-full bg-red-700 flex items-center justify-center">
                  {/* <Ionicons name="eye" size={24} color={'white'} /> */}
                  <Text>ok</Text>
                </View>
              )}

              <View className="  overflow-auto flex flex-1 ml-4">
                <View className=" flex-row justify-between ">
                  <Text className="text-base font-['Poppins-SemiBold'] ">
                    Mata {item.kondisiMata}
                  </Text>
                  <Text className="text-sm text-gray-500 font-['Poppins-Regular']">
                    {item.tanggalPeriksa}
                  </Text>
                </View>
                <Text className="text-sm font-['Poppins-Regular'] mt-2">
                  Pesan: {item.pesan}
                </Text>
              </View>
            </View>
            <View className="border-t border-gray-300 mt-4 mb-4" />
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default RiwayatScreen;
