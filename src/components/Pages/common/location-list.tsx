import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {General} from './general-location.tsx';
import {Added} from './added-location.tsx';

export const LocationList = () => {
  const [screen, setScreen] = useState('general');

  const handleScreen = (nameScreen: string) => {
    setScreen(nameScreen);
  };

  const renderLocation = () => {
    switch (screen) {
      case 'general':
        return <General />;
      case 'added':
        return <Added />;
    }
  };
  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.header_btn}>
        <TouchableOpacity onPress={() => handleScreen('general')}>
          <Text style={styles.header_btn_text}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleScreen('added')}>
          <Text style={styles.header_btn_text}>Added</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>{renderLocation()}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  header_btn: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header_btn_text: {
    fontWeight: '400',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
  },
  main: {
    top: 20,
    width: '100%',
    alignItems: 'center',
  },
});
