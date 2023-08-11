import {
  Keyboard,
  ImageBackground,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
// import React, { useState, useEffect } from "react";

const ProfileScreen = ({ navigation }) => {
  const addImage = (e) => {
    e.preventDefault();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.page}>
        <ImageBackground
          source={require("../images/bg-img.jpg")}
          style={styles.imageBackground}
          imageStyle={{
            minHeight: 812,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={styles.container}
          >
            <View>
              <TouchableOpacity
                style={styles.buttonLogOut}
                onPress={() => navigation.navigate("Login")}
              >
                <Image
                  style={styles.iconLogOut}
                  source={require("../images/log-out.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.avatar}>
              <Image
                style={styles.avatarImage}
                source={require("../images/avatar.jpg")}
              />
              <TouchableOpacity style={styles.buttonAdd} onPress={addImage}>
                <Image
                  style={styles.buttonAddIcon}
                  source={require("../images/added.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.nameTitle}>Natali Romanova</Text>
            </View>
            <View style={styles.posts}>
              <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.post}>
                  <TouchableOpacity
                    style={styles.postImageLink}
                    onPress={() => navigation.navigate("Home")}
                  >
                    <Image
                      style={styles.postImage}
                      source={require("../images/sunset.jpg")}
                    />
                  </TouchableOpacity>
                  <View style={styles.postContent}>
                    <Text style={styles.postTitle}>Ліс</Text>
                    <View style={styles.postMeta}>
                      <TouchableOpacity
                        style={styles.postComments}
                        onPress={() => navigation.navigate("Comments")}
                      >
                        <Image
                          style={styles.postIcon}
                          source={require("../images/comments.png")}
                        />
                        <Text style={styles.postCount}>8</Text>
                      </TouchableOpacity>
                      <View style={styles.postLikes}>
                        <Image
                          style={styles.postIcon}
                          source={require("../images/like.png")}
                        />
                        <Text style={styles.postCount}>200</Text>
                      </View>
                      <View style={styles.postLocationInfo}>
                        <Image
                          style={styles.postIcon}
                          source={require("../images/map.png")}
                        />
                        <TouchableOpacity
                          onPress={() => navigation.navigate("Map")}
                        >
                          <Text style={styles.postLocationAddress}>
                            Ukraine
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    position: "relative",
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    top: 147,
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  buttonLogOut: {
    position: "absolute",
    top: 22,
    right: 16,
    width: 24,
    height: 24,
  },
  iconLogOut: {
    width: 24,
    height: 24,
  },
  avatar: {
    position: "relative",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginBottom: 32,
    width: 120,
    aspectRatio: 1,
    marginTop: -76,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonAdd: {
    position: "absolute",
    width: 25,
    height: 25,
    right: -14,
    bottom: 14,
  },
  buttonAddIcon: {
    width: 25,
    height: 25,
  },
  avatarImage: {
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  titleContainer: {
    marginBottom: 33,
  },
  nameTitle: {
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  posts: {
    flex: 1,
    position: "relative",
  },
  scrollContent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "scroll",
  },
  post: {
    marginBottom: 32,
  },
  postImageLink: {
    marginBottom: 8,
  },
  postImage: {
    height: 240,
    borderRadius: 8,
    width: "100%",
  },
  postTitle: {
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  postMeta: {
    flexDirection: "row",
    gap: 24,
  },
  postIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  postCount: {
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
  },
  postComments: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  postLikes: {
    flexDirection: "row",
    alignItems: "center",
  },
  postLocationInfo: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  postLocationAddress: {
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
