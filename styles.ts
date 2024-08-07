import {StyleSheet, ImageStyle, TextStyle, ViewStyle} from "react-native";

const sharedStyles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cdabf8",
    paddingHorizontal: 20,
  } as ViewStyle,
  text: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
    color: "#042431",
  } as TextStyle,
  smallText: {
    fontSize: 9,
    textAlign: "center",
    color: "#042431",
  } as TextStyle,
  largeText: {
    fontSize: 28,
    marginBottom: 50,
    textAlign: "center",
    color: "#042431",
  } as TextStyle,
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  } as ViewStyle,
  button: {
    backgroundColor: "#450291",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    textAlign: "center",
    marginHorizontal: 10,
    marginTop: 20,
    width: 200,
  } as ViewStyle,
  buttonDisabled: {
    backgroundColor: "#042431",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    textAlign: "center",
    marginHorizontal: 10,
  } as ViewStyle,
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
  } as TextStyle,
  photo: {
    width: 375,
    height: 375,
    marginBottom: 20,
  } as ImageStyle,
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  loader: {
    position: "absolute",
    zIndex: 1,
  } as ViewStyle,
  hiddenImage: {
    opacity: 0,
  } as ImageStyle,
};

export const logoStyle: ImageStyle = {
  height: "40%",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#cdabf8",
  paddingHorizontal: 20,
};

export const homeStyles = StyleSheet.create({
  ...sharedStyles,
  logo: {
    height: 500,
  } as ImageStyle,
  tagline: {
    fontSize: 24,
    margin: 30,
    color: "#042431",
  },
});

export const loginStyles = StyleSheet.create({
  ...sharedStyles,
  logo: {
    height: "40%",
  } as ImageStyle,
  input: {
    fontSize: 18,
    width: 400,
    padding: 10,
    backgroundColor: "#eee",
    marginTop: 30,
    borderRadius: 10,
  },
});

export const drawerStyles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export const cameraStyles = StyleSheet.create({
  ...sharedStyles,
  container: {flex: 1, flexDirection: "column", backgroundColor: "#cdabf8"},
  preview: {flex: 1, justifyContent: "flex-end", alignItems: "center"},
});

export const photoScreenStyles = StyleSheet.create({
  ...sharedStyles,
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  } as ViewStyle,
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  } as ViewStyle,
  timerText: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    color: "#042431",
  } as TextStyle,
  noPhotoText: {
    fontSize: 36,
    color: "#042431",
  } as TextStyle,
});

export const processingStyles = StyleSheet.create({
  ...sharedStyles,
});

export const permissionDeniedStyles = StyleSheet.create({
  ...sharedStyles,
});

export const skipStyles = StyleSheet.create({
  ...sharedStyles,
});

export const headerStyles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Ensure this is a valid FlexAlignType
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  logoPlaceholder: {
    width: 100,
    height: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sidebar: {
    width: 250,
    height: "100%",
    backgroundColor: "#333",
    padding: 20,
  },
  closeIcon: {
    alignSelf: "flex-end",
  },
  sidebarItem: {
    color: "#fff",
    marginVertical: 10,
  },
});
