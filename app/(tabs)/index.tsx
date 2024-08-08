import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import {useLoginWithEmail, usePrivy} from "@privy-io/expo";
// import LoginScreen from './login';
import "react-native-get-random-values";
import "fast-text-encoding";
import "@ethersproject/shims";
import "@shim";

import Constants from "expo-constants";
import React, {useLayoutEffect, useTransition, useEffect, useState} from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  // Image,
  Alert,
} from "react-native";
import { router, useNavigation } from "expo-router";
import Header from "@components/Header";
import {logoStyle, loginStyles} from "@styles";


export default function HomeScreen() {
  const usePrivyHook = usePrivy();
  const [email, setEmail] = useState(Constants.expoConfig?.extra?.email || "");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPending, startTransition] = useTransition();
  const navigation = useNavigation();
  const {sendCode, loginWithCode, status} = useLoginWithEmail({
    onLoginSuccess(user, isNewUser) {
      console.log("onLoginSuccess :: ", user, isNewUser);
      setLoggedIn(true);
    },
    onSendCodeSuccess(args) {
      console.log("onSendCodeSuccess :: ", args);
      setCodeSent(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSendCode = async () => {
    try {
      const code = await sendCode({email});
      // setCodeSent(true);
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
      // return <></>;
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert(
        "Login Error",
        "Failed to login. Please check your credentials and try again."
      );
    }
  };

  return (
    <>
      {usePrivyHook.isReady && !usePrivyHook.user?.linked_accounts[1] ? (
        <View style={loginStyles.container}>
        <Image
          source={require("@assets/images/sippp-logo-transparent.png")}
          style={logoStyle}
          resizeMode="contain"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="sippp@really.happened"
          style={loginStyles.input}
          inputMode="email"
        />
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSendCode}
            style={loginStyles.button}
          >
            <Text style={loginStyles.buttonText}>Send Code</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder="Code"
          style={loginStyles.input}
          inputMode="numeric"
        />
        <View style={loginStyles.buttonContainer}>
          {codeSent ? (
            <TouchableOpacity
              onPress={handleLogin}
              style={loginStyles.button}
            >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={true}
              onPress={handleLogin}
              style={loginStyles.buttonDisabled}
            >
              <Text style={loginStyles.buttonText}>Email First</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={{color: "rgba(0,0,0,0.4)", marginVertical: 10}}>
          (OTP state:{" "}
          <Text style={{color: "blue"}}>{status}</Text>) 
        </Text>
        </View>
      ) : loggedIn ? (
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">USER USER BLAH BLAH!</ThemedText>
            <HelloWave />
          </ThemedView>
        ) : (
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">FINALLY!</ThemedText>
          <HelloWave />
        </ThemedView>
      )}
    </>
    // <LoginScreen />
  );
}

// usePrivyHook.isReady &&
//         usePrivyHook.user?.linked_accounts[1]?.type === "wallet" &&
//         usePrivyHook.user?.linked_accounts[1]

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

    
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/partial-react-logo.png')}
    //       style={styles.reactLogo}
    //     />
    //   }>
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">Welcome!</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
    //       Press{' '}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       Tap the Explore tab to learn more about what's included in this starter app.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       When you're ready, run{' '}
    //       <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>