import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {useCreatePaymentIntentMutation} from '../../Redux-Toolkit/PaymentAPI';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Fonts from '../../Utils/Fonts';
import ThemeColors from '../../Utils/Colors';
import Images from '../../Assets/Images';
import Loader from '../Common/Loader';

const Payment = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [createPaymentIntent, {isLoading, data: paymentIntent, error}] =
    useCreatePaymentIntentMutation();

  const amount = useMemo(() => 500, []);
  const currency = useMemo(() => 'usd', []);

  const showMessage = useCallback((message, isError = false) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(isError ? 'Error' : 'Success', message);
    }
  }, []);

  const initializePaymentSheet = useCallback(async () => {
    if (!paymentIntent) {
      try {
        const res = await createPaymentIntent({
          amount,
          currency,
        }).unwrap();

        if (res?.client_secret) {
          const {error} = await initPaymentSheet({
            paymentIntentClientSecret: res?.client_secret,
            merchantDisplayName: 'Test Store',
          });
          if (error) {
            showMessage(`error.message`, true);
          }
        } else {
          showMessage('Unable to retrieve payment secret', true);
        }
      } catch (error) {
        showMessage('Failed to initialize payment sheet', true);
      }
    }
  }, [
    createPaymentIntent,
    initPaymentSheet,
    paymentIntent,
    currency,
    amount,
    showMessage,
  ]);

  const openPaymentSheet = useCallback(async () => {
    try {
      const {error} = await presentPaymentSheet();
      if (error) {
        showMessage(
          error.code === 'Canceled'
            ? `Payment has been canceled`
            : error.message,
          true,
        );
      } else {
        showMessage('Payment successful!');
      }
    } catch (error) {
      showMessage('Something went wrong with the payment', true);
    }
  }, [presentPaymentSheet, showMessage]);

  useEffect(() => {
    initializePaymentSheet();
  }, [initializePaymentSheet]);

  return (
    <TouchableOpacity
      onPress={openPaymentSheet}
      disabled={isLoading}
      style={styles.align}>
      {isLoading ? (
        <Loader size={32} LoadingText={'Wait'} bodyStyle={styles.Loader} />
      ) : (
        <LinearGradient
          colors={['#8A2BE2', '#3e8ce8', '#fd8a96', '#FF69B4']}
          start={{x: -0.4, y: -0.1}}
          end={{x: 1.1, y: 1.1}}
          style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.specialText}>Premium+ subscription</Text>
            <Text style={styles.specialText}>Special price by promo code:</Text>
            <Text style={styles.discountText}>$10 ➔ $5.00 50% OFF</Text>
            <Text style={styles.promoCode}>Weather50</Text>
          </View>
          <Text style={styles.Arrow}>➔</Text>
          <Image source={Images.PaymentCard} style={styles.paymentImage} />
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

export default Payment;

const styles = StyleSheet.create({
  align: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Loader: {
    height: responsiveHeight(15),
    width: responsiveWidth(89),
    marginVertical: 8,
  },
  container: {
    marginVertical: 8,
    width: responsiveWidth(89),
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    width: responsiveWidth(57),
    paddingLeft: responsiveWidth(7.1),
    paddingVertical: responsiveHeight(2.5),
  },
  specialText: {
    fontFamily: Fonts.SemiBold,
    fontSize: responsiveFontSize(2.1),
    color: ThemeColors.Black,
    textAlign: 'left',
  },
  promoCode: {
    width: responsiveWidth(28),
    borderRadius: 25,
    backgroundColor: ThemeColors.Black,
    fontSize: responsiveFontSize(1.75),
    fontFamily: Fonts.Light,
    color: ThemeColors.White,
    padding: 5,
    marginTop: responsiveHeight(1.6),
    textAlign: 'center',
  },
  discountText: {
    width: responsiveWidth(24),
    fontFamily: Fonts.Medium,
    fontSize: responsiveFontSize(1.75),
    color: ThemeColors.LightGray2,
    textAlignVertical: 'center',
    marginVertical: 5,
  },
  Arrow: {
    position: 'absolute',
    right: responsiveWidth(6),
    top: responsiveHeight(1.3),
    fontFamily: Fonts.Regular,
    fontSize: responsiveFontSize(3.1),
    color: ThemeColors.White,
  },
  paymentImage: {
    position: 'absolute',
    width: responsiveWidth(44.1),
    height: responsiveHeight(20.5),
    right: responsiveWidth(5),
    alignSelf: 'flex-end',
    bottom: 0.9,
  },
});
