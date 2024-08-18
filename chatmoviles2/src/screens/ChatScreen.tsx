import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { Message } from "../types/Message";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBXgtCiu_sW94evdyNFEYTHfVdScctk3Ik",
  authDomain: "prmtest-708b1.firebaseapp.com",
  databaseURL: "https://prmtest-708b1-default-rtdb.firebaseio.com",
  projectId: "prmtest-708b1",
  storageBucket: "prmtest-708b1.appspot.com",
  messagingSenderId: "45823036154",
  appId: "1:45823036154:web:98540ccd88cb7b97d19743"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, 'Mensajes');
     // Listen for changes in the "messages" reference
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages: Message[] = Object.keys(data).map((key) => data[key]);
        // Sort messages by timestamp in descending order
        loadedMessages.sort((a, b) => b.timestamp - a.timestamp);
        setMessages(loadedMessages);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const envioDatos = (mensajeTexto: string) => {
    const db = getDatabase();
    const newMessageRef = ref(db, `Mensajes/${Date.now()}`);
    const mensaje: Message = {
     
      text: mensajeTexto,
      timestamp: Date.now(),
    };

    set(newMessageRef, mensaje);
    setText('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestampText}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Escribe un mensaje..."
        />
        <TouchableOpacity style={styles.button} onPress={() => envioDatos(text)}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messageContainer: {
    backgroundColor: "#e1ffc7",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  timestampText: {
    fontSize: 10,
    color: "#999",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
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
  button: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatScreen;