import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface FooterProps {
  setPage: (value: ((prevState: string) => string) | string) => void;
  page: string;
}

export const Footer = ({setPage, page}: FooterProps) => {
  const handlePage = (pageName: string) => {
    setPage(pageName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => handlePage('Home')}>
        <Image
          source={
            page === 'Home'
              ? require('../../assets/images/icons/active_home_icon.png')
              : require('../../assets/images/icons/home_icon.png')
          }
        />
        <Text
          style={[
            styles.name_icon,
            {
              color:
                page === 'Home'
                  ? 'rgba(255, 255, 255, 1)'
                  : 'rgba(153, 153, 153, 1)',
            },
          ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => handlePage('Travel')}>
        <Image
          source={
            page === 'Travel'
              ? require('../../assets/images/icons/active_travel_icon.png')
              : require('../../assets/images/icons/travel_icon.png')
          }
        />
        <Text
          style={[
            styles.name_icon,
            {
              color:
                page === 'Travel'
                  ? 'rgba(255, 255, 255, 1)'
                  : 'rgba(153, 153, 153, 1)',
            },
          ]}>
          Travel
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => handlePage('Gallery')}>
        <Image
          source={
            page === 'Gallery'
              ? require('../../assets/images/icons/active_gallery_icon.png')
              : require('../../assets/images/icons/gallery_icon.png')
          }
        />
        <Text
          style={[
            styles.name_icon,
            {
              color:
                page === 'Gallery'
                  ? 'rgba(255, 255, 255, 1)'
                  : 'rgba(153, 153, 153, 1)',
            },
          ]}>
          Gallery
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => handlePage('Notes')}>
        <Image
          source={
            page === 'Notes'
              ? require('../../assets/images/icons/active_notes_icon.png')
              : require('../../assets/images/icons/notes_icon.png')
          }
        />
        <Text
          style={[
            styles.name_icon,
            {
              color:
                page === 'Notes'
                  ? 'rgba(255, 255, 255, 1)'
                  : 'rgba(153, 153, 153, 1)',
            },
          ]}>
          Notes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => handlePage('Profile')}>
        <Image
          source={
            page === 'Profile'
              ? require('../../assets/images/icons/active_profile_icon.png')
              : require('../../assets/images/icons/profile_icon.png')
          }
        />
        <Text
          style={[
            styles.name_icon,
            {
              color:
                page === 'Profile'
                  ? 'rgba(255, 255, 255, 1)'
                  : 'rgba(153, 153, 153, 1)',
            },
          ]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 114,
    backgroundColor: 'rgba(54, 62, 75, 1)',
    paddingTop: 20,
    paddingBottom: 42,
    paddingLeft: 22,
    paddingRight: 22,
  },
  btn: {
    alignItems: 'center',
    gap: 10,
  },
  name_icon: {
    fontSize: 10,
    fontWeight: '600',
  },
});
