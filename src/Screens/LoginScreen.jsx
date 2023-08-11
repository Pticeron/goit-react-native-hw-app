import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";

const LoginScreen = ({ navigation }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(email !== "" && password !== "");
  }, [email, password]);

  const showHidePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const signIn = () => {
    if (isFormValid) {
      setEmail(email);
      setPassword(password);

      console.log({ Email: email, Password: password });

      setEmail("");
      setPassword("");

      navigation.navigate("Home");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.page}>
        <ImageBackground
          source={require("../images/bg-img.jpg")}
          style={styles.imageBackground}
        >
          <KeyboardAvoidingView
            keyboardVerticalOffset={-100}
            behavior="padding"
            style={styles.container}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.registrationTitle}>Увійти</Text>
            </View>
            <View style={styles.formContainer}>
              <TextInput
                style={[
                  [styles.input],
                  focusedInput === "email" && [styles.inputFocused],
                ]}
                placeholderTextColor={"#BDBDBD"}
                placeholder="Адреса електронної пошти"
                name="email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  console.log("Email:", text);
                }}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
            <View style={styles.formContainer}>
              <TextInput
                style={[
                  [styles.input],
                  focusedInput === "password" && [styles.inputFocused],
                ]}
                placeholderTextColor={"#BDBDBD"}
                placeholder="Пароль"
                name="password"
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={(text) => {
                  setPassword(text);
                  console.log("Password:", text);
                }}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                style={styles.buttonShow}
                onPress={showHidePassword}
              >
                <Text style={styles.buttonShowText}>
                  {showPassword ? "Приховати" : "Показати"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.button}
                onPress={signIn}
                disabled={!isFormValid}
              >
                <Text style={styles.buttonText}>Увійти</Text>
              </TouchableOpacity>
              <View style={styles.redirection}>
                <Text style={styles.redirectionText}>Немає акаунту?</Text>
                <TouchableOpacity>
                  <Text
                    style={styles.redirectionLink}
                    onPress={() => navigation.navigate("Registration")}
                  >
                    Зареєструватися
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    objectFit: "none",
    position: "relative",
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingTop: 32,
    padding: 16,
    minHeight: 489,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  titleContainer: {
    marginBottom: 33,
  },
  registrationTitle: {
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  formContainer: {
    position: "relative",
    marginBottom: 16,
  },
  input: {
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 6,
    padding: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
    color: "#000",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: "100%",
    padding: 16,
    marginTop: 27,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  buttonShowText: {
    fontSize: 16,
    color: "#1B4371",
  },
  buttonShow: {
    position: "absolute",
    top: "50%",
    right: 16,
    lineHeight: 24,
    marginTop: -12,
  },
  actions: {
    overflow: "hidden",
  },
  redirectionText: {
    fontSize: 16,
    color: "#1B4371",
  },
  redirectionLink: {
    fontSize: 16,
    color: "#1B4371",
    textDecorationLine: "underline",
  },
  redirection: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
    gap: 5,
  },
});
