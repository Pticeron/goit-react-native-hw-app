import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const DefaultPostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  console.log("isFocused", isFocused);

  useEffect(() => {
    if (isFocused) {
      getDataFromFirestore();
    }
  }, []);

  const getDataFromFirestore = async () => {
    try {
      try {
        const snapshot = await getDocs(collection(db, "posts"));
        let arr = [];
        snapshot.forEach((doc) => arr.push({ id: doc.id, data: doc.data() }));
        setPosts(arr);
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const onLikePressed = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      const postSnapshot = await getDoc(postRef);
      const postLikes = postSnapshot.data().likes;
      const updatedLikes = Number(postLikes + 1);

      await updateDoc(postRef, {
        likes: updatedLikes,
      });
      console.log("Document likes updated");
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const locationName = item.data.locationName;
          const location = item.data.location;
          const photo = item.data.photo;
          const comments = item.data.comments;
          const numberOfComments = comments.length;
          const numberOfLikes = item.data.likes;

          return (
            <View style={styles.postContainer}>
              <Image source={{ uri: photo }} style={styles.image} />
              {locationName ? (
                <Text style={styles.text}>{locationName}</Text>
              ) : (
                ""
              )}
              <View style={styles.btnContainer}>
                <View style={styles.leftButtonsContainer}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate("Коментарі", {
                        photo: item.data.photo,
                        postId: item.id,
                        comments,
                      })
                    }
                  >
                    <EvilIcons
                      name="comment"
                      size={26}
                      color={numberOfComments !== 0 ? "#FF6C00" : "#BDBDBD"}
                    />
                    <Text
                      style={{
                        ...styles.commentText,
                        color: numberOfComments !== 0 ? "#212121" : "#BDBDBD",
                      }}
                    >
                      {numberOfComments || 0}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ ...styles.button, marginLeft: 24 }}
                    onPress={() => onLikePressed(item.id)}
                  >
                    <AntDesign
                      name="like2"
                      size={22}
                      color={numberOfLikes !== 0 ? "#FF6C00" : "#BDBDBD"}
                    />
                  </TouchableOpacity>
                </View>

                {location ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate("Локація", { locationName, location })
                    }
                  >
                    <Ionicons
                      name="ios-location-outline"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text style={styles.locationText}>{locationName}</Text>
                  </TouchableOpacity>
                ) : (
                  ""
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    backgroundColor: "#fff",
  },
  image: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  leftButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  postContainer: {
    marginTop: 25,
  },
  locationText: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#212121",
    marginLeft: 4,
  },
  commentText: {
    marginLeft: 5,
    fontSize: 16,
  },
});
