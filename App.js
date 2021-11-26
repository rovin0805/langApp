import React, { useRef } from "react";
import { Animated, Dimensions, Pressable } from "react-native";
import styled from "styled-components/native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

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
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    })
  ).current;

  const topLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });
  const bottomLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });
  const bottomRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });
  const topRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });

  const moveBox = () => {
    Animated.loop(
      Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
    ).start();
  };

  const borderRadius = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: [100, 0],
  });

  const bakgroundColor = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"],
  });

  return (
    <Container>
      <Pressable onPress={moveBox}>
        <AnimatedBox
          style={{
            transform: [...position.getTranslateTransform()],
            borderRadius,
            bakgroundColor, // useNativeDriver mubst be false to use it
          }}
        />
      </Pressable>
    </Container>
  );
}
