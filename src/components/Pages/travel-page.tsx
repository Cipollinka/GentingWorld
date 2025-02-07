import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {Map} from './common/map.tsx';
import {LocationList} from './common/location-list.tsx';
import {
  ScreenName,
  useNavigation,
} from '../../assets/user/lib/hooks/use-navigation.tsx';
import {Flights} from './common/flights-screen.tsx';
import {Hotels} from './common/hotel-screen.tsx';
import {Events} from './common/events-screen.tsx';

export const Travel = () => {
  const navigation = useNavigation();
  const [isActive, setIsActive] = useState<string>('flights');
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
      case 'flights':
        return <Flights />;
      case 'hotel':
        return <Hotels />;
      case 'events':
        return <Events />;
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
          <Text style={styles.header_title}>Genting Tickets</Text>
          <TouchableOpacity onPress={handleAddLocation}>
            <Image source={require('../../assets/images/icons/calendar.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.header_btn_container}>
          <TouchableOpacity
            onPress={() => handleScreen('flights')}
            style={[
              styles.header_btn,
              isActive === 'flights' && {
                backgroundColor: 'rgba(123, 3, 11, 1)',
              },
            ]}>
            <Text style={styles.header_btn_text}>Flights</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleScreen('hotel')}
            style={[
              styles.header_btn,
              isActive === 'hotel' && {
                backgroundColor: 'rgba(123, 3, 11, 1)',
              },
            ]}>
            <Text style={styles.header_btn_text}>Hotel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleScreen('events')}
            style={[
              styles.header_btn,
              isActive === 'events' && {
                backgroundColor: 'rgba(123, 3, 11, 1)',
              },
            ]}>
            <Text style={styles.header_btn_text}>Events</Text>
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
    paddingRight: 2.5,
    paddingLeft: 2.5,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(35, 40, 48, 1)',
  },
  header_btn: {
    width: 116,
    height: 36,
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
