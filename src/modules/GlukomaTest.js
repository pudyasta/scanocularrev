import React, {useEffect, useMemo, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BackToHome from '../components/BackToHome';
import LinearGradient from 'react-native-linear-gradient';
import RadioGroup from 'react-native-radio-buttons-group';
import BlueButton from '../components/common/BlueButton';
import {BarIndicator} from 'react-native-indicators';
import AwesomeAlert from 'react-native-awesome-alerts';
import {getAsyncData} from '../helpers/getAsyncData';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

function generateRandomString(length) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const charsetLength = charset.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    result += charset.charAt(randomIndex);
  }

  return result;
}

const GlukomaTest = () => {
  let idx = -1;
  const navigation = useNavigation();
  const [dataUser, setDataUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const [selectedId0, setSelectedId0] = useState();
  const [selectedId1, setSelectedId1] = useState();
  const [selectedId2, setSelectedId2] = useState();
  const [selectedId3, setSelectedId3] = useState();
  const [selectedId4, setSelectedId4] = useState();
  const [selectedId5, setSelectedId5] = useState();
  const [selectedId6, setSelectedId6] = useState();
  const [selectedId7, setSelectedId7] = useState();
  const [selectedId8, setSelectedId8] = useState();
  const [selectedId9, setSelectedId9] = useState();
  const [selectedId10, setSelectedId10] = useState();
  const [selectedId11, setSelectedId11] = useState();
  const [selectedId12, setSelectedId12] = useState();
  const [selectedId13, setSelectedId13] = useState();
  const [selectedId14, setSelectedId14] = useState();
  const [selectedId15, setSelectedId15] = useState();
  const [selectedId16, setSelectedId16] = useState();
  const [selectedId17, setSelectedId17] = useState();
  const [selectedId18, setSelectedId18] = useState();

  const states = [
    selectedId0,
    selectedId1,
    selectedId2,
    selectedId3,
    selectedId4,
    selectedId5,
    selectedId6,
    selectedId7,
    selectedId8,
    selectedId9,
    selectedId10,
    selectedId11,
    selectedId12,
    selectedId13,
    selectedId14,
    selectedId15,
    selectedId16,
    selectedId17,
    selectedId18,
  ];
  const setStates = [
    setSelectedId0,
    setSelectedId1,
    setSelectedId2,
    setSelectedId3,
    setSelectedId4,
    setSelectedId5,
    setSelectedId6,
    setSelectedId7,
    setSelectedId8,
    setSelectedId9,
    setSelectedId10,
    setSelectedId11,
    setSelectedId12,
    setSelectedId13,
    setSelectedId14,
    setSelectedId15,
    setSelectedId16,
    setSelectedId17,
    setSelectedId18,
  ];

  useEffect(() => {
    getAsyncData().then(val => {
      setDataUser(val.data.user_id);
    });
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const a = states.some(res => !res);
    if (a) {
      ToastAndroid.show('Semua data harus diisi', ToastAndroid.SHORT);
      setLoading(false);
      return;
    }
    if (!sended) {
      try {
        states.forEach(async (val, i) => {
          axios
            .post(
              'http://203.175.10.56:8000/api/pemeriksaan/cekmata/screening',
              {
                scan_id: generateRandomString(10),
                user: dataUser,
                soal_id: i,
                value: val,
                type_penyakit: 'glukoma',
              },
            )
            .then(res => {
              setShowAlert(true);
              setSended(true);
            })
            .catch(e => {
              ToastAndroid.show(e, ToastAndroid.SHORT);
            });
        });
      } catch (e) {
        ToastAndroid.show(e, ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Data anda telah terkirim', ToastAndroid.SHORT);
    }
    setLoading(false);
  };
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Ya',
        value: true,
        labelStyle: {color: '#000'},
      },
      {
        id: '2',
        label: 'Tidak',
        value: false,
        labelStyle: {color: '#000'},
      },
    ],
    [],
  );
  if (dataUser == null) {
    return <ActivityIndicator style={{flex: 1}} size={50} color="blue" />;
  }
  return (
    <ScrollView className="bg-white h-screen">
      <LinearGradient
        colors={['#363FAC', '#2E7FEA']}
        start={{x: 0, y: 0.25}}
        end={{x: 1, y: 1.0}}>
        <View style={{flex: 1}}>
          <BackToHome color="dark" text="kembali" />
        </View>
      </LinearGradient>
      <View className="px-5 py-8">
        <Text className="font-[Poppins-SemiBold] text-[#295FA6] text-2xl">
          Screening Glukoma
        </Text>
        <Text className="font-[Poppins] text-black text-md mt-1 ">
          Ceklis kotak berdaasar kondis anda
        </Text>
        {questions.map((value, i) => (
          <View key={i}>
            <Text className="mb-2 mt-5 text-xl font-[Poppins-Medium] text-black">
              {value.title}
            </Text>
            {value.quest.map((vq, i) => {
              idx++;
              return (
                <View
                  key={i}
                  className="rounded-xl border border-[#295FA6]  border-t-8 shadow-xl p-3 flex items-start my-2">
                  <Text className="font-[Poppins] text-[15px] leading-6 text-black mb-3">
                    {vq}
                  </Text>
                  <RadioGroup
                    radioButtons={radioButtons}
                    onPress={setStates[idx]}
                    selectedId={states[idx]}
                    layout="row"
                    label
                  />
                </View>
              );
            })}
          </View>
        ))}

        <BlueButton onPress={() => handleSubmit()} disabled={loading}>
          {loading ? <BarIndicator color="white" size={20} /> : 'Kirim Data'}
        </BlueButton>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Data Berhasil dikirim"
          message="Data anda akan dicek oleh tenaga ahli kami pada bidang mata. Kami akan mengirimkan feedback apabila hasil telah dikonfirmasi oleh pihak ahli"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Tutup"
          confirmButtonColor="#295FA6"
          onConfirmPressed={() => {
            setShowAlert(false);
            navigation.navigate('Mainpage');
          }}
        />
      </View>
    </ScrollView>
  );
};

const questions = [
  {
    title: '1. Riwayat Kesehatan Umum',
    quest: [
      'Apakah Anda memiliki riwayat penyakit mata atau keluhan penglihatan sebelumnya?',
      'Apakah Anda memiliki riwayat penyakit kronis seperti diabetes, hipertensi, atau penyakit kardiovaskular?',
      'Apakah ada riwayat keluarga dengan penyakit glaukoma atau masalah mata lainnya?',
      'Apakah ada penurunan penglihatan dalam 6 bulan terakhir?',
      'Apakah ada riwayat mata merah berulang?',
    ],
  },
  {
    title: '2. Gejala yang Dirasakan',
    quest: [
      'Apakah Anda mengalami perubahan penglihatan seperti penglihatan kabur atau hilang pada waktu tertentu?',
      'Apakah Anda merasakan nyeri mata, perasaan tertekan di mata, atau sakit kepala yang berhubungan dengan mata?',
      'Apakah Anda pernah melihat cahaya berwarna-warni atau lingkaran cahaya berkeliling di sekitar lampu?',
    ],
  },
  {
    title: '3.	Pemeriksaan Mata Sebelumnya',
    quest: [
      'Apakah Anda pernah menjalani pemeriksaan mata atau tes glaukoma sebelumnya?',
      'Apakah Anda menggunakan kacamata atau lensa kontak?',
      'Apakah Anda menggunakan obat tetes mata atau obat mata lainnya secara rutin?',
    ],
  },
  {
    title: '4.	Riwayat Penggunaan Obat dan Suplemen',
    quest: [
      'Apakah Anda menggunakan obat-obatan tertentu, terutama kortikosteroid (steroid) dalam bentuk apa pun?',
      'Apakah Anda mengonsumsi suplemen atau herbal tertentu secara rutin?',
    ],
  },
  {
    title: '5.	Riwayat Pengukuran Tekanan Mata',
    quest: [
      'Apakah Anda pernah mengukur tekanan mata Anda? Jika ya, apa hasilnya?',
    ],
  },
  {
    title: '6.	Riwayat Operasi atau Cedera Mata',
    quest: [
      'Apakah Anda pernah menjalani operasi mata atau cedera mata sebelumnya?',
    ],
  },
  {
    title: '7.	Aktivitas Harian dan Gaya Hidup',
    quest: [
      'Apakah Anda memiliki pekerjaan atau hobi yang memerlukan konsentrasi visual yang tinggi atau paparan sinar matahari berlebih?',
      'Apakah Anda merokok?',
    ],
  },
  {
    title: '8.	Gejala Lainnya',
    quest: [
      'Apakah Anda mengalami keluhan lain seperti pandangan berbayang atau penurunan penglihatan saat melihat di samping atau ke bawah?',
    ],
  },
  {
    title: '9.	Kehamilan dan Riwayat Kesehatan Khusus',
    quest: [
      'Jika pasien perempuan, apakah Anda sedang hamil atau merencanakan kehamilan? Beberapa kondisi medis dapat memengaruhi pengobatan selama kehamilan.',
    ],
  },
];

export default GlukomaTest;
