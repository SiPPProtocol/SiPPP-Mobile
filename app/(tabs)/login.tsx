import Constants from "expo-constants";
import React, {useLayoutEffect, useTransition, useEffect, useState} from "react";
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
import {useLoginWithEmail, usePrivy} from "@privy-io/expo";
import {logoStyle, loginStyles as styles} from "@styles";

const LoginScreen = () => {
  const usePrivyHook = usePrivy();
  const [email, setEmail] = useState(Constants.expoConfig?.extra?.email || "");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPending, startTransition] = useTransition();
  const navigation = useNavigation();
  const {sendCode, loginWithCode, status} = useLoginWithEmail({
  //   onLoginSuccess(user, isNewUser) {
  //     console.log("onLoginSuccess :: ", user, isNewUser);
  //     setLoggedIn(true);
  //   },
    onSendCodeSuccess(args) {
      console.log("onSendCodeSuccess :: ", args);
      setCodeSent(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  try {
    if (
      loggedIn &&
      usePrivyHook.isReady && 
      !usePrivyHook.user?.linked_accounts[1]) 
    {
      console.log("usePrivyHook :: ", usePrivyHook);
      return <></>;
    }
  } catch (error) {
    console.error("Error after login:", error);
    Alert.alert(
      "Login Error",
      "Failed to handle promise."
    );
  }

  useEffect(() => {
    if (usePrivyHook.isReady && !usePrivyHook.user?.linked_accounts[1]) {
      console.log("usePrivyHook :: ", usePrivyHook);
      setLoggedIn(true);
    }
  }, [usePrivyHook.user]);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header showLogo={false} />,
    });
  }, [navigation]);

  const handleSendCode = async () => {
    try {
      const code = await sendCode({email});
      setCodeSent(true);
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
      const blah = await loginWithCode({ code });
      console.log("login :: blah :: ", blah);
      // navigation.navigate("explore");
      return <></>;
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert(
        "Login Error",
        "Failed to login. Please check your credentials and try again."
      );
    }
  };

  return (


    // <Stack.Navigator>
    //   {!isReady ? (
    //     <Stack.Screen name="Loading" component={LoadingScreen} />
    //   ) : isReady &&
    //     user?.linked_accounts[1]?.type === "wallet" &&
    //     user?.linked_accounts[1] ? (
    //     <>
    //       <Stack.Screen name="Home" component={HomeScreen} />
    //       <Stack.Screen name="Camera" component={CameraScreen} />
    //       <Stack.Screen name="Error" component={ErrorScreen} />
    //       <Stack.Screen name="Photo" component={PhotoScreen} />
    //       <Stack.Screen name="Processing" component={ProcessingScreen} />
    //       <Stack.Screen name="Share" component={ShareScreen} />
    //       <Stack.Screen name="Skip" component={SkipScreen} />
    //     </>
    //   ) : (
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //   )}
    // </Stack.Navigator>

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
        <Text style={{color: "blue"}}>{status}</Text>) 
      </Text>
    </View>);
}

export default LoginScreen;
