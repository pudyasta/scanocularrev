import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const GlukomaTest = () => {
  return (
    <ScrollView className="bg-white h-screen">
      <View style={{flex: 1}} className="bg-[#2E7FEA]">
        <Text className="py-3 px-5">halo</Text>
      </View>
      <View className="px-5">
        <Text clas>Screening Glukoma</Text>
      </View>
    </ScrollView>
  );
};

export default GlukomaTest;
