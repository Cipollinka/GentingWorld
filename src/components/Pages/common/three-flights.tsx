import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

interface ThreeFlightsProps {
  next: (nameScreen: string) => void;
  cost?: string;
  setCost?: (value: ((prevState: string) => string) | string) => void;
  comment?: string;
  setComment?: (value: ((prevState: string) => string) | string) => void;
}

export const ThreeFlights = ({
  next,
  cost,
  setCost,
  comment,
  setComment,
}: ThreeFlightsProps) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(35, 40, 48, 1)',
        padding: 20,
        justifyContent: 'space-between',
      }}>
      <View style={{gap: 20}}>
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
            Flight cost
          </Text>
          <TextInput
            placeholder="Task name"
            placeholderTextColor="gray"
            onChangeText={setCost}
            value={cost}
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
            Comment
          </Text>
          <TextInput
            placeholder="Task name"
            placeholderTextColor="gray"
            value={comment}
            onChangeText={setComment}
            multiline={true}
            numberOfLines={7} // Робить висоту більшою
            style={{
              color: 'white',
              padding: 10,
              textAlignVertical: 'top',
              marginBottom: 10,
              borderRadius: 8,
              borderColor: 'white',
              borderWidth: 1,
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => next('four')}
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
    </View>
  );
};
