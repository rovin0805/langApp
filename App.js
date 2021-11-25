import React, { useRef, useState } from "react";
import { Animated, Easing, TouchableOpacity } from "react-native";
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
  const [up, setUp] = useState(true);
  const Y = useRef(new Animated.Value(0)).current; // maintaining current value from re-rendering
  // Y.addListener(() => console.log(Y));

  const toggleUp = () => setUp((prev) => !prev);

  const moveBox = () => {
    Animated.timing(Y, {
      toValue: up ? -200 : 200,
      useNativeDriver: true,
      easing: Easing.elastic(2),
    }).start(toggleUp);
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
