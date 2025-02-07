import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

interface Photo {
  uri: string;
}

export const Gallery: React.FC = () => {
  const [photosByDate, setPhotosByDate] = useState<Map<string, Photo[]>>(
    new Map(),
  ); // Фото, розподілені за датами
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]); // Вибрані фото
  const [isSelecting, setIsSelecting] = useState(false); // Режим вибору
  const flatListRef = useRef<FlatList>(null); // Реф для FlatList

  // 📷 Функція відкриття камери
  const openCamera = () => {
    launchCamera({mediaType: 'photo', saveToPhotos: true}, response => {
      if (response.assets) {
        const newPhotos = response.assets.map(asset => ({
          uri: asset.uri || '',
        }));

        const todayDate = new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
        }); // Форматована дата
        setPhotosByDate(prevPhotos => {
          const updatedPhotos = new Map(prevPhotos);
          if (updatedPhotos.has(todayDate)) {
            updatedPhotos.set(todayDate, [
              ...updatedPhotos.get(todayDate)!,
              ...newPhotos,
            ]);
          } else {
            updatedPhotos.set(todayDate, newPhotos);
          }
          return updatedPhotos;
        });
      }
    });
  };

  // ✅ Функція вибору фото
  const toggleSelectPhoto = (uri: string) => {
    setSelectedPhotos(prevSelected =>
      prevSelected.includes(uri)
        ? prevSelected.filter(item => item !== uri)
        : [...prevSelected, uri],
    );
  };

  // 🗑 Видалення фото
  const deletePhotos = () => {
    Alert.alert(
      'Delete photos',
      'Are you sure you want to delete selected photos?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPhotosByDate(prevPhotos => {
              const updatedPhotos = new Map(prevPhotos);
              selectedPhotos.forEach(uri => {
                updatedPhotos.forEach((photos, date) => {
                  const newPhotos = photos.filter(photo => photo.uri !== uri);
                  if (newPhotos.length === 0) {
                    updatedPhotos.delete(date);
                  } else {
                    updatedPhotos.set(date, newPhotos);
                  }
                });
              });
              return updatedPhotos;
            });
            setSelectedPhotos([]); // Скидаємо вибір
            setIsSelecting(false); // Виходимо з режиму вибору
          },
        },
      ],
    );
  };

  // 📜 Прокручування до кінця списку після додавання нового фото
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [photosByDate]); // Кожного разу, коли масив фото змінюється

  return (
    <View style={{alignItems: 'center'}}>
      {/* Заголовок */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Genting Gallery</Text>
        <TouchableOpacity onPress={() => setIsSelecting(!isSelecting)}>
          <Text style={styles.selectText}>
            {isSelecting ? 'Cancel' : 'Select'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Список фото за датами */}
      <View style={{height: 430,}}>
        <FlatList
          ref={flatListRef} // Прив'язуємо реф
          data={Array.from(photosByDate.entries())} // Конвертуємо Map в масив для FlatList
          keyExtractor={([date]) => date} // Використовуємо дату як ключ
          renderItem={({item}) => {
            const [date, photos] = item;
            return (
              <View style={styles.dateWrapper}>
                <Text style={styles.dateText}>{date}</Text>
                <FlatList
                  data={photos}
                  keyExtractor={item => item.uri}
                  numColumns={2}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => isSelecting && toggleSelectPhoto(item.uri)}
                      style={styles.photoWrapper}>
                      <Image source={{uri: item.uri}} style={styles.photo} />
                      {isSelecting && (
                        <View
                          style={[
                            styles.checkbox,
                            selectedPhotos.includes(item.uri) && styles.checked,
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <Text style={styles.noPhotosText}>No photos yet</Text>
                  }
                />
              </View>
            );
          }}
          ListEmptyComponent={
            <Text style={styles.noPhotosText}>No photos yet</Text>
          }
        />
      </View>

      {/* Кнопка відкриття камери */}
      <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
        <Image source={require('../../assets/images/icons/camera_icon.png')} />
      </TouchableOpacity>

      {/* Кнопка видалення */}
      {isSelecting && selectedPhotos.length > 0 && (
        <TouchableOpacity style={styles.deleteButton} onPress={deletePhotos}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 115,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'rgba(54, 62, 75, 1)',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  headerTitle: {fontSize: 24, fontWeight: 'bold', color: '#FFF'},
  selectText: {fontSize: 16, color: '#FFF'},
  noPhotosText: {color: '#FFF', textAlign: 'center', marginTop: 20},
  dateWrapper: {marginBottom: 20},
  dateText: {fontSize: 18, color: '#FFF', marginLeft: 10, marginBottom: 10},
  photoWrapper: {width: 171, height: 209, margin: 16, position: 'relative'},
  photo: {width: 171, height: 209, borderRadius: 10},
  checkbox: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  checked: {backgroundColor: 'red'},
  cameraButton: {
    position: 'absolute',
    top: 450,
    alignSelf: 'center',
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 50,
  },
  deleteButton: {
    position: 'absolute',
    top: 45,
    right: 80,
    backgroundColor: 'rgba(123, 3, 11, 1)',
    paddingBottom: 4,
    paddingTop: 4,
    paddingRight: 8,
    paddingLeft: 8,
    borderRadius: 5,
  },
  deleteText: {color: '#FFF', fontWeight: '400', fontSize: 16},
});
