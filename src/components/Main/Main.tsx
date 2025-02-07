import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {Footer} from './footer-component.tsx';
import {useState} from 'react';
import {Home} from '../Pages/home-page.tsx';
import {Travel} from '../Pages/travel-page.tsx';
import {Gallery} from '../Pages/gallery-page.tsx';
import {Notes} from '../Pages/notes-page.tsx';
import {Profile} from '../Pages/profile-page.tsx';

export const Main = () => {
  const [page, setPage] = useState('Profile');

  const renderPage = () => {
    switch (page) {
      case 'Home':
        return <Home />;
      case 'Travel':
        return <Travel />;
      case 'Gallery':
        return <Gallery />;
      case 'Notes':
        return <Notes />;
      case 'Profile':
        return <Profile />;
      default:
        return <Profile />;
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1, width: '100%', height: '100%'}}>
        <View>{renderPage()}</View>
        <Footer setPage={setPage} page={page} />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(35, 40, 48, 1)',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
});
