import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Alert, Button, Image } from "react-native";
import { firebase } from "../med-scam-scanner/src/firebase/config";
import React,{useState,useEffect} from 'react';

export default function App() {
  const [text, setText] = useState("");
  const [isScamUrl, setIsScamUrl] = useState(false);
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
        setIsScamUrl(true);
        return;
      }
    }
    setIsScamUrl(false);

    alert('Safe URL');
  };

  return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Scam URL Scanner </Text>
        <TextInput style={styles.input}
          onChangeText={(text) => setText(text)}
          placeholder="Enter URL here"
        />
        <Button  title="Check URL" onPress={checkUrl} color="#007AFF" />
        {/* <Image 
        style={styles.tinyLogo}
        source={{
          uri: 'https://portlandwebdesignanddevelopment.com/wp-content/uploads/2015/05/scam.png',
        }}
        /> */}
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
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    width:300,
    borderWidth: 1,
    padding: 10,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  }
});
