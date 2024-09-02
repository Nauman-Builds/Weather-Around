import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const DetailScreen = () => {
  return (
    <LinearGradient
      colors={['#2C0F5D', '#5E1B80', '#612FAB', '#2C0F5D']}
      style={styles.container}
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.9, y: 1.0}}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Icon name="chevron-back-sharp" size={31} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Weather Details</Text>
        </View>
        <TouchableOpacity>
          <Icon name="ellipsis-horizontal-circle" size={33} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B0082',
    paddingHorizontal: 20,
    paddingTop: 45,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 27,
    fontWeight: '300',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A0A66',
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 4,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
  },
});

export default DetailScreen;
