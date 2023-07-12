import {View, TouchableOpacity, Image} from 'react-native';
import {StyleSheet, ActivityIndicator, Linking, Text} from 'react-native';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TermsOfServices from './TermsOfServices';

const ScanScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(null);
  const [flashtoggle, setFlashToggle] = useState(false);
  const cameraRef = useRef(Camera);
  const [camView, setCamView] = useState('back');
  const [torch, setTorch] = useState('off');
  const devices = useCameraDevices();
  const device = camView === 'back' ? devices.back : devices.front;

  const cameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setLoading(devices);
  };

  useEffect(() => {
    cameraPermission();
  }, [cameraPermission, devices]);
  const takePhoto = async () => {
    setLoading(true);
    navigation.navigate('Resultpage');
    try {
      //Error Handle better
      if (cameraRef.current == null) {
        throw new Error('Camera Ref is Null');
      }
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'quality',
        flash: `${torch}`,
        enableAutoRedEyeReduction: true,
      });
    } catch (error) {}
  };
  if (device == null) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="blue" />;
  }
  return (
    <>
      <View style={{flex: 1}}>
        {isFocused && (
          <>
            <TermsOfServices />
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              photo={true}
              isActive={true}
              ref={cameraRef}
            />
          </>
        )}
        <View className="h-full flex items-end flex-row justify-center gap-x-20 pb-14">
          <TouchableOpacity
            onPress={() => {
              setFlashToggle(!flashtoggle);
              torch === 'off' ? setTorch('on') : setTorch('off');
            }}>
            <Icon size={24} color="white" name="flash" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              takePhoto();
            }}
            className="bg-white p-5 rounded-full">
            <View>
              <Icon size={24} color="black" name="camera" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              camView === 'back' ? setCamView('front') : setCamView('back');
            }}>
            <Icon size={24} color="white" name="camera-flip" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ScanScreen;
