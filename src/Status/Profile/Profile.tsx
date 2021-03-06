// * IMPORTS --------------------------------------------------------------
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import UserPermissions from "../../utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";

// #region CONST ---------------------------------------------------------
const { height } = Dimensions.get("window");

// * EXPORTS -------------------------------------------------------------
export const AVATAR_HEIGHT = 0.43 * height;

let photo: {
  cancelled: false;
} & import("expo-image-picker/build/ImagePicker.types").ImageInfo;

let notUpdated = false;

// * STYLES --------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5454d0",
  },
  profile: {
    height: AVATAR_HEIGHT,

    alignItems: "center",
    backgroundColor: "white",
    borderBottomRightRadius: 75,
    borderBottomLeftRadius: 75,
  },
  avatarContainer: {
    marginTop: 64,
  },

  avatar: {
    width: 172,
    height: 172,
    borderRadius: 86,
  },
  name: {
    marginTop: 14,
    fontSize: 26,
    fontFamily: "Lato-Bold",
    color: "black",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 30,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statAmount: {
    color: "#d6d6d6",
    fontSize: 16,
    fontWeight: "100",
    fontFamily: "Lato-Black",
  },
  statTitle: {
    color: "white",
    fontSize: 24,
    fontFamily: "Lato-Italic",
    marginTop: 4,
  },
});
//#endregion
const Profile = () => {
  const handlePickAvatar = async () => {
    //? Testing the button.
    console.log("I have presssed");

    UserPermissions.getCameraPermission();

    // TODO Result for the avatar changing ****
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      photo = result;
      notUpdated = true;
    }
  };

  //#region Screen. Avatar > 3 text cards ------------------------------------
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => handlePickAvatar()}
        >
          <Image
            source={
              notUpdated
                ? { uri: photo.uri }
                : require("../../../assets/avatar.jpg")
            }
            style={styles.avatar}
          />
        </TouchableOpacity>

        <Text style={styles.name}> User.Name </Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>4</Text>
          <Text style={styles.statTitle}>Journeys</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>1,222</Text>
          <Text style={styles.statTitle}>Points</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAmount}>4</Text>
          <Text style={styles.statTitle}>Tasks</Text>
        </View>
      </View>
    </View>
  );
};
//#endregion
export default Profile;
