import React, { useRef } from "react";
import { Animated, PanResponder } from "react-native";
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
  const position = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  const borderRadius = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: () => {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          bounciness: 20,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <Container>
      <AnimatedBox
        style={{
          transform: position.getTranslateTransform(),
          borderRadius,
        }}
        {...panResponder.panHandlers}
      />
    </Container>
  );
}
