import React, { useRef, useState } from "react";
import { Animated, Pressable } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(true);
  const Y_POSITION = useRef(new Animated.Value(200)).current;

  const toggleUp = () => setUp((prev) => !prev);

  const moveBox = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? -200 : 200,
      useNativeDriver: true,
      duration: 3000,
    }).start(toggleUp);
  };

  const opacity = Y_POSITION.interpolate({
    inputRange: [-200, -150, 0, 150, 200],
    outputRange: [1, 0.5, 0, 0.5, 1],
  });

  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [100, 0, 100],
  });

  return (
    <Container>
      <Pressable onPress={moveBox}>
        <AnimatedBox
          style={{
            transform: [{ translateY: Y_POSITION }],
            opacity,
            borderRadius,
          }}
        />
      </Pressable>
    </Container>
  );
}
