import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');

  const alertNew = () => {
    console.log("Reached");
    console.log(text);
    alert(text);
  }
  return (
    <View style={styles.container}>
      <TextInput 
      onChangeText = { text => setText(text) }
      placeholder="Enter URL here"
      />
      {console.log(text)}
      <Button title="Submit" onPress={alertNew } />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
