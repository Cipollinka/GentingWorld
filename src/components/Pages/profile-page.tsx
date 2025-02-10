import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUser} from '../../assets/user';
import {launchImageLibrary} from 'react-native-image-picker';
import {useEffect, useState} from 'react';

const menuItems = [
  {
    title: 'Developer website',
    icon: require('../../assets/images/icons/developer_icon.png'),
  },
  {
    title: 'Terms of use',
    icon: require('../../assets/images/icons/terms_icon.png'),
  },
  {
    title: 'Privacy policy',
    icon: require('../../assets/images/icons/privacy_icon.png'),
  },
];

export const Profile = () => {
  const {user, saveUser} = useUser();
  // Локальний стан для збереження введених даних
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [photo, setPhoto] = useState<string | null>(
    user?.profile.photo || null,
  );
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(!!user?.profile);

  // Функція для вибору фото з галереї
  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (
        response.assets &&
        response.assets.length > 0 &&
        response.assets[0].uri
      ) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  useEffect(() => {
    if (name.trim() && about.trim() && photo) {
      setIsSaveEnabled(true);
    } else {
      setIsSaveEnabled(false);
    }
  }, [name, about, photo]);
  // Функція для збереження даних
  const handleSave = () => {
    setName('');
    setAbout('');
    // Оновлюємо профіль користувача
    saveUser({
      ...user,
      profile: {
        ...user?.profile, // Зберігаємо інші поля профілю, не змінюючи їх
        userName: name, // Оновлюємо ім'я користувача
        about: about, // Оновлюємо опис
        photo: photo, // Оновлюємо фото
      },
    });
    setIsUserRegistered(true); // Встановлюємо, що користувач зареєстрований
  };
  const handleEdit = () => {
    setIsUserRegistered(false);
  };
  return (
    <View>
      <View
        style={[
          styles.header,
          {justifyContent: !isUserRegistered ? 'center' : 'space-between'},
        ]}>
        <Text style={styles.header_title}>Profile</Text>
        {isUserRegistered && (
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.edit_text}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView>
        <View style={styles.main}>
          <TouchableOpacity onPress={pickImage} style={styles.add_photoBtn}>
            {photo ? (
              <Image source={{uri: photo}} style={styles.add_photoBtn} />
            ) : (
              <Image
                source={require('../../assets/images/icons/add_photo_profile.png')}
              />
            )}
          </TouchableOpacity>
          {!isUserRegistered ? (
            <View style={{gap: 24}}>
              <SafeAreaView style={styles.inputs_block}>
                <Text style={styles.inputs_name}>Your name</Text>
                <SafeAreaView style={styles.inputs}>
                  <TextInput
                    placeholder="Enter your name"
                    placeholderTextColor="rgba(153, 153, 153, 1)"
                    value={name}
                    onChangeText={setName}
                  />
                </SafeAreaView>
              </SafeAreaView>
              <SafeAreaView style={styles.inputs_block}>
                <Text style={styles.inputs_name}>About you</Text>
                <SafeAreaView style={styles.inputs}>
                  <TextInput
                    placeholder="Tell us about yourself"
                    placeholderTextColor="rgba(153, 153, 153, 1)"
                    value={about}
                    onChangeText={setAbout}
                  />
                </SafeAreaView>
              </SafeAreaView>
              <TouchableOpacity
                onPress={handleSave}
                disabled={!isSaveEnabled}
                style={[
                  styles.save,
                  {
                    backgroundColor: isSaveEnabled
                      ? 'rgba(123, 3, 11, 1)'
                      : 'rgba(54, 62, 75, 1)',
                  },
                ]}>
                <Text
                  style={[
                    styles.save_text,
                    {
                      color: isSaveEnabled
                        ? 'rgba(255, 255, 255, 1)'
                        : 'rgba(153, 153, 153, 1)',
                    },
                  ]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text
              style={{
                color: 'rgba(255, 255, 255, 1)',
                fontSize: 26,
                fontWeight: 900,
              }}>
              {user?.profile.userName}
            </Text>
          )}
          <View style={{padding: 20}}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                onPress={() => console.log(user?.profile)}
                key={index}
                style={{
                  width: 350,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(54, 62, 75, 1)',
                  padding: 15,
                  justifyContent: 'space-between',
                  borderRadius: 10,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image source={item.icon} style={{marginRight: 10}} />
                  <Text style={{color: '#fff', fontSize: 16}}>
                    {item.title}
                  </Text>
                </View>
                <Image
                  source={require('../../assets/images/icons/next_icon.png')}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 115,
    flexDirection: 'row',
    backgroundColor: 'rgba(54, 62, 75, 1)',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  header_title: {
    fontWeight: '800',
    fontSize: 28,
    color: 'rgba(255, 255, 255, 1)',
  },
  edit_text: {
    fontWeight: '400',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
  main: {
    height: 1100,
    width: '100%',
    marginTop: 37,
    alignItems: 'center',
    gap: 24,
  },
  add_photoBtn: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(54, 62, 75, 1)',
  },
  inputs_block: {
    gap: 10,
  },
  inputs_name: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    fontWeight: '500',
  },
  inputs: {
    width: 350,
    height: 52,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  save: {
    width: 350,
    height: 48,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  save_text: {
    fontWeight: '400',
    fontSize: 17,
  },
});
