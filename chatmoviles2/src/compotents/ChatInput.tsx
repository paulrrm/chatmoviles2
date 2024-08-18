import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {firebase} from "../fb"
import { Message } from '../types/Message';
interface ChatInputProps {
  onSend: (message: string) => void;
  
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim().length > 0) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <View style={styles.container}>
        {data ? (
        <Text style={styles.text}>{JSON.stringify(data, null, 2)}</Text>
      ) : (
        <Text style={styles.text}>Cargando datos...</Text>
      )}
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Escribe un mensaje..."
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const [data, setData] = useState<Message | null>(null);

useEffect(() => {
  const databaseRef = firebase.database().ref('/messages/');

  const onValueChange = databaseRef.on('value', (snapshot: { val: () => any; }) => {
    const value = snapshot.val();
    setData(value);
  });

  // Cleanup subscription on unmount
  return () => databaseRef.off('value', onValueChange);
}, []);


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatInput;
