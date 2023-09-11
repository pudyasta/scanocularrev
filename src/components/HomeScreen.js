import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import avatar from '../../public/profile.png';
import heroImage from '../../public/hero.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {getAsyncData} from '../helpers/getAsyncData';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);

  useEffect(() => {
    getAsyncData()
      .then(res => {
        setData(res.data.name);
      })
      .catch(e => {
        ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
      });
  }, []);

  if (data == null) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="blue" />;
  }

  const toProfile = () => {
    navigation.navigate('Profilepage');
  };

  return (
    <View style={{flex: 1}} className=" bg-white">
      <TouchableOpacity onPress={toProfile}>
        <View className="flex-row items-center  p-5">
          <Image source={avatar} className="w-8 h-8 mr-4" />
          <Text className="text-lg font-['Poppins-SemiBold'] capitalize text-black">
            {data}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Gambar hero */}
      <Image source={heroImage} className="w-[100vw] h-48 mb-4" />

      {/* Daftar berita */}
      <Text className="text-lg my-2 px-5 text-xl font-['Poppins-SemiBold'] text-black">
        Berita
      </Text>
      <ScrollView className="px-5 mt-2">
        {SECTIONS.map((item, index) => (
          <View
            key={index}
            className="bg-white rounded-md drop-shadow-xl p-4 mb-4 "
            style={{
              backgroundColor: 'white',
              borderRadius: 8,
              elevation: 4,
              shadowColor: '#171717',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              padding: 10,
            }}>
            <View className="flex-row items-center mb-2 gap-2">
              <Image
                source={item.uri}
                className="w-24 h-20 mr-2 rounded-lg h-full"
              />
              <View className="flex" style={{flex: 1}}>
                <Text
                  className="text-sm font-['Poppins-SemiBold'] mb-2 text-justify text-black"
                  numberOfLines={2}>
                  {item.title.substring(0, 70)}...
                </Text>
                <View className="flex flex-row">
                  <Text className="text-xs font-['Poppins-Regular']">BY </Text>
                  <Text className="text-xs text-blue-600 mr-2 font-['Poppins-Regular']">
                    {item.source}
                  </Text>
                  <Icon size={14} color="blue" name="clock-o" />
                  <Text className="text-xs ml-1 font-['Poppins-Regular']">
                    {item.datetime}
                  </Text>
                </View>
                <Text
                  className="text-blue-600 font-['Poppins-SemiBold'] text-md mt-2"
                  onPress={() => navigation.navigate('ArticleView', item)}>
                  Cek Selengkapnya
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export const SECTIONS = [
  {
    title: 'Dokter RSA UGM Jelaskan Cara Cegah Penularan',
    uri: require('../../public/images/new1.png'),
    source: 'Universitas Gadjah Mada',
    datetime: '8 Juni 2023',
    desc: `Mata merah disertai belekan menjadi salah satu penyakit yang cukup membuat cemas karena mudah menular. Dokter Spesialis Mata Rumah Sakit Akademik (RSA) UGM, dr. Tri Winarti, Sp.M., mengatakan mata merah dan belekan merupakan gejala dari konjungtivitis karena adanya perdangan pada selaput mata yang melapisi permukaan bola mata.

    “Konjungtivis ini paling sering terjadi disebabkan oleh infeksi virus yang penularannya cenderung cepat, terlebih yang dikarenakan adenovirus,” jelasnya, Kamis (8/6).
    
    Selain disebabkan oleh infeksi virus, Winarti menyebutkan konjugtivitis ada yang disebabkan oleh infeksi bakteri misalnya oleh gonorrhea atau klamidia. Lalu, konjungtivitis karena reaksi alergi dengan pemicu yang beragam mulai dari kotoran, debu, bulu hewan, maupun tungau.
    Winarti mengatakan konjungtivitis yang disebabkan oleh infeksi virus biasanya menimbulkan keluhan atau gejala berupa mata merah, disertai rasa gatal, mengganjal, berair hinggga belekan. Kendati begitu penyakit ini tidak mengakibatkan penurunan tajam pengelihatan.
    
    “Gejalanya hampir sama dengan keratitis atau peradangan pada kornea mata berupa mata merah dan berair. Namun, keratitis bisa mengakibatkan penurunan tajam pengelihatan, sementara konjungtivitis tidak,” paparnya.
    
    Ia menyampaikan bahwa konjugtivitis karena infeksi virus bersifat mudah menular sehingga perlu penanganan segera untuk mencegah penularan. Terdapat beberapa cara yang dapat dilakukan guna mencegah penularan konjungtivitis salah satunya adalah menjaga kebersihan dengan rutin mencuci tangan dan tidak menyentuh mata secara langsung, terlebih setelah melakukan kontak langsung dengan penderita konjungtivitis. Lalu, tidak berbagi barang pribadi seperti handuk dengan orang lain.
    
    “Kalau mengalami belekan sebaiknya tidak usah berangkat kerja dulu untuk menghambat penularan dan saat di rumah juga menjalankan karantina,” tuturnya.
    
    Ia pun mengimbau masyarakat untuk tidak melakukan self diagnose saat mengalami mata merah karena penaganan yang kurang tepat dapat memperparah infeksi bahkan merusak korena mata.
    
    “Jangan membeli obat tetes sembarangan karena di dalamnya ada yang mengandung campuran steroid sehingga jika ada luka bisa merusak kornea mata. Sebaiknya diperiksakan ke dokter atau mengunjungi layanan kesehatan terdekat supaya mendapatkan penanganan yang tepat,”tegasnya.
    
    Penulis: Ika`,
  },
  {
    title: 'JEC Eye Klaim Atasi 18 Ribu   Kelainan Refraksi Mata Indonesia',
    uri: require('../../public/images/new2.png'),
    source: 'Republika',
    datetime: '8 Mei 2023',
    desc: `   JEC Eye Hospitals and Clinics mengukuhkan posisinya sebagai eye care leader di Indonesia setelah berhasil mengatasi kelainan refraksi pasien pada lebih dari 18 ribu mata di Indonesia menggunakan ReLEx SMILE. Teknologi mutakhir ini merupakan inovasi keluaran ZEISS, yakni perusahaan global yang fokus pada pengembangan solusi optik dan optoelektronik. 
    Melalui ReLEx SMILE, ZEISS telah sukses mengoreksi 7 juta mata pasien di seluruh dunia. Dari jumlah itu, JEC menjadi penyedia penyedia layanan ReLEx SMILE terbanyak (Top Contributor) secara global.
    Atas kontribusi tersebut, ZEISS memberikan apresiasi khusus kepada JEC, dengan seremoni penyerahan penghargaan telah dilaksanakan pada 12 Mei 2023 lalu di Rumah Sakit Mata JEC Kedoya. Penghargaan diserahkan oleh Head of Business Unit at ZEISS Medical Technology di Indonesia, Timotius Prawirahalim Lim kepada Presiden Direktur JEC Group, DR. Dr. Johan A. Hutauruk, SpM(K) dan Direktur Utama RS Mata JEC Kedoya, DR. Dr. Setiyo Budi Riyanto, SpM(K).`,
  },

  {
    title: '6 Cara Mengatasi Mata Lelah Melihat Layar Perangkat',
    uri: require('../../public/images/new3.png'),
    source: 'kontan.id',
    datetime: '30 Juni 2023',
    desc: `TIPS & TRIK - JAKARTA. Simak beberapa cara mengatasi mata lelah melihat layar. Masalah penglihatan yang tidak nyaman tentu dapat terjadi pada siapa saja. Mata lelah yang disebabkan oleh penggunaan layar hp dan laptop secara intensif tentu bisa timbul di kalangan pekerja.

    Masalah ini bisa dikenal dengan istilah "Computer Vision Syndrome" atau sindrom penglihatan komputer. Adapun, banyak penyebab Anda bisa menderita mata lelah yang bisa diminimalkan dengan mudah.
    Penyebab mata lelah melihat layar Simak beberapa penyebab mata lelah melihat layar perangkat: Paparan cahaya biru: Layar hp dan laptop menghasilkan cahaya biru yang dapat menyebabkan kelelahan mata. Paparan terlalu lama dan terlalu dekat dengan cahaya biru ini dapat mengganggu keseimbangan visual dan menyebabkan ketegangan pada mata. Tegangan mata: Fokus terus-menerus pada layar yang dekat dan kecil dapat menyebabkan ketegangan pada otot-otot mata, termasuk otot yang mengontrol fokus dan gerakan mata. Kurangnya kedipan: Ketika menggunakan layar hp atau laptop, cenderung kurang berkembang. Ini dapat mengakibatkan mata menjadi kering dan teriritasi. Posisi dan jarak yang tidak ergonomis: Posisi tubuh yang tidak nyaman atau jarak pandang yang terlalu dekat dengan layar dapat menyebabkan ketegangan dan kelelahan mata. Beberapa cara untuk mengatasi mata lelah akibat penggunaan layar hp dan laptop dilansir dari Healthline.
    Cara mengatasi mata lelah melihat layar
    
    1. Istirahatkan mata secara teratur Untuk mengurangi masalah mata lelah, Anda bisa istirahat mata setiap 20-30 menit dengan melihat objek yang jauh selama beberapa detik. Langkah ini membantu merilekskan otot mata dan mengurangi ketegangan. 
    
    2. Atur pencahayaan ruangan Pastikan ruangan tempat menggunakan perangkat hp atau laptop memiliki pencahayaan yang cukup. Hindari terlalu banyak cahaya yang mengarah langsung ke layar untuk mengurangi kelelahan mata. Selain itu, pencahayaan yang baik dapat diketahui menggunakan media kamera laptop yakni melihat wajah sudah terlihat dengan jelas atau tidak.
    
    3. Ubah posisi dan jarak pandang Anda juga bisa pastikan posisi duduk dan jarak pandang terhadap layar nyaman dan ergonomis. Pastikan layar berada pada ketinggian mata yang tepat dan jaga jarak pandang yang cukup untuk mengurangi ketegangan mata.
    
    4. Gunakan aturan 20-20-20 Aturan ini cukup efektif untuk mengurangi masalah mata lelah melihat layar perangkat. Ini artinya setiap 20 menit, arahkan pandangan ke objek yang berjarak sekitar 20 kaki (sekitar 6 meter) selama 20 detik. Hal ini membantu mengurangi kelelahan mata dan memulihkan fokus visual agar mata juga sehat. 
    
    5. Gunakan penyangga mata Gunakan tetes mata buatan atau penyangga mata yang direkomendasikan oleh dokter mata untuk membantu menjaga kelembaban mata dan mencegah kekeringan. 
    
    6. Kenakan kacamata khusus Untuk penggunaan yang intensif, pertimbangkan menggunakan kacamata khusus dengan lensa anti silau atau lensa yang difilter untuk mengurangi paparan cahaya biru. Selain itu, penting juga untuk menjaga kesehatan mata secara keseluruhan dengan menjaga pola makan yang sehat, cukup tidur, dan menjaga kelembapan udara di sekitar Anda. Jika gejala mata lelah terus berlanjut atau mengganggu aktivitas sehari-hari Anda, disarankan untuk berkonsultasi dengan dokter mata. Demikian informasi terkait cara mengatasi masalah mata lelah melihat layar atau Computer Vision Syndrome.
        
    `,
  },

  {
    title: 'Cara Mengatasi Mata Bengkak setelah Bangun Tidur',
    source: 'Klik dokter',
    datetime: '31 Mei 2023',
    uri: require('../../public/images/new1.png'),
    desc: `Mata bengkak sewaktu bangun tidur menjadi hal yang pernah dialami oleh kebanyakan orang. Kondisi ini umumnya tidak berbahaya, tetapi mata bengkak bisa menimbulkan rasa tidak nyaman serta memengaruhi penampilan. 

    Terdapat sejumlah penyebab mata bengkak saat bangun tidur. Dalam beberapa kasus, mata bengkak bisa hilang dengan sendirinya. Ketahui lebih lanjut terkait penyebab dan cara mengatasi mata bengkak dengan membaca artikel di bawah ini. 
    
    Penyebab Mata Bengkak saat Bangun Tidur
    Dijelaskan dr. Theresia Rina Yunita, ada sejumlah penyebab yang bisa membuatmu terbangun dengan mata bengkak, di antaranya:
    
    1. Tidur terlalu lama 
    Pada dasarnya, tubuh akan terus memproduksi air mata. Di siang hari, mata terus mengedip sehingga air mata akan membersihkan dan mengeluarkan kotoran yang menempel. 
    
    Di malam hari, tubuh juga tetap memproduksi air mata. Namun sewaktu tertidur, mata akan berhenti mengedip sehingga lapisan air mata tetap berada di mata. Kelebihan cairan ini dapat menyebabkan terjadinya pembengkakan. 

    2. Menangis
    Bila sebelum tidur malam kamu menangis, bisa jadi keesokan harinya mata kamu bengkak ketika bangun tidur.
    
    Saat menangis, tubuh akan cenderung mengeluarkan banyak air mata. Tubuh berusaha untuk menyerap kembali cairan, air mata akan tertahan sebagian di jaringan bawah mata dan menyebabkan area tersebut menjadi bengkak. 
    
    3. Digigit serangga
    Gigitan serangga di dekat area mata juga bisa mengakibatkan mata bengkak. Pasalnya, jaringan mata yang longgar dan sensitif bisa membengkak dengan mudah. Biasanya, gigitan serangga yang paling umum disebabkan dari nyamuk. 
    
    4. Alergi atau Dermatitis Kontak 
    Penyebab paling umum dari mata bengkak setelah bangun tidur adalah alergi mata. Kondisi ini bisa disebabkan oleh debu, tungau, atau paparan lain yang terkena mata sewaktu tidur. 
    
    Ketika sistem kekebalan tubuh menunjukkan reaksi berlebihan terhadap benda asing, maka sel-sel di mata akan mengeluarkan histamin untuk melindungi mata. Hal tersebut menyebabkan pembuluh darah di dalam mata menjadi bengkak. 
    
    Cara Mengatasi Mata Bengkak saat Bangun Tidur
    Karena menimbulkan rasa tidak nyaman, tentunya mata bengkak ini perlu segera diatasi. Berikut cara mengatasi mata bengkak setelah bangun tidur:
    
    1. Kompres Air Hangat
    Kamu bisa melakukan kompres dingin dan hangat pada mata. Untuk meredakan gejala nyeri di mata bengkak, kamu bisa melakukan kompres hangat. 
    
    Jika ingin membantu mengurangi penumpukan cairan, coba lakukan kompres dingin. Kamu juga bisa menggunakan kantong teh dingin untuk mengatasi kelopak mata yang bengkak. 
       
    2. Bersihkan Area Mata
    Seperti yang telah diketahui, alergi bisa menyebabkan mata bengkak setelah bangun tidur. Untuk itu, tidak ada salahnya untuk rutin membersihkan area mata. 
    
    “Bersihkan area mata untuk meminimalisir kemungkinan paparan alergen atau pemicu terjadinya alergi,” saran Dokter There. 
    
    3. Tidur Cukup 
    Rekomendasi Posisi Tidur yang Nyaman untuk Penyakit Vertigo
    Tidur yang nyenyak dengan durasi cukup dapat membantu mengurangi mata bengkak. Orang dewasa membutuhkan sekitar 7-9 jam untuk tidur setiap malam. Pastikan kamu tidur cukup setiap malam, ya!
    
    4. Gunakan Bantal yang Tepat 
    Untuk mengurangi bengkak, sebaiknya kamu menggunakan bantal yang pas ketika tidur. Hindari menumpuk bantal terlalu tinggi karena hal tersebut hanya akan membuatmu tidur dengan tidak nyaman. 
      
    5. Cukupi Kebutuhan Cairan
    Mata bengkak bisa disebabkan oleh dehidrasi. Untuk itu, usahakan mencukupi cairan dalam tubuh dengan minum air putih hingga 8 gelas per hari. 
    
    6. Jangan Konsumsi Alkohol
    Ada baiknya untuk membatasi dan menghindari alkohol untuk mencegah dehidrasi. Kamu bisa menggantinya dengan segelas air putih. Jika ingin minum minuman berasa, coba buat infused water dengan menambahkan buah segar seperti lemon ke dalam air. 
    
    7. Gunakan Krim Mata
    Untuk mengurangi bengkak, kamu bisa mengaplikasikan krim mata. Mengingat bahwa kulit area mata sangat sensitif, maka perhatikan komposisi dari krim yang akan digunakan. Pilih krim yang mengandung mentimun dan kamomil yang dapat meredakan mata bengkak. 
    
    Bila mata bengkak tidak kunjung membaik, segera minta bantuan tenaga medis untuk mendapatkan perawatan yang tepat. Unduh aplikasi KlikDokter dan gunakan layanan Tanya Dokter untuk konsultasi lebih praktis.`,
  },
];

export default HomeScreen;
