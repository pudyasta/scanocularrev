import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const Tutorial = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    // Open the pop-up when the component mounts
    setPopupVisible(true);

    // Clean up by closing the pop-up when the component unmounts
    return () => {
      setPopupVisible(false);
    };
  }, []);

  return (
    <View>
      <Modal visible={isPopupVisible} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black/[0.5] ">
          <View className="bg-white p-5 rounded-[20px] w-[90%] max-h-[50%]">
            <Text className="text-center font-bold text-lg mb-2 text-black">
              Petunjuk Penggunaan Fitur Scan Mata
            </Text>
            <ScrollView className="h-[70vh] mb-4 px-3" indicatorStyle="white">
              <Text className="text-justify my-1 text-[16px] mb-3">
                Ikuti petunjuk di bawah ini agar hasil scan semakin akurat
              </Text>

              <Text style={styles.listItem}>
                1. Pastikan melepas semua atribut mata seperti kacamata, lensa
                kontak, dan sejenisnya
              </Text>

              <Text style={styles.listItem}>
                2. Atur jarak 10 hingga 20 cm dari kamera handphone ke salah
                satu mata
              </Text>

              <Text style={styles.listItem}>
                3. Jika memungkinkan nyalakan flash untuk menghindari pantulan
                cahaya ruangan disekitar anda
              </Text>
            </ScrollView>
            <TouchableOpacity
              className="bg-[#295FA6] p-2 rounded-md"
              title="Setuju"
              onPress={togglePopup}>
              <Text className="text-center font-[Poppins-Medium] text-white">
                Lanjutkan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Tutorial;
