import React from 'react';
import {View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import Icons from '../../Assets/Icons';
import Images from '../../Assets/Images';
import {styles} from './styles';

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <ImageBackground source={Images.TabFrame} style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        // Center Button
        if (index === 1) {
          return (
            <ImageBackground
              key={route.key}
              source={Images.CenterButtonBack}
              style={styles.centerButtonBackground}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.plusButtonContainer}>
                <View style={styles.plusButton}>
                  <Image source={Icons.plusIcon} style={styles.plusIcon} />
                </View>
              </TouchableOpacity>
            </ImageBackground>
          );
        }
        // Regular Tabs
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}>
            <Image
              source={index === 0 ? Icons.pinOFFIcon : Icons.listIcon}
              style={[styles.icon, isFocused && styles.iconFocused]}
            />
          </TouchableOpacity>
        );
      })}
    </ImageBackground>
  );
};

export default CustomTabBar;
