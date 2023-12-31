import React from 'react';
import {ImageBackground, ScrollView, View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';

export default function ArticleView({uri}) {
  const insets = useSafeAreaInsets();
  const item = useRoute().params;

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
        backgroundColor: 'white',
      }}>
      <ScrollView contentContainerStyle={{paddingBottom: 2}}>
        <ImageBackground
          source={item.uri}
          style={{height: 320}}
          alt="image"
          resizeMode="cover">
          <View
            className="bg-black/40 px-5 py-4 "
            bg="black:alpha.40"
            flex={1}
            alignItems="flex-start"
            justifyContent="flex-end"
            p={3}>
            <View>
              <Text className="text-white font-[Poppins-SemiBold] text-2xl">
                {item.title}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View className="py-3 px-5">
          <Text className="text-[#A8A8A8] font-[Poppins-Medium]">
            {item.datetime}
          </Text>
          <Text className="text-[#A8A8A8] font-[Poppins-Medium]">
            Oleh {item.source}
          </Text>
          <Text className="text-justify text-primary-text font-[Poppins] leading-6 text-lg">
            {item.desc}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
