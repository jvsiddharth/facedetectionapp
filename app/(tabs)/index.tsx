import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera } from 'expo-camera';

const App: React.FC = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [facesDetected, setFacesDetected] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const handleFacesDetected = ({ faces }: { faces: any[] }) => {
    setFacesDetected(faces);
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (!hasCameraPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: Camera.Constants.FaceDetection.Mode.fast,
          detectLandmarks: Camera.Constants.FaceDetection.Landmarks.none,
          runClassifications: Camera.Constants.FaceDetection.Classifications.none,
        }}
      />
      {/* Display face detection results */}
      {facesDetected.map((face, index) => (
        <View key={index} style={styles.faceRectangle} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  faceRectangle: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'red',
    top: face.bounds.origin.y,
    left: face.bounds.origin.x,
    width: face.bounds.size.width,
    height: face.bounds.size.height,
  },
});

export default App;
