import React, {useMemo, useState} from 'react';
import {Text, View, TouchableOpacity, ToastAndroid} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BackToHome from '../components/BackToHome';
import LinearGradient from 'react-native-linear-gradient';
import RadioGroup from 'react-native-radio-buttons-group';
import BlueButton from '../components/common/BlueButton';
import {BarIndicator} from 'react-native-indicators';

const DiabetesTest = () => {
  let idx = -1;
  const [loading, setLoading] = useState(false);
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
  const [selectedId19, setSelectedId19] = useState();

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
    selectedId19,
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
    setSelectedId19,
  ];

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
              'http://scanocular.online/api/pemeriksaan/cekmata/screening',
              {
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
              ToastAndroid.show(
                'Terjadi kesalahan pada server',
                ToastAndroid.SHORT,
              );
            });
        });
      } catch (e) {
        ToastAndroid.show('Terjadi kesalahan pada server', ToastAndroid.SHORT);
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
          Screening Diabetes Retinopati
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
      </View>
    </ScrollView>
  );
};

const questions = [
  {
    title: '1.	Riwayat Diabetes',
    quest: [
      'Sejak kapan Anda didiagnosis menderita diabetes?',
      'Apakah Anda menderita diabetes tipe 1 atau tipe 2?',
      'Bagaimana kontrol gula darah Anda? Apakah Anda mengukur gula darah secara rutin?',
      'Apakah Anda mengonsumsi obat-obatan oral atau insulin untuk mengendalikan diabetes?',
    ],
  },
  {
    title: '2.	Riwayat Pengobatan Diabetes',
    quest: [
      'Apakah Anda mengikuti rencana pengobatan yang direkomendasikan oleh dokter untuk mengontrol diabetes Anda?',
      'Apakah Anda memiliki riwayat penggunaan obat-obatan atau terapi lain untuk diabetes, seperti injeksi insulin?',
    ],
  },
  {
    title: '3.	Gejala Mata dan Penglihatan',
    quest: [
      'Apakah Anda mengalami perubahan penglihatan seperti penglihatan kabur, penglihatan ganda, atau perubahan dalam kemampuan membaca?',
      'Apakah Anda pernah melihat bintik-bintik mengambang atau "lampu kilat" di pandangan Anda?',
      'Apakah Anda merasakan nyeri atau ketidaknyamanan di mata?',
    ],
  },
  {
    title: '4.	Pemeriksaan Mata Sebelumnya',
    quest: [
      'Apakah Anda pernah menjalani pemeriksaan mata terakhir? Jika ya, apa hasilnya?',
      'Apakah Anda pernah diberitahu oleh dokter bahwa Anda memiliki masalah mata terkait diabetes?',
    ],
  },
  {
    title: '5.	Riwayat Merokok',
    quest: ['Apakah Anda merokok? Jika ya, sejak kapan dan seberapa sering?'],
  },
  {
    title: '6.	Riwayat Penggunaan Alkohol',
    quest: [
      'Apakah Anda mengonsumsi minuman beralkohol? Jika ya, dalam jumlah berapa?',
    ],
  },
  {
    title: '7.	Riwayat Penggunaan Obat dan Suplemen',
    quest: [
      'Apakah Anda menggunakan obat atau suplemen tertentu dalam rangka mengelola diabetes atau masalah mata?',
      'Apakah Anda merokok?',
    ],
  },
  {
    title: '8.	Penggunaan Kacamata atau Lensa Kontak',
    quest: [
      'Apakah Anda menggunakan kacamata atau lensa kontak untuk membantu penglihatan Anda?',
    ],
  },
  {
    title: '9.	Kontrol Gaya Hidup',
    quest: [
      'Bagaimana pola makan Anda? Apakah Anda mengonsumsi makanan yang sehat untuk diabetes?',
      'Apakah Anda rutin berolahraga?',
    ],
  },
  {
    title: '10.	Riwayat Keluarga',
    quest: [
      'Apakah ada anggota keluarga yang memiliki riwayat diabetes atau masalah mata?',
    ],
  },
  {
    title: '11.	Kehamilan (jika berlaku):',
    quest: [
      'Jika pasien perempuan dan berencana untuk hamil atau sedang hamil, apakah Anda telah berbicara dengan dokter Anda tentang pengelolaan diabetes selama kehamilan? (Isikan tidak jika tidak mengalami kehamilan)',
    ],
  },
];

export default DiabetesTest;
