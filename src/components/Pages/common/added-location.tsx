import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUser} from '../../../assets/user';
import {
  ScreenName,
  useNavigation,
} from '../../../assets/user/lib/hooks/use-navigation.tsx';

export const Added = () => {
  const navigation = useNavigation();
  const {user, saveUser} = useUser();

  const handleAddLocation = () => {
    navigation.navigate(ScreenName.AddLocation);
  };

  const handleDetails = (detail: any) => {
    navigation.navigate(ScreenName.DetailsLocation, {detail});
  };

  console.log('Location', user?.location);

  return (
    <View>
      {user?.location && user.location.length > 0 ? (
        <View style={styles.scrollContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {user.location.map((item, index) => (
              <TouchableOpacity
                onPress={() => handleDetails(item)}
                style={{
                  overflow: 'hidden',
                  borderRadius: 12,
                  marginBottom: 15,
                }}
                key={index}>
                <ImageBackground
                  style={styles.itemBtn}
                  source={{uri: item.photo}}>
                  <Text>{item.title}</Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/images/icons/add_photo_profile.png')}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{alignItems: 'center', gap: 15, top: 100}}>
          <TouchableOpacity
            onPress={handleAddLocation}
            style={styles.addBtnLocation}>
            <Image
              source={require('../../../assets/images/icons/add_photo_profile.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: 'rgba(255, 255, 255, 1)',
              textAlign: 'center',
            }}>
            There aren’t any places you{'\n'}add, you can do it now
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addBtnLocation: {
    width: 147,
    height: 63,
    backgroundColor: 'rgba(123, 3, 11, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  itemBtn: {
    width: 358,
    height: 180,
    padding: 15,
    justifyContent: 'flex-end',
  },
  scrollContainer: {
    height: 376,
  },
});
