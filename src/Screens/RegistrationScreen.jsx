import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import bgImage from "../images/bg-img.jpg";
import avatar from "../images/avatar.jpg";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/authOperations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
// import { authReducer } from "../../redux/auth/authSlice";

const initialData = {
  nickName: "",
  email: "",
  password: "",
};

export const RegistrationScreen = () => {
  const [isKeyboardShown, setisKeyboardShown] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [formData, setFormData] = useState(initialData);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Home", {
        screen: "PostsScreen",
      });
    }
  }, [isLoggedIn]);

  const keyBoardHide = () => {
    Keyboard.dismiss();
    setisKeyboardShown(false);
  };

  const onSubmit = () => {
    keyBoardHide();
    if (!formData.email.includes("@") || formData.email.length < 7) {
      Alert.alert(
        "Your email has to include '@' and be more than 7 symbols!!!"
      );
    } else if (formData.password.length < 7) {
      Alert.alert("Your password's length must be more than 7 symbols !!!");
    } else if (formData.password.length < 7 && !formData.email.includes("@")) {
      Alert.alert("Please fill in the fields!");
    } else if (!formData.nickName) {
      Alert.alert("Don't forget your login))");
    } else {
      console.log(formData);
      setFormData(initialData);
      dispatch(
        register({
          nickName: formData.nickName,
          email: formData.email,
          password: formData.password,
        })
      );
      navigation.navigate("Home", {
        screen: "PostsScreen",
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-100}
            behavior="padding"
          > 
            <View style={styles.form}>
              <Image
                style={styles.imageAvatar}
                source={avatar}
              />
              <View style={styles.svg}>
                <AntDesign
                  name="pluscircleo"
                  size={25}
                  color="#FF6C00"
                  backgroundColor="#FFFFFF"
                />
              </View>
              <Text style={styles.header}>Реєстрація</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Логін"
                onFocus={() => setisKeyboardShown(true)}
                value={formData.nickName}
                onChangeText={(value) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    nickName: value,
                  }))
                }
              />
              <TextInput
                style={styles.textInput}
                placeholder="Адреса електронної пошти"
                onFocus={() => setisKeyboardShown(true)}
                value={formData.email}
                onChangeText={(value) =>
                  setFormData((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={styles.textInput}
                placeholder="Пароль"
                secureTextEntry={isPasswordSecure}
                onFocus={() => setisKeyboardShown(true)}
                value={formData.password}
                onChangeText={(value) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.inputLink}
                onPress={() => setIsPasswordSecure(!isPasswordSecure)}
              >
                <Text style={styles.inputLinkText}>
                  {isPasswordSecure ? "Показати" : "Сховати"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={onSubmit}
              >
                <Text style={styles.appButtonText}>Зареєстуватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.link}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  header: {
    color: "black",
    marginTop: 92,
    marginBottom: 32,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "500",
    textAlign: "center",
  },
  form: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 45,
  },
  textInput: {
    height: 50,
    paddingLeft: 16,
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  button: {
    height: 51,
    marginTop: 27,
    marginBottom: 16,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
  },
  appButtonText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#fff",
  },
  linkText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#1B4371",
    marginLeft: "auto",
    marginRight: "auto",
  },
  imageAvatar: {
    width: 120,
    height: 120,
    position: "absolute",
    alignSelf: "center",
    top: -60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  svg: {
    position: "absolute",
    width: 25,
    height: 25,
    left: 235,
    top: 21,
  },
  inputLink: {
    position: "absolute",
    right: 32,
    top: 308,
  },
  inputLinkText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#1B4371",
  },
});
