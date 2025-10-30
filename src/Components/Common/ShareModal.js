import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Share from 'react-native-share';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import ThemeColors from '../../Utils/Colors';

const ShareModal = ({visible, onClose, shareData}) => {
  const shareToWhatsApp = async () => {
    await Share.shareSingle({
      message: shareData,
      social: Share.Social.WHATSAPP,
    }).catch(err => console.log(err));
  };

  const shareToFacebook = async () => {
    await Share.shareSingle({
      message: shareData,
      social: Share.Social.MESSENGER,
    }).catch(err => console.log(err));
  };

  const shareToOther = async () => {
    await Share.open({
      message: shareData,
    }).catch(err => console.log(err));
  };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={shareToWhatsApp}>
            <Text style={styles.buttonText}>WhatsApp</Text>
            <Ionicons name="logo-whatsapp" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={shareToFacebook}>
            <Text style={styles.buttonText}>Facebook</Text>
            <Ionicons name="logo-facebook" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={shareToOther}>
            <Text style={styles.buttonText}>Share</Text>
            <Ionicons name="arrow-redo-circle-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    paddingRight: 20,
    paddingTop: responsiveHeight(7.5),
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContainer: {
    height: responsiveHeight(28),
    width: responsiveWidth(45),
    backgroundColor: ThemeColors.Purple,
    borderRadius: 20,
    padding: 9,
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#25D366',
    padding: 9,
    borderRadius: 5,
    width: responsiveWidth(35),
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ShareModal;
