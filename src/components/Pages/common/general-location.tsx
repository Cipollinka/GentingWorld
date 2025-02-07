import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Location, LocationData } from "../../../assets/data/location-data.ts";
import {
  ScreenName,
  useNavigation,
} from '../../../assets/user/lib/hooks/use-navigation.tsx';

export const General = () => {
  const navigation = useNavigation();

  const handleDetailsLocation = (detail: Location) => {
    navigation.navigate(ScreenName.DetailsLocation, {detail});
  };

  return (
    <View>
      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {LocationData.map(item => (
            <TouchableOpacity onPress={() => handleDetailsLocation(item)} style={styles.btn} key={item.id}>
              <ImageBackground style={styles.bgBtn} source={item.photo}>
                <Text style={styles.title}>{item.title}</Text>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: 350,
    height: 180,
    overflow: 'hidden',
    borderRadius: 12,
    marginBottom: 15,
  },
  bgBtn: {
    width: 350,
    height: 180,
    justifyContent: 'flex-end',
    padding: 15,
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    color: 'rgba(255, 255, 255, 1)',
  },
  scrollContainer: {
    height: 355,
  },
});
