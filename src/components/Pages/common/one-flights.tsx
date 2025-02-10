import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../../assets/user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../../assets/user';
import {TwoFlights} from './two-flights.tsx';
import {ThreeFlights} from './three-flights.tsx';

export const OneFlights = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();
  const [next, setNext] = useState('one');
  const [departure, setDeparture] = useState('');
  const [dateDeparture, setDateDeparture] = useState('');
  const [timeDeparture, setTimeDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [dateArrival, setDateArrival] = useState('');
  const [timeArrival, setTimeArrival] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState('');
  const [comment, setComment] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [selectedClass, setSelectedClass] = useState('Economy');

  const handleBack = () => {
    navigation.navigate(ScreenName.Main);
  };

  const handlePassengerChange = (type: string) => {
    setPassengers(prev =>
      type === 'increase' ? prev + 1 : Math.max(1, prev - 1),
    );
  };

  const handleClassSelection = (flightClass: string) => {
    setSelectedClass(flightClass);
  };
  const handleNext = (nameScreen: string) => {
    if (nameScreen === 'four') {
      saveUser({
        ...user,
        flights: [
          ...(user?.flights || []),
          {
            departure,
            arrival,
            passengers,
            class: selectedClass,
            dateOfDeparture: dateDeparture,
            timeOfDeparture: timeDeparture,
            dateArrival,
            timeArrival,
            duration,
            comment,
            cost,
          },
        ],
      });
      navigation.navigate(ScreenName.Main);
    } else {
      setNext(nameScreen);
    }
  };

  if (next === 'one') {
    navigation.navigate(ScreenName.OneFlight);
  } else if (next === 'two') {
    return (
      <TwoFlights
        dateDeparture={dateDeparture}
        setDateDeparture={setDateDeparture}
        timeDeparture={timeDeparture}
        setTimeDeparture={setTimeDeparture}
        dateArrival={dateArrival}
        setDateArrival={setDateArrival}
        timeArrival={timeArrival}
        setTimeArrival={setTimeArrival}
        duration={duration}
        setDuration={setDuration}
        next={handleNext}
      />
    );
  } else if (next === 'three') {
    return (
      <ThreeFlights
        cost={cost}
        setCost={setCost}
        comment={comment}
        setComment={setComment}
        next={handleNext}
      />
    );
  } else if (next === 'four') {
    navigation.navigate(ScreenName.Main);
  }

  return (
    <View style={styles.bg}>
      <View style={{gap: 20}}>
        <TouchableOpacity onPress={handleBack} style={{gap: 10, flexDirection: 'row'}}>
          <Image
            source={require('../../../assets/images/icons/back_icon.png')}
          />
          <Text style={styles.title}>Add a flight</Text>
        </TouchableOpacity>
        <View style={{gap: 8}}>
          <Text style={styles.label}> The point of departure</Text>
          <TextInput
            style={styles.input}
            placeholder="Task name"
            placeholderTextColor="rgba(153, 153, 153, 1)"
            value={departure}
            onChangeText={setDeparture}
          />
        </View>
        <View style={{gap: 8}}>
          <Text style={styles.label}>Point of arrival</Text>
          <TextInput
            style={styles.input}
            placeholder="Task name"
            placeholderTextColor="rgba(153, 153, 153, 1)"
            value={arrival}
            onChangeText={setArrival}
          />
        </View>
        <View style={styles.passengerContainer}>
          <Text style={styles.label}>Passengers</Text>
          <View style={styles.passengerControls}>
            <TouchableOpacity
              onPress={() => handlePassengerChange('decrease')}
              style={styles.passengerButton}>
              <Text style={styles.passengerText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.passengerCount}>{passengers}</Text>
            <TouchableOpacity
              onPress={() => handlePassengerChange('increase')}
              style={styles.passengerButton}>
              <Text style={styles.passengerText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.classContainer}>
          <Text style={styles.label}>Class</Text>
          <View style={{flexDirection: 'row', gap: 12}}>
            {['Economy', 'Standart', 'Business'].map(flightClass => (
              <TouchableOpacity
                key={flightClass}
                onPress={() => handleClassSelection(flightClass)}
                style={[
                  styles.classButton,
                  selectedClass === flightClass && styles.selectedClass,
                ]}>
                <Text style={styles.classText}>{flightClass}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleNext('two')}
        style={[
          styles.nextButton,
          departure && arrival ? styles.activeButton : styles.disabledButton,
        ]}
        disabled={!departure || !arrival}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#232830',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 15,
  },
  passengerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
  passengerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerButton: {
    backgroundColor: '#3E4550',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  passengerText: {
    color: '#fff',
    fontSize: 20,
  },
  passengerCount: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 10,
  },
  classContainer: {
    justifyContent: 'space-between',
    gap: 10,
  },
  classButton: {
    backgroundColor: '#3E4550',
    width: 115,
    height: 41,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  selectedClass: {
    backgroundColor: 'rgba(123, 3, 11, 1)',
  },
  classText: {
    color: '#fff',
  },
  nextButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#D62828',
  },
  disabledButton: {
    backgroundColor: '#555',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
