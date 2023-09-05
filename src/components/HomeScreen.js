import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import avatar from '../../public/profile.png';
import heroImage from '../../public/hero.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {getAsyncData} from '../helpers/getAsyncData';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);

  useEffect(() => {
    getAsyncData()
      .then(res => {
        setData(res.data.name);
      })
      .catch(e => {
        ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
      });
  }, []);

  if (data == null) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="blue" />;
  }

  const toProfile = () => {
    navigation.navigate('Profilepage');
  };

  return (
    <View style={{flex: 1}} className=" bg-white">
      <TouchableOpacity onPress={toProfile}>
        <View className="flex-row items-center  p-5">
          <Image source={avatar} className="w-8 h-8 mr-4" />
          <Text className="text-lg font-['Poppins-SemiBold'] capitalize text-black">
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
        {SECTIONS.map((item, index) => (
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
                source={item.uri}
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
                <Text
                  className="text-blue-600 font-['Poppins-SemiBold'] text-md mt-2"
                  onPress={() => navigation.navigate('ArticleView', item)}>
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

export const SECTIONS = [
  {
    title: 'Dokter RSA UGM Jelaskan Cara Cegah Penularan',
    uri: require('../../public/images/new1.png'),
    source: 'Tribun.com',
    datetime: '8 Mei 2023',
    desc: 'lorem',
  },
  {
    title: 'JEC Eye Klaim Atasi 18 Ribu   Kelainan Refraksi Mata Indonesia',
    uri: require('../../public/images/new2.png'),
    source: 'Republika',
    datetime: '8 Mei 2023',
    desc: `   JEC Eye Hospitals and Clinics mengukuhkan posisinya sebagai eye care leader di Indonesia setelah berhasil mengatasi kelainan refraksi pasien pada lebih dari 18 ribu mata di Indonesia menggunakan ReLEx SMILE. Teknologi mutakhir ini merupakan inovasi keluaran ZEISS, yakni perusahaan global yang fokus pada pengembangan solusi optik dan optoelektronik. 
    Melalui ReLEx SMILE, ZEISS telah sukses mengoreksi 7 juta mata pasien di seluruh dunia. Dari jumlah itu, JEC menjadi penyedia penyedia layanan ReLEx SMILE terbanyak (Top Contributor) secara global.
    Atas kontribusi tersebut, ZEISS memberikan apresiasi khusus kepada JEC, dengan seremoni penyerahan penghargaan telah dilaksanakan pada 12 Mei 2023 lalu di Rumah Sakit Mata JEC Kedoya. Penghargaan diserahkan oleh Head of Business Unit at ZEISS Medical Technology di Indonesia, Timotius Prawirahalim Lim kepada Presiden Direktur JEC Group, DR. Dr. Johan A. Hutauruk, SpM(K) dan Direktur Utama RS Mata JEC Kedoya, DR. Dr. Setiyo Budi Riyanto, SpM(K).`,
  },

  {
    title: '6 Cara Mengatasi Mata Lelah Melihat Layar Perangkat',
    uri: require('../../public/images/new3.png'),
    source: 'halodoc.com',
    datetime: '8 Mei 2023',
    desc: 'lorem',
  },

  {
    title: 'Cara Mengatasi Mata Bengkak setelah Bangun Tidur',
    source: 'halodoc.com',
    datetime: '8 Mei 2023',
    uri: require('../../public/images/new1.png'),
    desc: 'lorem',
  },
];

export default HomeScreen;
