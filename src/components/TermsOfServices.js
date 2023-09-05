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

const TermsOfServices = () => {
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
          <View className="bg-white p-5 rounded-[20px] w-[90%] max-h-[80%]">
            <Text className="text-center font-bold text-lg mb-2 text-black">
              Terms of Services
            </Text>
            <ScrollView className="h-[70vh] mb-4 px-3" indicatorStyle="white">
              <Text className="text-justify">
                Terms of Service (ToS) Aplikasi Scanocular untuk Penelitian dan
                Pengembangan
              </Text>

              <Text style={styles.listItem}>1. Penerimaan Persyaratan</Text>
              <Text style={styles.paragraph}>
                a. Dengan menggunakan aplikasi Scanocular, pengguna setuju untuk
                terikat oleh semua persyaratan dalam Terms of Service ini.
              </Text>
              <Text style={styles.paragraph}>
                b. Jika pengguna tidak setuju dengan salah satu bagian dari
                persyaratan ini, pengguna tidak diizinkan menggunakan aplikasi
                ini.
              </Text>

              <Text style={styles.listItem}>2. Penggunaan Aplikasi</Text>
              <Text style={styles.paragraph}>
                a. Aplikasi Scanocular hanya boleh digunakan oleh pengguna yang
                telah memahami bahwa aplikasi ini hanya untuk tujuan penelitian
                dan pengembangan.
              </Text>
              <Text style={styles.paragraph}>
                b. Data yang dihasilkan dari pemindaian mata pengguna akan
                digunakan secara anonim dan dijamin kerahasiaannya sesuai dengan
                kebijakan privasi yang berlaku.
              </Text>
              <Text style={styles.paragraph}>
                c. Pengguna diharapkan untuk memberikan informasi yang akurat
                dan valid saat menggunakan aplikasi ini.
              </Text>

              <Text style={styles.listItem}>3. Keterbatasan Aplikasi</Text>
              <Text style={styles.paragraph}>
                a. Aplikasi Scanocular tidak dimaksudkan sebagai pengganti
                diagnosis medis yang dilakukan oleh tenaga medis yang
                berkualifikasi.
              </Text>
              <Text style={styles.paragraph}>
                b. Hasil pemindaian dan rekomendasi yang diberikan oleh aplikasi
                ini hanya bersifat informasional dan tidak boleh dianggap
                sebagai diagnosis medis yang sah.
              </Text>

              <Text style={styles.listItem}>
                4. Penggunaan Data untuk Penelitian dan Pengembangan
              </Text>
              <Text style={styles.paragraph}>
                a. Data yang diperoleh dari pemindaian mata pengguna dapat
                digunakan untuk penelitian dan pengembangan aplikasi oleh pihak
                yang berwenang.
              </Text>
              <Text style={styles.paragraph}>
                b. Data yang digunakan akan diolah dan dianonimkan agar tidak
                dapat diidentifikasi secara personal.
              </Text>
              <Text style={styles.paragraph}>
                c. Pihak yang berwenang akan menjaga kerahasiaan dan keamanan
                data sesuai dengan kebijakan privasi yang berlaku.
              </Text>
              <Text style={styles.paragraph}>
                d. Data hasil pemindaian akan dikirimkan ke email pengguna yang
                sudah terdaftar pada aplikasi.
              </Text>

              <Text style={styles.listItem}>5. Tanggung Jawab Pengguna</Text>
              <Text style={styles.paragraph}>
                a. Pengguna bertanggung jawab penuh atas penggunaan aplikasi ini
                dan hasil yang diperoleh dari pemindaian mata.
              </Text>
              <Text style={styles.paragraph}>
                b. Pengguna diharapkan untuk menggunakan aplikasi dengan bijak
                dan sesuai dengan ketentuan hukum yang berlaku.
              </Text>
              <Text style={styles.paragraph}>
                c. Pengguna tidak diperkenankan untuk menggunakan aplikasi ini
                untuk tujuan yang melanggar hukum, menyesatkan, atau merugikan
                pihak lain.
              </Text>

              <Text style={styles.listItem}>6. Perubahan dan Pembatalan</Text>
              <Text style={styles.paragraph}>
                a. Pihak pengembang berhak untuk mengubah atau memperbarui Terms
                of Service ini sesuai kebijakannya.
              </Text>
              <Text style={styles.paragraph}>
                b. Pembaruan atau perubahan akan diinformasikan kepada pengguna
                melalui pemberitahuan di aplikasi atau melalui saluran
                komunikasi yang sesuai.
              </Text>

              <Text style={styles.listItem}>
                7. Ganti Rugi dan Tanggung Jawab Hukum
              </Text>
              <Text style={styles.paragraph}>
                a. Pengguna setuju untuk membebaskan pihak pengembang dari
                segala tuntutan, gugatan, atau klaim yang timbul akibat
                penggunaan aplikasi ini.
              </Text>
              <Text style={styles.paragraph}>
                b. Pihak pengembang tidak bertanggung jawab atas kerugian
                langsung atau tidak langsung yang timbul dari penggunaan
                aplikasi atau ketidakmampuan untuk menggunakannya.
              </Text>

              <Text style={styles.listItem}>8. Hukum yang Berlaku</Text>
              <Text style={styles.paragraph}>
                a. Persyaratan ini tunduk pada hukum yang berlaku di wilayah
                yang relevan.
              </Text>
              <Text style={styles.paragraph}>
                b. Setiap perselisihan yang timbul dalam kaitannya dengan
                penggunaan aplikasi ini akan diselesaikan secara damai atau
                melalui mekanisme penyelesaian sengketa yang berlaku.
              </Text>

              <Text className="text-justify">
                Dengan menyetujui persyaratan di atas, pengguna dianggap telah
                membaca, memahami, dan menyetujui semua persyaratan dalam Terms
                of Service aplikasi Scanocular ini.
              </Text>
            </ScrollView>
            <TouchableOpacity
              className="bg-[#295FA6] p-2 rounded-md"
              title="Setuju"
              onPress={togglePopup}>
              <Text className="text-center font-[Poppins-Medium] text-white">
                Setuju
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
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TermsOfServices;
