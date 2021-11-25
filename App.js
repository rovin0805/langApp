import React from "react";
import { Animated, TouchableOpacity } from "react-native";
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

// styled(Animdated.createAnimatedComponent(TouchableOpacity))
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const Y = new Animated.Value(0);
  // Y.addListener(() => console.log(Y));

  const moveBox = () => {
    Animated.timing(Y, {
      toValue: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Container>
      <TouchableOpacity onPress={moveBox}>
        <AnimatedBox
          style={{
            transform: [{ translateY: Y }],
          }}
        />
      </TouchableOpacity>
    </Container>
  );
}
