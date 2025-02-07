import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {Map} from './common/map.tsx';
import {LocationList} from './common/location-list.tsx';
import { ScreenName, useNavigation } from "../../assets/user/lib/hooks/use-navigation.tsx";

export const Home = () => {
  const navigation = useNavigation();
  const [isActive, setIsActive] = useState<string>('map');
  const handleScreen = (name: string) => {
    // Якщо кнопка, яку натискаємо, вже активна, знімаємо активність
    if (isActive === name) {
      setIsActive('');
    } else {
      setIsActive(name); // Встановлюємо нову активну кнопку
    }
  };

  const renderScreen = () => {
    switch (isActive) {
      case 'map':
        return <Map />;
      case 'list':
        return <LocationList />;
    }
  };

  const handleAddLocation = () => {
    navigation.navigate(ScreenName.AddLocation);
  };

  return (
    <View>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Image source={require('../../assets/images/icons/like_icon.png')} />
          <Text style={styles.header_title}>Genting Travel</Text>
          <TouchableOpacity onPress={handleAddLocation}>
            <Image source={require('../../assets/images/icons/add_photo_profile.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.header_btn_container}>
          <TouchableOpacity
            onPress={() => handleScreen('map')}
            style={[
              styles.header_btn,
              isActive === 'map' && {backgroundColor: 'rgba(123, 3, 11, 1)'},
            ]}>
            <Text style={styles.header_btn_text}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleScreen('list')}
            style={[
              styles.header_btn,
              isActive === 'list' && {
                backgroundColor: 'rgba(123, 3, 11, 1)',
              },
            ]}>
            <Text style={styles.header_btn_text}>List</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.main}>{renderScreen()}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 132,
    backgroundColor: 'rgba(54, 62, 75, 1)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 15,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  header_title: {
    fontWeight: '800',
    fontSize: 28,
    color: 'rgba(255, 255, 255, 1)',
  },
  header_btn_container: {
    width: 358,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(35, 40, 48, 1)',
  },
  header_btn: {
    width: 177,
    height: 38,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_btn_text: {
    fontWeight: '400',
    fontSize: 13,
    color: 'rgba(255, 255, 255, 1)',
  },
  main: {
    alignItems: 'center',
  },
  add_notes_btn: {
    width: 147.7,
    height: 63.7,
    borderRadius: 8,
    backgroundColor: 'rgba(123, 3, 11, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  add_two_notes: {
    top: 330,
    position: 'absolute',
    backgroundColor: 'rgba(123, 3, 11, 1)',
    width: 64,
    height: 64,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
