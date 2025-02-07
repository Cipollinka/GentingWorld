import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActionSheetIOS,
  Platform,
  Modal,
} from 'react-native';
import {useUser} from '../../../assets/user';
import {it} from '@jest/globals';

interface Note {
  title: string;
  description: string;
  photo?: string;
}

export const Active = () => {
  const {user, saveUser} = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleArchive = (item: Note) => {
    if (!user) return;

    // Додаємо нотатку в archivedNotes
    const updatedArchivedNotes = [...user.archivedNotes, item];

    // Видаляємо нотатку з activeNotes
    const updatedActiveNotes = user.activeNotes.filter(note => note !== item);

    // Зберігаємо оновлений user
    saveUser({
      ...user,
      archivedNotes: updatedArchivedNotes,
      activeNotes: updatedActiveNotes
    });
  };

  const openActionSheet = (item: Note) => {
    setSelectedNote(item);

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Archive', 'Delete', 'Cancel'],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 3,
        },
        buttonIndex => {
          if (buttonIndex === 0 && selectedNote) {
            handleArchive(item);
          } else if (buttonIndex === 1) {
            handleDelete(item);
          }
        },
      );
    } else {
      setModalVisible(true);
    }
    console.log('Archived', user?.archivedNotes);
  };

  const handleDelete = (note: Note) => {
    if (!user) return;

    const updatedArchived = user.activeNotes.filter(
      n => n.title !== note.title,
    );
    saveUser({...user, activeNotes: updatedArchived});

    setModalVisible(false);
  };

  return (
    <View style={{height: 415}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {user?.activeNotes?.map((item, index) => (
            <TouchableOpacity
              style={styles.item}
              key={index}
              onPress={() => openActionSheet(item)}>
              {item.photo && item.photo.length > 0 && (
                <Image style={styles.image} source={{uri: item.photo}} />
              )}
              <View>
                <View style={styles.header_title}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Image
                    source={require('../../../assets/images/icons/like_icon.png')}
                  />
                </View>
                <View style={styles.header_title}>
                  <Text style={styles.descriptionText}>{item.description}</Text>
                  <Image
                    source={require('../../../assets/images/icons/description_icon.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Android Modal */}
      {Platform.OS === 'android' && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => selectedNote && handleArchive(selectedNote)}>
                <Text style={styles.modalButtonText}>Archive</Text>
              </TouchableOpacity>
              <View style={{width: 400, height: 1, backgroundColor: '#ccc'}} />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => selectedNote && handleDelete(selectedNote)}>
                <Text
                  style={[
                    styles.modalButtonText,
                    {color: 'rgba(255, 59, 48, 1)'},
                  ]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  item: {
    width: 358,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    paddingBottom: 15,
    marginBottom: 15,
  },
  image: {
    width: 358,
    height: 160,
    borderRadius: 12,
  },
  header_title: {
    width: 326,
    marginTop: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
  },
  descriptionText: {
    width: 300,
    fontWeight: '400',
    fontSize: 13,
    color: 'rgba(255, 255, 255, 1)',
  },
  modalOverlay: {
    flex: 1,
    gap: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: 'rgba(35, 40, 48, 1)',
    paddingBottom: 10,
    borderRadius: 20,
  },
  modalButton: {
    width: 400,
    padding: 15,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(54, 62, 75, 1)',
    borderRadius: 20,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
  },
});
