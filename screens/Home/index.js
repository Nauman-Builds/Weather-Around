import { ImageBackground, Text, TextInput, View, TouchableOpacity, ToastAndroid, Image, Keyboard, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { getApiData } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { APiKey } from '../../components/ApiKey';
import { styles } from './styles';
import { getApi } from '../../Redux Toolkit/Slices/ApiSlice';
import { useGetRTKApiDataQuery } from '../../Redux Toolkit/Slices/rtkApiSlice';


const Weather = () => {

    const [nam, setNam] = useState('');
    const [intialname, setIntialname] = useState();
    const [tem, setTem] = useState();
    const [feel, setFeel] = useState();
    const [tp, setTp] = useState('°F');
    const [stat, setStat] = useState(true);
    const { data, isError, isLoading, isSuccess } = useGetRTKApiDataQuery(nam);
    console.log ("RTK data is " + JSON.stringify(data?.name));

    // const dispatch = useDispatch();
    // const reduxData = useSelector(state => state)
    //console.log(reduxData.isError)
    // const getApi = async () => {
    //     try {
    //         const res = await axios({
    //             method: 'get',
    //             url: `https://api.openweathermap.org/data/2.5/weather?q=${nam}&appid=${APiKey}`,
    //         })
    //             .catch(err => {
    //                 if (err?.response?.status === 404) {
    //                     ToastAndroid.show('Please Enter Valid City', ToastAndroid.LONG);
    //                 }
    //             })
    //         dispatch(getApiData(res.data));
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // };

    useEffect(() => {
        // dispatch(getApi(nam));
        // await axios({
        //     method: 'get',
        //     url: `https://api.openweathermap.org/data/2.5/weather?q=${nam}&appid=${APiKey}`,
        // })
        //     .then((response) => {
        //         setVal(response.data)
        //     })
        //     .catch(err => {r
        //         if (err?.response?.status === 404) {
        //             ToastAndroid.show('Please Enter Valid City', ToastAndroid.LONG);
        //         }
        //     })
    }, [nam])

    //console.log(reduxData);


    useEffect(() => {
        if (data) {
            chnagetemp(data);
        }
    }, [data])


    const getd = (n) => {
        if (n == '' || n == null) {
            ToastAndroid.show('Please Enter Value', ToastAndroid.SHORT);
        }
        else {
            setNam(n);
            setStat(true);
        }
    }
    const chnagetemp = (data) => {
        if (stat == false) {
            setStat(!stat),
                setTem(`${parseInt(1.8 * (data?.main?.temp - 273) + 32)} °F`),
                setFeel(`${parseInt(1.8 * (data?.main?.feels_like - 273) + 32)} °F`),
                setTp('°C')
        } else {
            setStat(!stat),
                setTem(`${parseInt(data?.main?.temp - 273)} °C`),
                setFeel(`${parseInt(data?.main?.feels_like - 273)} °C`),
                setTp('°F')
        }

    };


    return (
        <View style={styles.main}>
            <ImageBackground blurRadius={10} source={{ uri: 'https://edge.mwallpapers.com/photos/celebrities/devices/md/ig265-samsung-galaxy-s3-wallpaper-4k-ultra-hd-awesome-android-iphone-hd-wallpaper-background-downloadhd-wallpapers-desktop-background-android-iphone-1080p-4k-vr4uo.jpg' }} style={styles.imgbg}>
                <Text style={styles.tx}>Weather Around</Text>
                <TextInput placeholder='Search City' onChangeText={(val) => setIntialname(val)} style={styles.txin}></TextInput>
                <TouchableOpacity style={styles.bt} onPress={() => { getd(intialname), Keyboard.dismiss() }}><Text style={styles.txbt}>Search</Text></TouchableOpacity>
                
                {data ?
                    (
                        <>
                            <View style={styles.v}>
                                <TouchableOpacity onPress={() => { chnagetemp(data), Keyboard.dismiss() }} style={styles.chbt}><Text style={styles.tx4}>{tp}</Text></TouchableOpacity>
                                <Text style={styles.tx1} >{data?.name}</Text>
                                <View style={styles.imgvi}><Image style={styles.imgw} source={{ uri: `http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png` }} /></View>
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
                    ) : <View style={styles.v2}><ActivityIndicator size='10' color="#fff" /></View>
                }
            </ImageBackground>
        </View>
    )
}

export default Weather
