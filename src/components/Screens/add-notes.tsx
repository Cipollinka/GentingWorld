import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {
  ScreenName,
  useNavigation,
} from '../../assets/user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../assets/user';
import {launchImageLibrary} from 'react-native-image-picker';

export const AddNotes = () => {
  const {user, saveUser} = useUser();
  // Локальний стан для збереження введених даних
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const navigation = useNavigation();

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
    if (name.trim() && description.trim()) {
      setIsSaveEnabled(true);
    } else {
      setIsSaveEnabled(false);
    }
  }, [name, description, photo]);
  // Функція для збереження даних
  const handleNext = () => {
    const newNote = {
      title: name,
      description: description,
      photo: photo,
    };

    setName('');
    setDescription('');
    setPhoto(null);

    // Оновлюємо профіль користувача з новою нотаткою
    saveUser({
      ...user,
      activeNotes: user?.activeNotes
        ? [...user.activeNotes, newNote]
        : [newNote],
    });

    navigation.navigate(ScreenName.Main);
  };

  const handleBack = () => {
    navigation.navigate(ScreenName.Main);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.back_btn}>
        <Image source={require('../../assets/images/icons/back_icon.png')} />
        <Text style={styles.inputs_name}>New note</Text>
      </TouchableOpacity>
      <SafeAreaView style={styles.inputs_block}>
        <Text style={styles.inputs_name}>Name of note</Text>
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
        <Text style={styles.inputs_name}>Description</Text>
        <SafeAreaView style={[styles.inputs, {height: 128}]}>
          <TextInput
            placeholder="Tell us about yourself"
            placeholderTextColor="rgba(153, 153, 153, 1)"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </SafeAreaView>
        <SafeAreaView style={styles.inputs_block}>
          <Text style={styles.inputs_name}>Description</Text>
          <TouchableOpacity onPress={pickImage} style={styles.addPhoto}>
            {photo ? (
              <Image source={{uri: photo}} style={styles.addPhoto} />
            ) : (
              <Image
                source={require('../../assets/images/icons/add_photo_profile.png')}
              />
            )}
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
      <TouchableOpacity
        onPress={handleNext}
        disabled={!isSaveEnabled}
        style={[
          styles.next,
          {
            backgroundColor: isSaveEnabled
              ? 'rgba(123, 3, 11, 1)'
              : 'rgba(54, 62, 75, 1)',
          },
        ]}>
        <Text
          style={[
            styles.next_text,
            {
              color: isSaveEnabled
                ? 'rgba(255, 255, 255, 1)'
                : 'rgba(153, 153, 153, 1)',
            },
          ]}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 23,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(35, 40, 48, 1)',
    alignItems: 'center',
  },
  back_btn: {
    width: 358,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
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
    width: 358,
    height: 52,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  addPhoto: {
    width: 358,
    height: 191,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(54, 62, 75, 1)',
  },
  next: {
    width: 358,
    height: 48,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  next_text: {
    fontWeight: '400',
    fontSize: 17,
  },
});
