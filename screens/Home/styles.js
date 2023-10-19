import { responsiveHeight as rh, responsiveWidth as rw, responsiveFontSize as rf } from "react-native-responsive-dimensions";
import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    imgbg: {
        height: rh(100),
        width: rw(100),
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    tx: {
        color: 'white',
        fontSize: rf(3.7),
        textAlign: 'center',
        marginTop: rh(6.5),
        marginBottom: rh(5),
    },
    txin: {
        color: 'white',
        width: rw(72),
        fontSize: rf(2),
        borderRadius: rw(20),
        borderWidth: 1,
        borderColor: 'white',
        paddingLeft: rw(7),
        paddingRight: rw(7),
        height: rh(7),
    },
    bt: {
        borderRadius: rw(20),
        borderWidth: 1,
        borderColor: 'white',
        height: rh(5),
        width: rw(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: rh(3),
    },
    txbt: {
        color: 'white',
        fontSize: rf(2.2)
    },
    v: {
        flexDirection: 'column',
        gap: rh(1.2),
        justifyContent: 'center',
        alignItems: 'center',
        width: rw(77),
        marginTop: rh(1.5)
    },
    v2: {
        marginTop: rh(24),  
    },
    imgw: {
        height: rw(20),
        width: rw(30),
        alignSelf: 'center',
    },
    tx1: {
        color: 'white',
        fontSize: rf(4.5),
        fontWeight: '600',
        textAlign: 'center',
    },
    tx4: {
        color: 'white',
        fontSize: rf(3),
        fontWeight: '600',
        textAlign: 'center',
    },
    chbt: {
        borderWidth: 1,
        borderRadius: rw(12),
        width: rw(12),
        height: rh(5),
        borderColor: 'white',
        marginLeft: rw(12),
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    vi: {
        margin: rh(5),
        flexDirection: 'row',
        gap: rw(15),
    },
    tx2:
    {
        color: '#9AFEFF',
        fontSize: rf(3),
    },
    tx3:
    {
        color: 'white',
        fontSize: rf(3),
    },
})