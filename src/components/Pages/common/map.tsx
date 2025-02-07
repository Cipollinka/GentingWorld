import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Linking, Platform } from 'react-native';

export const Map = () => {
  const openMap = () => {
    const latitude = 50.4501; // Ваша широта
    const longitude = 30.5234; // Ваша довгота
    const label = 'Місцезнаходження';

    let url = '';

    if (Platform.OS === 'ios') {
      url = `maps://app?saddr=&daddr=${latitude},${longitude}&q=${label}`;
    } else {
      url = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`;
    }

    Linking.openURL(url).catch(err => console.error('Не вдалося відкрити карту', err));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={openMap}>
        <Image style={styles.map} source={require('../../../assets/images/map.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;
