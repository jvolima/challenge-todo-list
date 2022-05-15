import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import { Task } from './TasksList';

interface TaskItemProps {
  index: number;
  item: Task;
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void;
  removeTask: (id: number) => void;
}

export function TaskItem({ index, removeTask, toggleTaskDone, editTask, item }: TaskItemProps) {
  const [isTaskBeingEdited, setIsTaskBeingEdited] = useState(false);
  const [titleEdited, setTitleEdited] = useState(item.title);
  
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsTaskBeingEdited(true);
  }

  function handleCancelEditing() {
    setTitleEdited(item.title);
    setIsTaskBeingEdited(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, titleEdited);
    setIsTaskBeingEdited(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isTaskBeingEdited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isTaskBeingEdited]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done == true ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            style={item.done == true ? styles.taskTextDone : styles.taskText}
            value={titleEdited}
            onChangeText={text => setTitleEdited(text)}
            editable={isTaskBeingEdited}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.containerButtons}>
        {
          isTaskBeingEdited == true 
          ?
            <TouchableOpacity onPress={handleCancelEditing}>
              <Icon 
                name="x"
                size={24}
                color="#b2b2b2"
              />
            </TouchableOpacity>
          : 
            <TouchableOpacity
                onPress={handleStartEditing}
              >
                <Image source={editIcon} />
            </TouchableOpacity>
        }

        <View style={styles.divisibleView}></View>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingRight: 24 }}
          onPress={() => removeTask(item.id)}
          disabled={isTaskBeingEdited}
        >
          <Image source={trashIcon} style={{ opacity: isTaskBeingEdited ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 6,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  divisibleView: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12
  },
  containerButtons: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})