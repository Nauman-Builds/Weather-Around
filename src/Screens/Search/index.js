import {
  ImageBackground,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Keyboard,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../Home/styles';
import WeatherComponent from '../../Components/HomeComponents';
import {Images} from '../../Assets/Images';

const SearchScreen = () => {
  const [nam, setNam] = useState('');
  const [intialname, setIntialname] = useState();
  const [tem, setTem] = useState();
  const [feel, setFeel] = useState();
  const [tp, setTp] = useState('°F');
  const [stat, setStat] = useState(true);

    useEffect(() => {
    }, [nam]);

  //   useEffect(() => {
  //     if (data) {
  //       chnagetemp(data);
  //     }
  //   }, [data]);

  //   const getd = n => {
  //     if (n == '' || n == null) {
  //       ToastAndroid.show('Please Enter Value', ToastAndroid.SHORT);
  //     } else {
  //       setNam(n);
  //       setStat(true);
  //     }
  //   };

  //   const chnagetemp = data => {
  //     if (stat == false) {
  //       setStat(!stat),
  //         setTem(`${parseInt(1.8 * (data?.main?.temp - 273) + 32)} °F`),
  //         setFeel(`${parseInt(1.8 * (data?.main?.feels_like - 273) + 32)} °F`),
  //         setTp('°C');
  //     } else {
  //       setStat(!stat),
  //         setTem(`${parseInt(data?.main?.temp - 273)} °C`),
  //         setFeel(`${parseInt(data?.main?.feels_like - 273)} °C`),
  //         setTp('°F');
  //     }
  //   };

  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground source={Images.Background} style={styles.imgbg}>
        <WeatherComponent lat={'31.4632'} lon={'74.2939'} city={'Johar Town'} />
        {/* <Text style={styles.tx}>Weather Around</Text>
        <TextInput
          placeholder="Search City"
          onChangeText={val => setIntialname(val)}
          style={styles.txin}></TextInput>
        <TouchableOpacity
          style={styles.bt}
          onPress={() => {
            getd(intialname), Keyboard.dismiss();
          }}>
          <Text style={styles.txbt}>Search</Text>
        </TouchableOpacity>

        {data ? (
          <>
            <View style={styles.v}>
              <TouchableOpacity
                onPress={() => {
                  chnagetemp(data), Keyboard.dismiss();
                }}
                style={styles.chbt}>
                <Text style={styles.tx4}>{tp}</Text>
              </TouchableOpacity>
              <Text style={styles.tx1}>{data?.name}</Text>
              <View style={styles.imgvi}>
                <Image
                  style={styles.imgw}
                  source={{
                    uri: `http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`,
                  }}
                />
              </View>
              <Text style={styles.tx1}>{tem}</Text>
            </View>
            <View style={styles.vi}>
              <View>
                <Text style={styles.tx2}>Weather: </Text>
                <Text style={styles.tx2}>Feel Like: </Text>
                <Text style={styles.tx2}>Humidity:</Text>
                <Text style={styles.tx2}>Wind: </Text>
              </View>
              <View>
                <Text style={styles.tx3}>{data?.weather[0]?.main}</Text>
                <Text style={styles.tx3}>{feel}</Text>
                <Text style={styles.tx3}>{data?.main.humidity}%</Text>
                <Text style={styles.tx3}>{data?.wind?.speed} m/s</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.v2}>
            <ActivityIndicator size="10" color="#fff" />
          </View>
        )} */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SearchScreen;