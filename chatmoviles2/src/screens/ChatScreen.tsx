import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, Pressable, TextInput, TouchableOpacity } from "react-native";
import {getDatabase, ref, onValue, set, Database} from "firebase/database";
import ChatInput from "../compotents/ChatInput";
import { Message } from "../types/Message";
import { initializeApp } from "firebase/app";
import firebase from '../fb';

const ChatScreen: React.FC = () => {
  const firebaseConfig = {
    
      apiKey: "AIzaSyBXgtCiu_sW94evdyNFEYTHfVdScctk3Ik",
      authDomain: "prmtest-708b1.firebaseapp.com",
      databaseURL: "https://prmtest-708b1-default-rtdb.firebaseio.com",
      projectId: "prmtest-708b1",
      storageBucket: "prmtest-708b1.appspot.com",
      messagingSenderId: "45823036154",
      appId: "1:45823036154:web:98540ccd88cb7b97d19743"
    
  };

  const app = initializeApp(firebaseConfig);

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, settext] = useState('')

  initializeApp(firebaseConfig);
  function envioDatos(menssa:string){
    let mensaje:Message = {
      id: new Date().getUTCDate().toString(),
      text:menssa,
      timestamp:Number(new Date()[Symbol.toPrimitive]('number'))

    }
    const db=getDatabase();
    const reference=ref(db,'messages/'+mensaje.id);
    set(reference,{
      
      id: mensaje.id,
      text: mensaje.text,
      timestamp: mensaje.timestamp
    })
  };
  


  

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
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
     <TextInput
        style={styles.input}
        value={text}
        onChangeText={settext}
        placeholder="Escribe un mensaje..."
      />
      <TouchableOpacity style={styles.button} onPress={()=> envioDatos(text)}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatScreen;
