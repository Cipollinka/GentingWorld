import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  ScreenName,
  useNavigation,
} from '../../../assets/user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../../assets/user';

export const AddHotel = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();
  const [hotelName, setHotelName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [photos, setPhotos] = useState([]);

  const handleBack = () => {
    navigation.navigate(ScreenName.Main);
  };

  const selectImage = (
    setImage: (value: ((prevState: null) => null) | null) => void,
  ) => {
    launchImageLibrary({}, response => {
      if (response.assets) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const selectPhoto = () => {
    launchImageLibrary({}, response => {
      if (response.assets) {
        setPhotos([...photos, response.assets[0].uri]);
      }
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };
  const handleNext = () => {
    const newHotel = {
      name: hotelName,
      description,
      address,
      startDate,
      fishDate: finishDate, // Виправив назву поля fishDate -> finishDate
      cover: coverImage,
      photos,
    };

    saveUser({
      ...user,
      hotels: [...(user?.hotels || []), newHotel], // Якщо hotels немає, використовуємо пустий масив
    });

    navigation.navigate(ScreenName.Main); // Переходимо на головний екран
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#232830', padding: 20}}>
      <TouchableOpacity
        onPress={handleBack}
        style={{gap: 10, flexDirection: 'row'}}>
        <Image source={require('../../../assets/images/icons/back_icon.png')} />
        <Text style={{color: 'white', fontSize: 18, marginBottom: 10}}>
          Add new hotel
        </Text>
      </TouchableOpacity>
      <View style={{gap: 15}}>
        <TextInput
          placeholder="Task name"
          placeholderTextColor="gray"
          value={hotelName}
          onChangeText={setHotelName}
          style={{
            backgroundColor: '#2C313A',
            color: 'white',
            padding: 10,
            borderRadius: 8,
          }}
        />
        <TextInput
          placeholder="Comment"
          placeholderTextColor="gray"
          value={description}
          onChangeText={setDescription}
          multiline
          style={{
            backgroundColor: '#2C313A',
            color: 'white',
            padding: 10,
            borderRadius: 8,
          }}
        />
        <TextInput
          placeholder="Text"
          placeholderTextColor="gray"
          value={address}
          onChangeText={setAddress}
          style={{
            backgroundColor: '#2C313A',
            color: 'white',
            padding: 10,
            borderRadius: 8,
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            placeholder="DD.MM.YYYY"
            placeholderTextColor="gray"
            value={startDate}
            onChangeText={setStartDate}
            style={{
              backgroundColor: '#2C313A',
              color: 'white',
              padding: 10,
              borderRadius: 8,
              flex: 1,
              marginRight: 10,
            }}
          />
          <TextInput
            placeholder="DD.MM.YYYY"
            placeholderTextColor="gray"
            value={finishDate}
            onChangeText={setFinishDate}
            style={{
              backgroundColor: '#2C313A',
              color: 'white',
              padding: 10,
              borderRadius: 8,
              flex: 1,
            }}
          />
        </View>
        <Text style={{color: 'white', marginTop: 10}}>Cover</Text>
        <TouchableOpacity
          onPress={() => selectImage(setCoverImage)}
          style={{
            height: 150,
            backgroundColor: '#2C313A',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          }}>
          {coverImage ? (
            <Image
              source={{uri: coverImage}}
              style={{width: '100%', height: '100%', borderRadius: 8}}
            />
          ) : (
            <Text style={{color: 'gray'}}>+</Text>
          )}
        </TouchableOpacity>
        <Text style={{color: 'white', marginTop: 10}}>Photos</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {photos.map((photo, index) => (
            <View
              key={index}
              style={{position: 'relative', marginRight: 10, marginBottom: 10}}>
              <Image
                source={{uri: photo}}
                style={{width: 80, height: 80, borderRadius: 8}}
              />
              <TouchableOpacity
                onPress={() => removePhoto(index)}
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  padding: 5,
                }}>
                <Text style={{color: 'white'}}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={selectPhoto}
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#2C313A',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <Text style={{color: 'gray'}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleNext}
        style={{
          padding: 15,
          borderRadius: 8,
          backgroundColor:
            hotelName && address && startDate && finishDate
              ? 'rgba(123, 3, 11, 1)'
              : 'rgba(54, 62, 75, 1)',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 25,
        }}
        disabled={!hotelName || !address || !startDate || !finishDate}>
        <Text style={{color: 'white', fontSize: 16}}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
