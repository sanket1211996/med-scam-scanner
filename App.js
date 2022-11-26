import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Alert, Button } from "react-native";
import { firebase } from "../med-scam-scanner/src/firebase/config";
import React,{useState,useEffect} from 'react';

export default function App() {
  const [text, setText] = useState("");
  const [scamUrls, setScamUrls] = useState([]); // todos
  const scamUrlRef = firebase.firestore().collection('scam-url'); // todos collection reference

  useEffect(() => {
    scamUrlRef
      // order by time of creating
      // .orderBy("createdAt", "desc")
      // fetch todos in realtime
      .onSnapshot(
        (querySnapshot) => {
          const newScamUrls = [];
          // loop through the saved todos
          querySnapshot.forEach((doc) => {
            const scamUrl = doc.data();
            scamUrl.id = doc.id;
            newScamUrls.push(scamUrl);
          });
          // set the todos to the state
          setScamUrls(newScamUrls);
          console.log(newScamUrls);
        },
        (error) => {
          // log any error
          console.error(error);
        }
      );
  }, []);

  const checkUrl = () => {
    for(let data of scamUrls) {
      if(data.url === text) {
        alert('Scam URL');
        return;
      }
    }
    alert('Safe URL');
  };

  return (
      <View style={styles.container}>
        <h1>Scam URL Scammer </h1>
        <TextInput
          onChangeText={(text) => setText(text)}
          placeholder="Enter URL here"
        />
        <Button title="Check URL" onPress={checkUrl} color="#007AFF" />
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
