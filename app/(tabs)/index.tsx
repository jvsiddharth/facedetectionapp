import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { PermissionStatus } from 'expo-modules-core';
import { Camera, CameraView } from 'expo-camera';

const App: React.FC = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<PermissionStatus | null>(null);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status);
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission !== PermissionStatus.GRANTED) {
    return null; // You can return a different component or message here
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing='front' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default App;