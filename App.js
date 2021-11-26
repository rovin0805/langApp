import React, { useRef, useState } from "react";
import { Animated, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import icons from "./icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const Btn = styled.TouchableOpacity`
  margin: 0px 10px;
`;

export default function App() {
  // State
  const [iconIndex, setIconIndex] = useState(0);

  // Animation values
  const scale = useRef(new Animated.Value(1)).current;
  const positionX = useRef(new Animated.Value(0)).current;
  const rotation = positionX.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
    extrapolate: "extend",
  });
  const secondScale = positionX.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp",
  });

  // Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(positionX, {
    toValue: 0,
    tension: 5,
    useNativeDriver: true,
  });
  const disappearLeft = Animated.spring(positionX, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
  });
  const disappearRight = Animated.spring(positionX, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
  });
  const onDismiss = () => {
    scale.setValue(1);
    positionX.setValue(0);
    setIconIndex((prev) => prev + 1);
  };

  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderMove: (_, { dx }) => {
        positionX.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -250) {
          disappearLeft.start(onDismiss);
        } else if (dx > 250) {
          disappearRight.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;

  // Button onPress
  const closePress = () => {
    disappearLeft.start(onDismiss);
  };
  const resetPress = () => {
    setIconIndex((prev) => prev - 1);
    Animated.parallel([onPressOut, goCenter]).start();
  };
  const checkPress = () => {
    disappearRight.start(onDismiss);
  };

  return (
    <Container>
      <CardContainer>
        <Card style={{ transform: [{ scale: secondScale }] }}>
          {/* Back Card */}
          <Ionicons name={icons[iconIndex + 1]} color="#192a56" size={98} />
        </Card>
        <Card
          style={{
            transform: [
              { scale },
              { translateX: positionX },
              { rotateZ: rotation },
            ],
          }}
          {...panResponder.panHandlers}
        >
          {/* Front Card */}
          <Ionicons name={icons[iconIndex]} color="#192a56" size={98} />
        </Card>
      </CardContainer>
      <BtnContainer>
        <Btn onPress={closePress}>
          <Ionicons name="close-circle" color="white" size={58} />
        </Btn>
        <Btn onPress={resetPress}>
          <Ionicons name="refresh-circle-outline" color="white" size={58} />
        </Btn>
        <Btn onPress={checkPress}>
          <Ionicons name="checkmark-circle" color="white" size={58} />
        </Btn>
      </BtnContainer>
    </Container>
  );
}
