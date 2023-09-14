import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log("posts", posts);

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleContainerText}>Публікації</Text>
        </View>
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
      <View>
        <View style={styles.user}>
          <Image
            style={styles.userImage}
            source={require("../images/avatar.jpg")}
          />
          <View>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.userEmail}>email@example.com</Text>
          </View>
        </View>
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
                source={require("../images/forest.jpg")}
              />
            </TouchableOpacity>
            <View style={styles.post}>
              <Text style={styles.postTitle}>Ліс</Text>
              <View style={styles.postMeta}>
                <TouchableOpacity
                  style={styles.postComments}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <Image
                    style={styles.postIcon}
                    source={require("../images/comments-o.png")}
                  />
                  <Text style={styles.postCount}>0</Text>
                </TouchableOpacity>
                <View style={styles.postLocationInfo}>
                  <Image
                    style={styles.postIcon}
                    source={require("../images/map.png")}
                  />
                  <TouchableOpacity onPress={() => navigation.navigate("Map")}>
                    <Text style={styles.postLocationAddress}>
                      Ivano-Frankivs'k Region, Ukraine
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 44,
  },
  header: {
    position: "relative",
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    marginBottom: 16,
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
  },
  buttonLogOut: {
    position: "absolute",
    top: "50%",
    marginTop: -12,
    height: 24,
    right: 10,
  },
  iconLogOut: {
    width: 24,
    height: 24,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  userImage: {
    borderRadius: 16,
    width: 60,
    height: 60,
    marginRight: 8,
  },
  userName: {
    lineHeight: 15,
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  userEmail: {
    lineHeight: 13,
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },

  posts: {
    flex: 1,
    position: "relative",
  },
  scrollContent: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 16,
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
    color: "#BDBDBD",
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