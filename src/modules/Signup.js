import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';

const SignupPage = () => {
  const navigation = useNavigation();

  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const goToLoginPage = () => {
    navigation.navigate('Login');
  };
  const handleSignup = () => {
    if (!nik || !nama || !email || !alamat || !password || !confirmPassword) {
      ToastAndroid.show('Please fill in all fields!', ToastAndroid.SHORT);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      ToastAndroid.show(
        'Please enter a valid email address',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show('Passwords do not match!', ToastAndroid.SHORT);
      return;
    }

    axios
      .post('http://192.168.191.136:8000/api/userreg', {
        nik: nik,
        name: nama,
        email: email,
        alamat: alamat,
        password: password,
      })
      .then(function (response) {
        ``;
        ToastAndroid.show('Registrasi berhasil', ToastAndroid.SHORT);
        navigation.dispatch(StackActions.replace('Login'));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <ScrollView className="flex-1 p-5 py-8">
      <Text className="text-2xl  mb-2 text-center font-['Poppins-SemiBold'] text-black">
        Daftarkan Akun Anda
      </Text>
      <Text className="text-sm mb-5 text-gray-600 text-center font-['Poppins-Regular']">
        Pastikan seluruh data diri Anda benar
      </Text>
      <View className="mb-3">
        <Text className="text-xs mb-1 text-gray-600 font-['Poppins-Regular']">
          NIK
        </Text>
        <TextInput
          cursorColor="#aeaeae"
          className="input border p-2 mb-3 rounded-lg border border-gray-400 font-['Poppins-Regular']"
          value={nik}
          onChangeText={setNik}
        />
      </View>
      <View className="mb-3">
        <Text className="text-xs mb-1 text-gray-600 font-['Poppins-Regular']">
          Nama
        </Text>
        <TextInput
          cursorColor="#aeaeae"
          className="input border p-2 mb-3 rounded-lg border border-gray-400 font-['Poppins-Regular']"
          value={nama}
          onChangeText={setNama}
        />
      </View>
      <View className="mb-3">
        <Text className="text-xs mb-1 text-gray-600 font-['Poppins-Regular']">
          Email
        </Text>
        <TextInput
          cursorColor="#aeaeae"
          className="input border p-2 mb-3 rounded-lg border border-gray-400 font-['Poppins-Regular']"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View className="mb-3">
        <Text className="text-xs mb-1 text-gray-600 font-['Poppins-Regular']">
          Alamat
        </Text>
        <TextInput
          cursorColor="#aeaeae"
          className="input border p-2 mb-3 rounded-lg border border-gray-400 font-['Poppins-Regular']"
          value={alamat}
          onChangeText={setAlamat}
        />
      </View>

      <Text className="text-xs text-gray-600 font-['Poppins-Regular'] mb-1">
        Password
      </Text>
      <View className="mb-3">
        <TextInput
          cursorColor="#aeaeae"
          className="border p-2 mb-3 rounded-lg border border-gray-400 font-['Poppins-Regular']"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          className="absolute right-2 top-3"
          onPress={togglePasswordVisibility}>
          {/* <Feather
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color={showPassword ? 'gray' : 'black'}
          /> */}
        </TouchableOpacity>
      </View>

      <Text className="text-xs text-gray-600 font-['Poppins-Regular'] mb-1">
        Konfirmasi Password
      </Text>
      <View className="mb-3">
        <TextInput
          cursorColor="#aeaeae"
          className=" border p-2 mb-3 rounded-lg border border-gray-400 font-['Poppins-Regular']"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          className="absolute right-2 top-3"
          onPress={toggleConfirmPasswordVisibility}>
          {/* <Feather
            name={showConfirmPassword ? 'eye' : 'eye-off'}
            size={20}
            color={showConfirmPassword ? 'gray' : 'black'}
          /> */}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-[#295FA6] rounded-lg py-3"
        onPress={handleSignup}>
        <Text className="text-white text-center font-['Poppins-SemiBold']">
          Simpan Data
        </Text>
      </TouchableOpacity>

      <View className="mt-8 flex-row justify-center">
        <Text className="font-[Poppins-Medium]">Sudah mempunyai akun? </Text>
        <Text
          className="text-blue-500 font-['Poppins-Medium']"
          onPress={goToLoginPage}>
          Masuk
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignupPage;
