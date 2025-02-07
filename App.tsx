import React from 'react';
import {UserProvider} from './src/assets/user/Provider/UserProvider.tsx';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Loader} from './src/components/Loader';
import {Main} from './src/components/Main/Main.tsx';
import {AddNotes} from './src/components/Screens/add-notes.tsx';
import {DetailsLocation} from './src/components/Pages/common/details-location.tsx';
import {AddLocation} from './src/components/Screens/add-location.tsx';
import {OneFlights} from './src/components/Pages/common/one-flights.tsx';
import {AddHotel} from './src/components/Pages/common/add-hotel.tsx';
import { AddEvents } from "./src/components/Pages/common/add-events.tsx";

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, animationEnabled: false}}>
          <Stack.Screen name="Loader" component={Loader} />
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

export default App;
