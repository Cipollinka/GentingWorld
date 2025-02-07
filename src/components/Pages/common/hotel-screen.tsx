import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../../assets/user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../../assets/user';

export const Hotels = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();
  const handleAddFlight = () => {
    navigation.navigate(ScreenName.AddHotel);
  };

  console.log('Hotels', user?.hotels);

  return (
    <View>
      {(user?.hotels || []).length === 0 ? (
        <View style={{alignItems: 'center', gap: 15, marginTop: 150}}>
          <TouchableOpacity onPress={handleAddFlight} style={styles.addFlight}>
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
            There aren’t any flights you{'\n'}add, you can do it now
          </Text>
        </View>
      ) : (
        <View style={{height: 400, top: 15, width: '100%'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {user?.hotels.map((item, index) => (
              <View style={styles.flightsItem} key={index}>
                <Image style={styles.image} source={{uri: item.cover}} />
                <View style={styles.content}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.paragraph}>{item.description}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.title}>Address</Text>
                    <Text style={styles.title}>{item.address}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.title}>Date</Text>
                    <Text style={styles.title}>
                      {item.startDate} - {item.fishDate}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.title, {marginBottom: 10}]}>
                      Photos
                    </Text>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 15,
                          width: 358,
                          paddingRight: 15,
                        }}>
                        {(item.photos || []).length === 0
                          ? null
                          : item.photos.map((item, index) => (
                              <Image
                                style={styles.images}
                                key={index}
                                source={{uri: item}}
                              />
                            ))}
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={{position: 'absolute', bottom: 10, right: '35%'}}>
            <TouchableOpacity onPress={handleAddFlight} style={styles.addBtn}>
              <Image
                source={require('../../../assets/images/icons/add_photo_profile.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  addFlight: {
    width: 147,
    height: 63,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(123, 3, 11, 1)',
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
    gap: 10,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
  },
  flightsItem: {
    width: 358,
    paddingBottom: 20,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: 'rgba(54, 62, 75, 1)',
  },
  title: {
    fontWeight: '400',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 1)',
  },
  paragraph: {
    fontWeight: '400',
    fontSize: 13,
    color: 'rgba(255, 255, 255, 1)',
  },
  name: {
    marginTop: 15,
    fontWeight: '700',
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
  },
  addBtn: {
    // zIndex: 1,
    // top: -55,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: 'rgba(123, 3, 11, 1)',
  },
  images: {
    width: 77,
    height: 116,
    borderRadius: 12,
  },
});
