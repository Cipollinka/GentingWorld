import React, {useState} from 'react';
import {useUser} from '../../../assets/user';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Platform,
  ActionSheetIOS,
} from 'react-native';

interface Note {
  title: string;
  description: string;
  photo?: string;
}

export const Archived = () => {
  const {user, saveUser} = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleRecover = (note: Note) => {
    if (!user) return;

    // Переміщуємо нотатку назад в активні нотатки
    const updatedActiveNotes = [...user.activeNotes, note];
    const updatedArchivedNotes = user.archivedNotes.filter(
      n => n.title !== note.title,
    );

    saveUser({
      ...user,
      activeNotes: updatedActiveNotes,
      archivedNotes: updatedArchivedNotes,
    });

    setModalVisible(false);
  };

  const handleDelete = (note: Note) => {
    if (!user) return;

    const updatedArchived = user.archivedNotes.filter(
      n => n.title !== note.title,
    );
    saveUser({...user, archivedNotes: updatedArchived});

    setModalVisible(false);
  };

  const openActionSheet = (note: Note) => {
    setSelectedNote(note);

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Recover', 'Delete', 'Cancel'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            handleRecover(note);
          } else if (buttonIndex === 1) {
            handleDelete(note);
          }
        },
      );
    } else {
      setModalVisible(true);
    }
  };

  return (
    <View style={{height: 415}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {user?.archivedNotes?.length > 0 ? (
            user.archivedNotes.map((item, index) => (
              <TouchableOpacity
                style={styles.item}
                key={index}
                onPress={() => openActionSheet(item)}>
                {item.photo && (
                  <Image style={styles.image} source={{uri: item.photo}} />
                )}
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>There are no archived notes</Text>
          )}
        </View>
      </ScrollView>

      {/* Modal for Android */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => selectedNote && handleRecover(selectedNote)}>
              <Text style={styles.modalButtonText}>Recover</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => selectedNote && handleDelete(selectedNote)}>
              <Text style={[styles.modalButtonText, styles.deleteText]}>
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
  title: {
    fontWeight: '700',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  description: {
    width: 300,
    fontWeight: '400',
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
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
  separator: {
    width: 400,
    height: 1,
    backgroundColor: '#ccc',
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
  deleteText: {
    color: 'rgba(255, 59, 48, 1)',
  },
});
