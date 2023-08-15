import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import * as Location from "expo-location";

const CreatePostsScreen = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);

  const [focusedInput, setFocusedInput] = useState(null);

  const [title, setTitle] = useState("");
  const [locationText, setLocationText] = useState("");
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  useEffect(() => {
    const image = setPreviewImage();
    const isTitleEntered = setTitle();
    const isLocationEntered = setLocation();
    setIsFormValid(image !== "" && isTitleEntered && isLocationEntered);
  }, []);

  const pablishPost = () => {
    if (isFormValid) {
      setPreviewImage(previewImage);
      setTitle(title);
      setLocationText(locationText);
      setLocation(location);

      console.log(previewImage, title, locationText, location);

      navigation.navigate("PostsScreen", {previewImage});
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();

        setHasPermission(status === "granted");
      } catch (error) {
        console.log("Error requesting permissions:", error);
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const locationData = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationData.coords;
      setLocation({ latitude, longitude });

      setPreviewImage(uri);
    }
  };

  const deletePreviewImage = () => {
    setPreviewImage(null);
    setLocation({ latitude: null, longitude: null });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.buttonReturn}
            onPress={() => navigation.navigate("Home")}
          >
            <Image
              style={styles.iconReturn}
              source={require("../images/arrow-return.png")}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.titleContainerText}>Створити публікацію</Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.publicationContainer}>
            <View style={styles.imageContainer}>
              <Camera
                style={styles.camera}
                type={type}
                ratio={"1:1"}
                ref={setCameraRef}
              >
                <View style={styles.photoView}>
                  <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={takePicture}
                  >
                    <View style={styles.cameraButtonIcon}>
                      <Image
                        style={styles.cameraImage}
                        source={require("../images/camera-white.png")}
                      />
                    </View>
                  </TouchableOpacity>
                  {previewImage && (
                    <Image
                      style={styles.previewImageThmb}
                      source={{ uri: previewImage }}
                    />
                  )}
                  <TouchableOpacity
                    style={styles.cameraRotate}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  ></TouchableOpacity>
                </View>
              </Camera>
            </View>
            <TouchableOpacity onPress={deletePreviewImage}>
              <Text style={styles.text}>
                {previewImage ? "Редагувати фото" : "Завантажте фото"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputHolder}>
            <TextInput
              style={[
                [styles.input],
                focusedInput === "title" && [styles.inputFocused],
              ]}
              name="title"
              value={"title"}
              placeholder="Назва..."
              onChangeText={(text) => {
                setTitle(text);
              }}
              onFocus={() => setFocusedInput("title")}
              onBlur={() => setFocusedInput(false)}
            />
          </View>
          <View style={styles.inputHolder}>
            <Image
              style={styles.mapImage}
              source={require("../images/map.png")}
            />
            <TextInput
              style={[
                [styles.inputMap],
                focusedInput === "location" && [styles.inputFocused],
              ]}
              name="location"
              value={"location"}
              placeholder="Місцевість"
              onChangeText={(text) => {
                setLocation(text);
              }}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, isFormValid && styles.buttonValid]}
            onPress={pablishPost}
            >
            <Text
              style={[styles.buttonText, isFormValid && styles.buttonTextValid]}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtonDel}>
          <TouchableOpacity
            style={styles.buttonDel}
            onPress={deletePreviewImage}
          >
            <Image
              style={styles.buttonDelIcon}
              source={require("../images/trash.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 44,
    paddingBottom: 22,
  },
  header: {
    position: "relative",
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    hesght: 44,
  },
  titleContainer: {
    width: 175,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
  },
  titleContainerText: {
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    paddingBottom: 11,
    paddingTop: 11,
  },
  buttonReturn: {
    position: "absolute",
    marginTop: 10,
    height: 24,
    left: 16,
  },
  iconReturn: {
    width: 24,
    height: 24,
  },
  mainContent: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
  },
  publicationContainer: {
    marginBottom: 32,
  },
  imageContainer: {
    height: 240,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
    marginBottom: 8,
  },
  previewImageThmb: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  camera: {
    flex: 1,
    resizeMode: "contain",
  },
  cameraButton: {
    paddingTop: 18,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 18,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 50,
  },
  cameraImage: {
    width: 24,
    height: 24,
  },
  photoView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButtonIcon: {
    color: "#fff",
  },

  text: {
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
  input: {
    fontFamily: "Roboto-Regular",
    minWidth: 343,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingBottom: 16,
    paddingTop: 16,
  },
  inputFocused: {
    color: "#000",
  },
  mapImage: {
    position: "absolute",
    top: "50%",
    left: 0,
    width: 24,
    height: 24,
    marginTop: -12,
  },
  inputHolder: {
    position: "relative",
    marginBottom: 16,
  },
  inputMap: {
    minWidth: 343,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingLeft: 28,
    paddingBottom: 16,
    paddingTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#E8E8E8",
    borderRadius: 100,
    minWidth: 343,
    padding: 16,
    marginTop: 27,
  },
  buttonValid: {
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },

  buttonTextValid: {
    color: "#fff",
  },
  containerButtonDel: {
    marginTop: "auto",
  },
  buttonDel: {
    width: 70,
    borderRadius: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 23,
    paddingRight: 23,
    backgroundColor: "#E8E8E8",
    marginRight: "auto",
    marginLeft: "auto",
  },
  buttonDelIcon: {
    width: 24,
    height: 24,
  },
});
