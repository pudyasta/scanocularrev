import {View, TouchableOpacity, Image} from 'react-native';
import {StyleSheet, ActivityIndicator, Linking, Text} from 'react-native';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TermsOfServices from '../components/TermsOfServices';
import RNFS from 'react-native-fs';

const ScanScreen = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(null);
  const [flashtoggle, setFlashToggle] = useState(false);
  const cameraRef = useRef(Camera);
  const [camView, setCamView] = useState('back');
  const [torch, setTorch] = useState('off');
  const devices = useCameraDevices();
  const device = camView === 'back' ? devices.back : devices.front;
  const [dataPath, setDataPath] = useState('');

  const cameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission !== 'authorized') {
      await Linking.openSettings();
    }
    setLoading(devices);
  };

  useEffect(() => {
    cameraPermission();
  }, [cameraPermission, devices]);
  const takePhoto = async () => {
    setLoading(true);

    // navigation.navigate('Resultpage');
    try {
      if (cameraRef.current == null) {
        throw new Error('Camera Ref is Null');
      } else {
        const photo = await cameraRef.current.takeSnapshot({
          quality: 85,
          skipMetadata: true,
        });

        setDataPath(photo.path);
        RNFS.readFile(photo.path, 'base64').then(async res => {
          var path = RNFS.ExternalDirectoryPath + '/test.txt';

          // write the file
          RNFS.writeFile(path, res, 'utf8')
            .then(success => {
              console.log('FILE WRITTEN! ' + path);
            })
            .catch(err => {
              console.log(err.message);
            });
        });
        console.log(dataPath);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!device || !cameraPermission) {
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
              {...props}
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
