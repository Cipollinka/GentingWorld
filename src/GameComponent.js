import React from 'react';
import {UserProvider} from './assets/user/Provider/UserProvider';
import {NavigationContainer} from '@react-navigation/native';
import {Loader} from './components/Loader';
import {Main} from './components/Main/Main';
import {AddNotes} from './components/Screens/add-notes';
import {DetailsLocation} from './components/Pages/common/details-location';
import {AddLocation} from './components/Screens/add-location';
import {OneFlights} from './components/Pages/common/one-flights';
import {AddHotel} from './components/Pages/common/add-hotel';
import {AddEvents} from './components/Pages/common/add-events';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function GameComponent() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="AddNotes" component={AddNotes} />
          <Stack.Screen name="DetailsLocation" component={DetailsLocation} />
          <Stack.Screen name="AddLocation" component={AddLocation} />
          <Stack.Screen name="OneFlight" component={OneFlights} />
          <Stack.Screen name="AddHotel" component={AddHotel} />
          <Stack.Screen name="AddEvents" component={AddEvents} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
