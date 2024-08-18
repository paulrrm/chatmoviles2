// LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBXgtCiu_sW94evdyNFEYTHfVdScctk3Ik",
  authDomain: "prmtest-708b1.firebaseapp.com",
  databaseURL: "https://prmtest-708b1-default-rtdb.firebaseio.com",
  projectId: "prmtest-708b1",
  storageBucket: "prmtest-708b1.appspot.com",
  messagingSenderId: "45823036154",
  appId: "1:45823036154:web:98540ccd88cb7b97d19743"
};

// Inicializa Firebase solo si aún no está inicializado
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigation = useNavigation();

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setErrorMessage(null);
      navigation.navigate('Chat');
    } catch (error) {
      setErrorMessage('Error de autenticación. Por favor, intente de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Correo electrónico"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        secureTextEntry
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      <Button title={isSignUp ? "Registrarse" : "Iniciar sesión"} onPress={handleAuth} />
      <Button
        title={isSignUp ? "Ya tengo una cuenta" : "No tengo cuenta"}
        onPress={() => setIsSignUp(!isSignUp)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
});

export default LoginScreen;
