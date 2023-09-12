import {View, TouchableOpacity, Image} from 'react-native';
import {
  StyleSheet,
  ActivityIndicator,
  Linking,
  Text,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TermsOfServices from '../components/TermsOfServices';
import RNFS from 'react-native-fs';
import axios from 'axios';
import {BarIndicator} from 'react-native-indicators';
import {getAsyncData} from '../helpers/getAsyncData';
import Tutorial from '../components/Tutorial';

const ScanScreen = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isOn, setIsOn] = useState(false);

  const [loading, setLoading] = useState(null);
  const [userId, setUserId] = useState(null);
  const cameraRef = useRef(Camera);
  const [camView, setCamView] = useState('back');
  const devices = useCameraDevices();
  const device = camView === 'back' ? devices.back : devices.front;
  const [isProcessing, setIsProcessing] = useState(false);

  const cameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission !== 'authorized') {
      await Linking.openSettings();
    }
    setLoading(devices);
  };

  useEffect(() => {
    cameraPermission();
    getAsyncData()
      .then(res => {
        setUserId(res.data.user_id);
      })
      .catch(e => {
        navigation.goBack();
      });
  }, [cameraPermission, devices]);

  const takePhoto = async () => {
    setLoading(true);

    try {
      if (cameraRef.current == null) {
        throw new Error('Camera Ref is Null');
      } else {
        const photo = await cameraRef.current.takeSnapshot({
          quality: 85,
          skipMetadata: true,
        });
        setIsProcessing(true);
        const a = await RNFS.readFile(photo.path, 'base64');
        axios
          .post('https://scanocular.online/api/pemeriksaan/cekmata/katarak', {
            img: a,
            user_id: userId,
          })
          .then(function (res) {
            setIsProcessing(false);

            if (res.data.diagnosa == 'normal') {
              navigation.navigate('Resultpage', {data: res.data.diagnosa});
            } else if (res.data.diagnosa == 'cataract') {
              navigation.navigate('Resultpage', {
                data: res.data.diagnosa,
                path: photo.path,
              });
            } else {
              ToastAndroid.show('Mata Tidak Terdetekasi', ToastAndroid.SHORT);
            }
            // navigation.navigate('ResultPage');
          })
          .catch(function (error) {
            setIsProcessing(false);
            ToastAndroid.show(
              'Mata Tidak Terdetekasi, silahakan coba kembali',
              ToastAndroid.SHORT,
            );
          });
      }
    } catch (error) {
      setIsProcessing(false);
      ToastAndroid.show(
        'Mohon maaf terjadi galat pada sistem, silahakan coba kembali',
        ToastAndroid.SHORT,
      );
    }
  };

  // const frameProcessor = useFrameProcessor(frame => {
  //   'worklet';
  //   const scannedFaces = scanFaces(frame);
  //   runOnJS(setFaces)(scannedFaces);
  // }, []);

  if (!device || !cameraPermission) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="blue" />;
  }
  return isProcessing ? (
    <View className="h-screen justify-center items-center flex px-5">
      <BarIndicator color="blue" />
      <Text className="absolute top-1/2 -mt-24 text-center font-[Poppins-Medium] text-lg text-black">
        Kami sedang menganalisa gambar anda mohon tunggu sejenak
      </Text>
    </View>
  ) : (
    <>
      <View style={{flex: 1}}>
        {isFocused && (
          <>
            <Tutorial />
            <TermsOfServices />
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              photo={true}
              torch={isOn ? 'on' : 'off'}
              // preset="medium"
              isActive={true}
              ref={cameraRef}
              // frameProcessor={frameProcessor}
              // frameProcessorFps={5}
              {...props}
            />
          </>
        )}
        <View className="h-full flex items-end flex-row justify-center gap-x-20 pb-14">
          <TouchableOpacity>
            <Icon size={32} color="transparent" name="flash" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              takePhoto();
            }}
            className="bg-white p-6 rounded-full">
            <View>
              <Icon size={32} color="black" name="camera" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsOn(!isOn)}>
            <Icon size={32} color="white" name="flash" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ScanScreen;
