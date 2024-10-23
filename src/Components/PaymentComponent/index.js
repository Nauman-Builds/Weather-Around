import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useStripe, retrievePaymentIntent} from '@stripe/stripe-react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payment = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [createPaymentIntent, {isLoading, data: paymentIntent}] =
    useCreatePaymentIntentMutation();
  const [paymentSheetInitialized, setPaymentSheetInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  const amount = useMemo(() => 500, []);
  const currency = useMemo(() => 'usd', []);

  const showMessage = useCallback((message, isError = false) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(isError ? 'Error' : 'Success', message);
    }
  }, []);

  const handleAsyncStorage = useCallback(async (action, key, value = null) => {
    try {
      if (action === 'get') {
        return await AsyncStorage.getItem(key);
      }
      if (action === 'set') {
        await AsyncStorage.setItem(key, value);
      }
      if (action === 'remove') {
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`AsyncStorage ${action} error for ${key}:`, error);
    }
  }, []);

  const checkLastPaymentStatus = useCallback(async () => {
    try {
      const lastPaymentIntentId = await handleAsyncStorage(
        'get',
        'lastPaymentIntentId',
      );
      if (!lastPaymentIntentId) return null;

      const {paymentIntent, error} = await retrievePaymentIntent(
        lastPaymentIntentId,
      );
      if (error) {
        showMessage('Error retrieving last payment status', true);
        return null;
      }
      return paymentIntent?.status;
    } catch (error) {
      showMessage('Error retrieving last payment status', true);
      return null;
    }
  }, [handleAsyncStorage, showMessage]);

  const initializePaymentSheet = useCallback(async () => {
    const lastPaymentStatus = await checkLastPaymentStatus();

    if (lastPaymentStatus === 'succeeded') {
      showMessage('Payment already completed!');
      return;
    }
    setLoading(true);
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
          showMessage(`Initialization error: ${error.message}`, true);
        } else {
          setPaymentSheetInitialized(true);
        }
      } else {
        showMessage('Unable to retrieve payment secret', true);
      }
    } catch (error) {
      showMessage('Failed to initialize payment sheet', true);
    } finally {
      setLoading(false);
    }
  }, [
    checkLastPaymentStatus,
    createPaymentIntent,
    initPaymentSheet,
    amount,
    currency,
    showMessage,
  ]);

  const openPaymentSheet = useCallback(async () => {
    const lastPaymentIntentId = await handleAsyncStorage(
      'get',
      'lastPaymentIntentId',
    );
    if (!lastPaymentIntentId) {
      showMessage('Payment already completed!');
      return;
    }

    if (!paymentSheetInitialized) {
      showMessage('Payment sheet is not initialized yet.', true);
      return;
    }
    setLoading(true);
    try {
      const {error} = await presentPaymentSheet();
      if (error) {
        showMessage(
          error.code === 'Canceled'
            ? `Payment has been canceled`
            : `Error: ${error.message}`,
          true,
        );
        console.log(`Error: ${error.message}`);
      } else {
        showMessage('Payment successful!');
        if (paymentIntent?.id) {
          await handleAsyncStorage(
            'set',
            'lastPaymentIntentId',
            paymentIntent.id,
          );
        }
        await handleAsyncStorage('remove', 'lastPaymentIntentId');
      }
    } catch (error) {
      showMessage('Something went wrong with the payment', true);
    } finally {
      setLoading(false);
    }
  }, [
    paymentSheetInitialized,
    presentPaymentSheet,
    showMessage,
    paymentIntent,
    handleAsyncStorage,
  ]);

  useEffect(() => {
    initializePaymentSheet();
  }, [initializePaymentSheet]);

  return (
    <TouchableOpacity
      onPress={openPaymentSheet}
      disabled={isLoading || loading || !paymentSheetInitialized}
      style={styles.align}>
      {isLoading || loading ? (
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
