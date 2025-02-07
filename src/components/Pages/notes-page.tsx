import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import {
  ScreenName,
  useNavigation,
} from '../../assets/user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../assets/user';
import {Active} from './common/active.tsx';
import {Archived} from './common/archived.tsx';

export const Notes = () => {
  const {user} = useUser();
  const [isActive, setIsActive] = useState<string>('active');
  const navigation = useNavigation();

  const handleScreen = (name: string) => {
    // Якщо кнопка, яку натискаємо, вже активна, знімаємо активність
    if (isActive === name) {
      setIsActive('');
    } else {
      setIsActive(name); // Встановлюємо нову активну кнопку
    }
  };

  const renderScreen = () => {
    switch (isActive) {
      case 'active':
        return <Active />;
      case 'archived':
        return <Archived />;
    }
  };

  const addNotesScreen = () => {
    navigation.navigate(ScreenName.AddNotes);
  };

  console.log('Active Screen', user?.activeNotes);

  return (
    <View>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Image source={require('../../assets/images/icons/like_icon.png')} />
          <Text style={styles.header_title}>Genting Notes</Text>
          <View style={{width: 23.7, height: 20.31}} />
        </View>
        <View style={styles.header_btn_container}>
          <TouchableOpacity
            onPress={() => handleScreen('active')}
            style={[
              styles.header_btn,
              isActive === 'active' && {backgroundColor: 'rgba(123, 3, 11, 1)'},
            ]}>
            <Text style={styles.header_btn_text}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleScreen('archived')}
            style={[
              styles.header_btn,
              isActive === 'archived' && {
                backgroundColor: 'rgba(123, 3, 11, 1)',
              },
            ]}>
            <Text style={styles.header_btn_text}>Archived</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.main}>
        {user?.activeNotes.length !== 0 ? (
          <View style={{alignItems: 'center'}}>
            {renderScreen()}
            <TouchableOpacity
              onPress={addNotesScreen}
              style={styles.add_two_notes}>
              <Image
                source={require('../../assets/images/icons/add_photo_profile.png')}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              marginTop: 150,
              alignItems: 'center',
              gap: 32,
            }}>
            <TouchableOpacity
              onPress={addNotesScreen}
              style={styles.add_notes_btn}>
              <Image
                source={require('../../assets/images/icons/add_photo_profile.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1)',
                fontSize: 16,
                fontWeight: '400',
                textAlign: 'center',
              }}>
              There aren’t any notes you{'\n'}add, you can do it now
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 132,
    backgroundColor: 'rgba(54, 62, 75, 1)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 15,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  header_title: {
    fontWeight: '800',
    fontSize: 28,
    color: 'rgba(255, 255, 255, 1)',
  },
  header_btn_container: {
    width: 358,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(35, 40, 48, 1)',
  },
  header_btn: {
    width: 177,
    height: 38,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_btn_text: {
    fontWeight: '400',
    fontSize: 13,
    color: 'rgba(255, 255, 255, 1)',
  },
  main: {
    alignItems: 'center',
  },
  add_notes_btn: {
    width: 147.7,
    height: 63.7,
    borderRadius: 8,
    backgroundColor: 'rgba(123, 3, 11, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  add_two_notes: {
    top: 330,
    position: 'absolute',
    backgroundColor: 'rgba(123, 3, 11, 1)',
    width: 64,
    height: 64,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
