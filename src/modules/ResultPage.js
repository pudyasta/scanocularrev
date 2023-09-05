import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import avatar from '../../public/logo.png';

import img1 from '../../public/res1.png';
import img2 from '../../public/res2.png';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {getAsyncData} from '../helpers/getAsyncData';
import {err} from 'react-native-svg/lib/typescript/xml';
import {Toast} from 'native-base';

const ResultPage = () => {
  const [datas, setDatas] = useState(null);
  const navigate = useNavigation();
  const item = useRoute().params;
  const handleBack = () => {
    navigate.navigate('Mainpage');
  };

  useEffect(() => {
    getAsyncData()
      .then(res => {
        setDatas(res);
      })
      .catch(err => {
        ToastAndroid.show('Internal server error', ToastAndroid.SHORT);
      });
  }, []);

  if (datas == null) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="blue" />;
  }
  return (
    <View className="flex-1  bg-slate-200">
      <View className="flex-row justify-between items-center h-16 py-1 m-4">
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={20} />
        </TouchableOpacity>
        <View className="flex-row">
          <Image source={avatar} className="w-8 h-8 mr-4" />
          <Text className="text-lg font-bold font-[Poppins-SemiBold] text-black">
            SCANOCULAR
          </Text>
        </View>
        <View className="w-10" />
      </View>

      <View className="bg-white h-full rounded-t-[30px]">
        <Text className="text-center font-bold text-[18px] pt-8 text-black">
          Hasil Uji
        </Text>

        <ScrollView className="h-full bg-white mt-2  ">
          <View className="pl-4 pr-4 pb-12 ">
            <View className="flex-row mt-8">
              <View className="flex-1  pt-2 pb-2 ">
                <Text className="font-bold text text-black">Nama</Text>
              </View>
              <View className="flex-1   pt-2 pb-2 ">
                <Text className="text-right text-black font-[Poppins-Regular]">
                  {datas.data.name}
                </Text>
              </View>
            </View>

            <View className="flex-row ">
              <View className="flex-1  pt-2 pb-2 ">
                <Text className="font-bold text-black">Tanggal Lahir</Text>
              </View>
              <View className="flex-1   pt-2 pb-2 ">
                <Text className="text-right text-black font-[Poppins-Regular">
                  {datas.data.ttl}
                </Text>
              </View>
            </View>

            <View className="flex-row ">
              <View className="flex-1 pt-2 pb-2 ">
                <Text className="text-black font-bold">NIK</Text>
              </View>
              <View className="flex-1   pt-2 pb-2 ">
                <Text className="text-right font-[Poppins-Regular] text-black">
                  {datas.data.NIK}
                </Text>
              </View>
            </View>

            <View className="flex-row ">
              <View className="flex-1  pt-2 pb-2 ">
                <Text className="text-black font-bold">Alamat</Text>
              </View>
              <View className="flex-1   pt-2 pb-2 ">
                <Text className="text-right font-[Poppins-Regular] text-black">
                  {datas.data.alamat}
                </Text>
              </View>
            </View>

            <View className="flex-row ">
              <View className="flex-1 pt-2 pb-2 ">
                <Text className="text-black font-bold">Tanggal Tes</Text>
              </View>
              <View className="flex-1   pt-2 pb-2 ">
                <Text className="text-right font-[Poppins-Regular] text-black">
                  {new Date().toLocaleDateString().replaceAll('/', ' ')}
                </Text>
              </View>
            </View>

            <View className="flex-row mt-5">
              <View className="flex-1 pt-2 pb-2 ">
                <Text className="text-black font-bold ">Indikasi</Text>
              </View>
              <View className="flex-1   pt-2 pb-2 ">
                <Text
                  className={`text-right font-bold font-[Poppins-SemiBold] ${
                    item.data == 'cataract' ? 'text-red-500' : 'text-green-500'
                  }`}>
                  {item.data == 'cataract'
                    ? 'Terindikasi Katarak'
                    : 'Mata Sehat'}
                </Text>
              </View>
            </View>

            {item.data == 'cataract' && (
              <>
                <Text className="text-black font-bold  mt-2">Informasi</Text>

                <Text className="text-justify mt-1 font-[Poppins-Regular] text-black text-xs">
                  Data hasil pemindaian anda akan diperiksa oleh tenaga
                  kesehatan yang telah bekerjasama dengan Scanocular. Hasil
                  peninjauan akan dikirimkan kembali kepada pengguna setelah
                  mendapat persetujuan dari pihak peninjau.
                </Text>

                <Text className="text-black font-bold  mt-2">
                  Uraian Penyakit
                </Text>

                <Text className="text-justify mt-1 font-[Poppins-Regular] text-black text-xs">
                  Katarak adalah suatu penyakit ketika lensa mata menjadi keruh
                  dan berawan. Pada umumnya, katarak berkembang perlahan dan
                  awalnya tidak terasa mengganggu. Namun, lama-kelamaan, katarak
                  akan mengganggu penglihatan dan membuat pengidap merasa
                  seperti melihat jendela berkabut, sulit menyetir, membaca,
                  serta melakukan aktivitas sehari-hari. Penyakit mata ini
                  merupakan penyebab kebutaan utama di dunia yang dapat diobati.
                </Text>

                <View className="flex-row mt-8 mb-32 gap-x-5">
                  <Image
                    className="flex-1 pt-2 pb-2 h-96"
                    source={{uri: 'file://' + item.path}}></Image>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ResultPage;
