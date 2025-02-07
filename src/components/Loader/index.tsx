import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../assets/user/lib/hooks/use-navigation.tsx';

export const Loader = () => {
  const navigation = useNavigation();
  setTimeout(() => {
    navigation.navigate(ScreenName.Main);
  }, 2000);
  return (
    <View>
      <ImageBackground
        style={styles.bgImage}
        source={require('../../assets/images/loader_scren.png')}>
        <ActivityIndicator
          size={'large'}
          color="rgba(123, 3, 11, 1)"
          style={styles.loader_indicator}
        />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loader_indicator: {
    marginBottom: 100,
  },
});
