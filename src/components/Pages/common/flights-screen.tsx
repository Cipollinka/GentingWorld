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

export const Flights = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();
  const handleAddFlight = () => {
    navigation.navigate(ScreenName.OneFlight);
  };

  console.log('Flights', user?.flights);

  return (
    <View>
      {(user?.flights || []).length === 0 ? (
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
            {user?.flights.map((item, index) => (
              <TouchableOpacity style={styles.flightsItem} key={index}>
                <View style={{gap: 5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 14,
                        color: 'rgba(255, 255, 255, 1)',
                      }}>
                      {item.dateOfDeparture}
                    </Text>
                    <Text
                      style={[
                        styles.title,
                        {
                          paddingBottom: 4,
                          paddingTop: 4,
                          paddingLeft: 8,
                          paddingRight: 8,
                          backgroundColor: 'rgba(123, 3, 11, 1)',
                          borderRadius: 4,
                        },
                      ]}>
                      {item.class}
                    </Text>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 14,
                        color: 'rgba(255, 255, 255, 1)',
                      }}>
                      {item.timeOfDeparture}
                    </Text>
                  </View>
                  <Image
                    source={require('../../../assets/images/icons/line.png')}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginBottom: 15,
                    }}>
                    <Text style={styles.paragraph}>{item.departure}</Text>
                    <Text style={styles.paragraph}>{item.arrival}</Text>
                  </View>
                </View>
                <Text style={styles.price}>{item.cost}$</Text>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  }}>
                  <Text style={styles.title}>Passengers</Text>
                  <Text style={styles.paragraph}>{item.passengers}</Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  }}>
                  <Text style={styles.title}>Depature</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.paragraph}>{item.dateOfDeparture}</Text>
                    <Text style={styles.paragraph}>{item.timeOfDeparture}</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  }}>
                  <Text style={styles.title}>Arrive</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.paragraph}>{item.dateArrival}</Text>
                    <Text style={styles.paragraph}>{item.timeArrival}</Text>
                  </View>
                </View>
                <View style={{width: '100%', gap: 5}}>
                  <Text style={styles.title}>Comment</Text>
                  <Text style={styles.paragraph}>{item.comment}</Text>
                </View>
              </TouchableOpacity>
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
  flightsItem: {
    width: 350,
    height: 340,
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: 'rgba(54, 62, 75, 1)',
    padding: 12,
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: '700',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 1)',
  },
  paragraph: {
    fontWeight: '400',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 1)',
  },
  price: {
    fontWeight: '700',
    fontSize: 20,
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
});
