import Constants from "expo-constants";
import React, {useLayoutEffect, useState} from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { router, useNavigation } from "expo-router";
import Header from "@components/Header";
import {useLoginWithEmail} from "@privy-io/expo";
import {logoStyle, loginStyles as styles} from "@styles";

const LoginScreen = () => {
  const [email, setEmail] = useState(Constants.expoConfig?.extra?.email || "");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const navigation = useNavigation();
  const emailFlow = useLoginWithEmail({
    onLoginSuccess(user, isNewUser) {
      console.log("onLoginSuccess :: ", user, isNewUser);
      // router.replace("/Home");
    },
    onSendCodeSuccess(args) {
      console.log("onSendCodeSuccess :: ", args);
      setCodeSent(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header showLogo={false} />,
    });
  }, [navigation]);

  const handleSendCode = async () => {
    try {
      const code = await emailFlow.sendCode({email});
      console.log("sendCode :: code :: ", code);
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert(
        "Login Error",
        "Failed to login. Please check your credentials and try again."
      );
    }
  };

  const handleLogin = async () => {
    try {
      // const blah = await emailFlow.loginWithCode({ code });
      console.log("login :: blah :: "); //, blah);
      // navigation.navigate("explore");
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert(
        "Login Error",
        "Failed to login. Please check your credentials and try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@assets/images/sippp-logo-transparent.png")}
        style={logoStyle}
        resizeMode="contain"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="sippp@really.happened"
        style={styles.input}
        inputMode="email"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSendCode}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Send Code</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Code"
        style={styles.input}
        inputMode="numeric"
      />
      <View style={styles.buttonContainer}>
        {codeSent ? (
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={true}
            onPress={handleLogin}
            style={styles.buttonDisabled}
          >
            <Text style={styles.buttonText}>Email First</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={{color: "rgba(0,0,0,0.4)", marginVertical: 10}}>
        (OTP state:{" "}
        <Text style={{color: "blue"}}>{emailFlow.state.status}</Text>)
      </Text>
    </View>);
}

export default LoginScreen;
