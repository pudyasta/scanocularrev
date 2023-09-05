import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const BlueButton = ({
  onPress = () => {},
  className,
  textClass,
  children,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      className={'bg-[#295FA6] rounded-lg p-3 w-full mt-3 ' + className}
      onPress={onPress}>
      <Text
        className={
          "text-white text-center font-['Poppins-Medium'] " + textClass
        }>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default BlueButton;
