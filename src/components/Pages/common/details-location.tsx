import {
  Image,
  ImageBackground,
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

export const DetailsLocation = ({route}: any) => {
  const navigation = useNavigation();
  const {detail} = route.params;

  const handleBack = () => {
    navigation.navigate(ScreenName.Main);
  };

  return (
    <View style={{backgroundColor: 'rgba(35, 40, 48, 1)', height: '100%'}}>
      <ImageBackground
        style={styles.header_bg}
        source={
          typeof detail.photo === 'string'
            ? {uri: detail.photo} // Якщо це URL-рядок (з інтернету чи локального `file://`)
            : detail.photo // Якщо це `require()`
        }>
        <TouchableOpacity onPress={handleBack} style={styles.back_btn}>
          <Image
            source={require('../../../assets/images/icons/back_icon.png')}
          />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.main}>
        <Text style={styles.title}>{detail.title}</Text>
        <View style={styles.scrollContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.text}>
              {detail.text ? detail.text : detail.description}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header_bg: {
    width: '100%',
    height: 441,
  },
  back_btn: {
    top: 40,
    left: 20,
  },
  main: {
    width: '100%',
    padding: 15,
  },
  title: {
    fontWeight: '700',
    fontSize: 34,
    color: 'rgba(255, 255, 255, 1)',
  },
  scrollContainer: {
    height: 160,
  },
  text: {
    fontWeight: '400',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
});
