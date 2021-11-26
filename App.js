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
  const position = useRef(new Animated.ValueXY({ x: 0, y: 200 })).current;

  const toggleUp = () => setUp((prev) => !prev);

  const moveBox = () => {
    Animated.timing(position.y, {
      toValue: up ? -200 : 200,
      useNativeDriver: false,
      duration: 3000,
    }).start(toggleUp);
  };

  const borderRadius = position.y.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [100, 0, 100],
  });

  const rotation = position.y.interpolate({
    inputRange: [-200, 200],
    outputRange: ["-360deg", "360deg"],
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
            transform: [{ translateY: position.y }, { rotateY: rotation }],
            borderRadius,
            bakgroundColor, // useNativeDriver mubst be false to use it
          }}
        />
      </Pressable>
    </Container>
  );
}
