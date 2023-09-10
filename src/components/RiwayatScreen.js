import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import avatar from '../../public/profile.png';
import axios from 'axios';
import {getAsyncData} from '../helpers/getAsyncData';
const RiwayatScreen = () => {
  const [response, setResponse] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAsyncData()
      .then(e => {
        axios
          .get(
            'https://scanocular.online/api/pemeriksaan/user/' + e.data.user_id,
          )
          .then(res => {
            setResponse(res.data.data);
            setRefreshing(false);
          })
          .catch(e => {
            ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
            setRefreshing(false);
          });
      })
      .catch(e => {
        ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    getAsyncData()
      .then(e => {
        axios
          .get(
            'https://scanocular.online/api/pemeriksaan/user/' + e.data.user_id,
          )
          .then(res => {
            setResponse(res.data.data);
          })
          .catch(e => {
            ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
          });
      })
      .catch(e => {
        ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
      });
  }, []);

  if (response == null) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="blue" />;
  }
  return (
    <View className="p-4 h-full bg-white">
      <View className="flex-row items-center pb-5">
        <Image source={avatar} className="w-8 h-8 left-1 top-1 absolute" />
        <Text className="text-lg text-black font-bold  w-full flex-1 text-center">
          Riwayat
        </Text>
      </View>
      {/* ... */}
      {/* List */}
      <ScrollView
        className="border-t border-gray-300 pt-4 "
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {response.map((item, i) => (
          <React.Fragment key={i}>
            {/* List Item */}
            <View className="flex-row items-center">
              {item.diagnosa == 'normal' || item.status == 'unconfirm' ? (
                <View className="w-12 h-12 rounded-full bg-[#31A3DC] flex items-center justify-center">
                  <Icon size={24} color="white" name="eye" />
                </View>
              ) : item.status == 'pending' ? (
                <View className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
                  <Icon size={24} color="white" name="eye" />
                </View>
              ) : (
                <View className="w-12 h-12 rounded-full bg-red-700 flex items-center justify-center">
                  <Icon size={24} color="white" name="eye" />
                </View>
              )}

              <View className="  overflow-auto flex flex-1 ml-4">
                <View className=" flex-row justify-between ">
                  <Text className="text-base font-['Poppins-SemiBold'] text-black ">
                    Mata{' '}
                    {item.diagnosa == 'normal' || item.status == 'unconfirm'
                      ? 'Sehat'
                      : item.status == 'pending'
                      ? 'Terindikasi'
                      : 'Terkonfirmasi Katarak'}
                  </Text>
                  <Text className="text-sm text-gray-500 font-['Poppins-Regular']">
                    {item.date}
                  </Text>
                </View>
                <Text className="text-sm font-['Poppins-Regular'] mt-2">
                  Pesan:
                  {item.diagnosa == 'normal' || item.status == 'unconfirm'
                    ? 'Selalu jaga kesehatan mata serta lakukan screening secara rutin'
                    : item.status == 'pending'
                    ? 'Kondisi mata terindikasi mengalami katarak dan sedang dalam tahap verifikasi fasilitas kesehatan'
                    : 'Kondisi mata terkonfirmasi mengalami katarak, kami himbau untuk segera melakukan cek kesehatan lebih lanjut ke fasilitas kesehatan terdekat'}
                </Text>
              </View>
            </View>
            <View className="border-t border-gray-300 mt-4 mb-4" />
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

export default RiwayatScreen;
