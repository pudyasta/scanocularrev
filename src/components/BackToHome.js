import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const BackToHome = ({color, text}) => {
  const navigation = useNavigation();
  const handleIconClick = () => {
    navigation.goBack();
  };
  return (
    <View className="flex-row items-center  p-5">
      {/* <Image source={avatar} className="w-8 h-8 mr-4" /> */}
      <TouchableOpacity onPress={handleIconClick}>
        <Icon
          name="arrowleft"
          size={30}
          color={color != 'dark' ? 'black' : 'white'}
        />
      </TouchableOpacity>
      <Text
        className={`text-lg font-['Poppins-SemiBold'] capitalize ml-4  ${
          color != 'dark' ? 'text-black' : 'text-white'
        }`}>
        {text}
      </Text>
    </View>
  );
};

export default BackToHome;
