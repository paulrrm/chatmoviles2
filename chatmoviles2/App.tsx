import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack=createStackNavigator();
const App: React.FC = () => {
  return <NavigationContainer>
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
</NavigationContainer>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;