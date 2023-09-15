import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { AntDesign } from "@expo/vector-icons";
import avatar from "../images/avatar.jpg";

export const CommentsScreen = ({ route }) => {
  const [isKeyboardShown, setisKeyboardShown] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [newComments, setNewComments] = useState([]);

  const { photo } = route.params;
  const { postId } = route.params;
  const { comments } = route.params;

  useEffect(() => {
    if (comments && comments.length > 0) {
      setAllComments(comments);
    }
  }, [comments]);

  const keyBoardHide = () => {
    Keyboard.dismiss();
    setisKeyboardShown(false);
  };

  const createComment = async () => {
    keyBoardHide();
    const commentData = {
      time: new Date(),
      comment: comment,
      id: postId,
    };
    setAllComments((prevState) => [...prevState, commentData]);
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        comments: [...comments, commentData],
      });
      console.log("document updated");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
    setComment("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <View style={styles.container}>
        <View style={styles.photo}>
          <Image
            style={{ width: 347, height: 244, borderRadius: 8 }}
            source={{ uri: photo }}
          />
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={allComments}
          renderItem={({ item, index }) => {
            const commentTime = new Date(item.time.seconds * 1000);
            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false,
              timeZone: "Europe/Kiev",
            };
            const formattedTime = commentTime.toLocaleString("uk-UA", options);

            const [datePart, timePart] = formattedTime.split(", ");

            const isReversed = index % 2 === 1;
            const commentContainerStyle = isReversed
              ? [styles.commentContainer, styles.commentContainerReversed]
              : styles.commentContainer;

            return (
              <View style={styles.containerForComments}>
                {!isReversed && (
                  <Image
                    style={{ ...styles.imageAvatar, marginRight: 16 }}
                    source={avatar}
                  />
                )}
                <View style={commentContainerStyle}>
                  <Text style={styles.commentText}>{item.comment}</Text>
                  <View style={styles.timeContainer}>
                    <Text style={styles.commentTime}>{datePart} |</Text>
                    <Text style={styles.commentTime}> {timePart}</Text>
                  </View>
                </View>
                {isReversed && (
                  <Image
                    style={{ ...styles.imageAvatar, marginLeft: 16 }}
                    source={avatar}
                  />
                )}
              </View>
            );
          }}
        />
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? -200 : -200}
        >
          <TextInput
            placeholder="Коментувати..."
            style={styles.textInput}
            onFocus={() => setisKeyboardShown(true)}
            onChangeText={(value) => setComment(value)}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={createComment}
          >
            <AntDesign name="arrowup" size={20} color="#fff" />
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
    alignItems: "center",
  },
  containerForComments: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 24,
  },
  photo: {
    marginTop: 32,
    marginBottom: 32,
  },
  imageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  commentContainer: {
    width: 300,
    backgroundColor: "#00000008",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  commentText: {
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: "row",
  },
  commentTime: {
    fontSize: 10,
    color: "#BDBDBD",
  },
  textInput: {
    height: 50,
    marginBottom: 16,
    width: 345,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
    fontSize: 18,
    lineHeight: 19,
    fontWeight: "400",
    shadowColor: "#BDBDBD",
    shadowOpacity: 0.3,
    paddingLeft: 16,
  },
  button: {
    position: "absolute",
    left: 301,
    top: 8,
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
