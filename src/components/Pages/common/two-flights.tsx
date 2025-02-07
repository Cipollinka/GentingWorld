import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

interface TwoFlightsProps {
  dateDeparture?: string;
  setDateDeparture?: (value: ((prevState: string) => string) | string) => void;
  timeDeparture?: string;
  setTimeDeparture?: (value: ((prevState: string) => string) | string) => void;
  dateArrival?: string;
  setDateArrival?: (value: ((prevState: string) => string) | string) => void;
  timeArrival?: string;
  setTimeArrival?: (value: ((prevState: string) => string) | string) => void;
  duration?: string;
  setDuration?: (value: ((prevState: string) => string) | string) => void;
  next: (nameScreen: string) => void;
}

export const TwoFlights = ({
  dateDeparture,
  setDateDeparture,
  timeDeparture,
  setTimeDeparture,
  dateArrival,
  setDateArrival,
  timeArrival,
  setTimeArrival,
  duration,
  setDuration,
  next,
}: TwoFlightsProps) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(35, 40, 48, 1)',
        padding: 20,
        gap: 10,
      }}>
      <SafeAreaView style={{flex: 1, width: '100%', height: '100%'}}>
        <Text style={{color: 'white', fontSize: 18, marginBottom: 10}}>
          Add a flight
        </Text>
        <View style={{gap: 5}}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: 'rgba(255, 255, 255, 1)',
            }}>
            Date of depature
          </Text>
          <TextInput
            placeholder="DD.MM.YYYY"
            placeholderTextColor="gray"
            value={dateDeparture}
            onChangeText={setDateDeparture}
            style={{
              color: 'white',
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
              borderColor: 'white',
              borderWidth: 1,
            }}
          />
        </View>
        <View style={{gap: 5}}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: 'rgba(255, 255, 255, 1)',
            }}>
            Time of depature
          </Text>
          <TextInput
            placeholder="HH:MM"
            placeholderTextColor="gray"
            value={timeDeparture}
            onChangeText={setTimeDeparture}
            style={{
              color: 'white',
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
              borderColor: 'white',
              borderWidth: 1,
            }}
          />
        </View>
        <View style={{gap: 5}}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: 'rgba(255, 255, 255, 1)',
            }}>
            Date of arrive
          </Text>
          <TextInput
            placeholder="DD.MM.YYYY"
            placeholderTextColor="gray"
            value={dateArrival}
            onChangeText={setDateArrival}
            style={{
              color: 'white',
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
              borderColor: 'white',
              borderWidth: 1,
            }}
          />
        </View>
        <View style={{gap: 5}}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: 'rgba(255, 255, 255, 1)',
            }}>
            Time of arrive
          </Text>
          <TextInput
            placeholder="HH:MM"
            placeholderTextColor="gray"
            value={timeArrival}
            onChangeText={setTimeArrival}
            style={{
              color: 'white',
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
              borderColor: 'white',
              borderWidth: 1,
            }}
          />
        </View>
        <View style={{gap: 5}}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: 'rgba(255, 255, 255, 1)',
            }}>
            Duration of flight
          </Text>
          <TextInput
            placeholder="HH:MM"
            placeholderTextColor="gray"
            value={duration}
            onChangeText={setDuration}
            style={{
              color: 'white',
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
              borderColor: 'white',
              borderWidth: 1,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => next('three')}
          style={{
            // backgroundColor: date && time && duration ? 'red' : 'gray',
            padding: 15,
            borderRadius: 5,
            backgroundColor: 'rgba(54, 62, 75, 1)',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
