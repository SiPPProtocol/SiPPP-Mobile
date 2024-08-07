import React, {useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import {headerStyles as styles} from "../styles";

const Header = ({showLogo = true}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const learnMore = () => {
    Linking.openURL("https://sippp.box");
  };

  return (
    <View style={styles.header}>
      {showLogo && (
        <View style={styles.logo}>
          <Image
            source={require("@assets/images/sippp-logo-transparent.png")}
            style={styles.logo}
          />
        </View>
      )}
      {!showLogo && <View style={styles.logoPlaceholder} />}
      <TouchableOpacity onPress={toggleModal}>
        <Icon name="user" size={24} color="#450291" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.sidebar}>
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={toggleModal}
                >
                  <Icon name="close" size={24} color="#fff" />
                </TouchableOpacity>
                {/* Add your sidebar menu items here
                <Text style={styles.sidebarItem}>Profile</Text>
                <Text style={styles.sidebarItem}>Settings</Text> */}
                <Text style={styles.sidebarItem}>Logout</Text>
                <TouchableOpacity onPress={learnMore}>
                  <Text style={styles.sidebarItem}>Learn More</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Header;
