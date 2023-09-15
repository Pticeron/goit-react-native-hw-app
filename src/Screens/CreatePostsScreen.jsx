import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../firebase/config";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUserId, selectUser } from "../../redux/auth/selectors.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const initialData = {
  name: "",
  location: "",
};

export const CreatePostsScreen = () => {
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState(initialData);
  const [isKeyboardShown, setisKeyboardShown] = useState(false);
  const [locationCoords, setLocationCoords] = useState(null);

  const navigation = useNavigation();
  const userId = useSelector(selectUserId);
  const user = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const keyBoardHide = () => {
    Keyboard.dismiss();
    setisKeyboardShown(false);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(image);
    const file = await response.blob();
    const uniquePhotoId = Date.now().toString();
    const path = `images/${uniquePhotoId}.jpeg`;
    const storageRef = ref(storage, path);
    const metadata = {
      contentType: "image/jpeg",
    };
    await uploadBytes(storageRef, file, metadata);
    const downloadPhoto = await getDownloadURL(storageRef);
    return downloadPhoto;
  };
  const uploadPostToServer = async () => {
    try {
      photo = await uploadPhotoToServer();
    } catch (error) {
      console.error("Error while uploadPhoto: ", error.message);
    }
    const newPost = {
      photo: photo,
      title: formData.name,
      locationName: formData.location,
      location: locationCoords,
      comments: [],
      likes: 0,
      userId,
      nickName: user.nickName,
      timePublished: +Date.now(),
    };
    try {
      const publication = await addDoc(collection(db, "posts"), newPost);
      console.log("publication", publication);
    } catch (error) {
      console.error("Error while adding doc: ", error.message);
    }
  };

  const onSubmit = async () => {
    keyBoardHide();
    await uploadPostToServer();

    navigation.navigate("Публікації");
    clearScreen();
  };

  const clearScreen = () => {
    setImage("");
    setFormData(initialData);
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setImage(photo.uri);
    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocationCoords(coords);
  };

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? -103 : -103}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Camera style={styles.camera} ref={setCamera}>
              {image && (
                <View style={styles.photo}>
                  <Image
                    style={{ width: 347, height: 244, borderRadius: 8 }}
                    source={{ uri: image }}
                  />
                </View>
              )}
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  ...styles.snapContainer,
                  backgroundColor: image ? "#FFFfff4C" : "#FFF",
                }}
                onPress={takePhoto}
              >
                <MaterialCommunityIcons
                  name="camera-enhance-outline"
                  size={24}
                  color={image ? "#FFF" : "#BDBDBD"}
                />
              </TouchableOpacity>
            </Camera>
          </View>
          {image ? (
            <Text style={styles.text}>Редагувати фото</Text>
          ) : (
            <Text style={styles.text}>Завантажте фото</Text>
          )}

          <TextInput
            placeholder="Назва..."
            style={{ ...styles.textInput, paddingLeft: 16 }}
            onFocus={() => setisKeyboardShown(true)}
            value={formData.name}
            onChangeText={(value) =>
              setFormData((prevState) => ({ ...prevState, name: value }))
            }
          />
          <TextInput
            placeholder="Місцевість..."
            style={{ ...styles.textInput, paddingLeft: 28 }}
            onFocus={() => setisKeyboardShown(true)}
            value={formData.location}
            onChangeText={(value) =>
              setFormData((prevState) => ({ ...prevState, location: value }))
            }
          />
          <Ionicons
            name="ios-location-outline"
            size={22}
            style={styles.locationIcon}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              ...styles.button,
              backgroundColor: image ? "#FF6C00" : "#F6F6F6",
            }}
            onPress={onSubmit}
          >
            <Text
              style={{
                ...styles.appButtonText,
                color: image ? "#FFF" : "#BDBDBD",
              }}
            >
              Опубліковати
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.binBtn}
            onPress={clearScreen}
          >
            <FontAwesome5 name="trash-alt" size={23} color="#BDBDBD" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
  },
  camera: {
    position: "relative",
    width: 343,
    height: 240,
    marginTop: 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
  },
  photo: {
    position: "absolute",
    top: -3,
    left: -3,
    width: 347,
    height: 244,
    borderRadius: 8,
  },
  snapContainer: {
    position: "absolute",
    left: 142,
    top: 90,
    width: 60,
    height: 60,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#BDBDBD",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  textInput: {
    height: 50,
    marginBottom: 16,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    shadowColor: "#BDBDBD",
    shadowOpacity: 0.2,
  },
  button: {
    height: 51,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  appButtonText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
  },
  locationIcon: {
    position: "absolute",
    top: 409,
    left: 8,
    color: "#BDBDBD",
  },
  binBtn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    marginLeft: 140,
  },
});
