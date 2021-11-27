import React, { useRef, useState } from "react";
import { Animated, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const BLACK_COLOR = "#1e272e";
const GREY = "#485460";
const GREEN = "#2ecc71";
const RED = "#e74c3c";

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${GREY};
  border-radius: 50px;
`;

const Word = styled.Text`
  font-weight: 500;
  color: ${(props) => props.color};
  font-size: 38px;
`;

const Center = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const IconCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
  z-index: 10;
`;

export default function App() {
  // State

  // Animation Values
  const iconScale = useRef(new Animated.Value(1)).current;
  const iconPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const greenWordScale = iconPosition.y.interpolate({
    inputRange: [-300, -80],
    outputRange: [2, 1],
    extrapolate: "clamp",
  });
  const redWordScale = iconPosition.y.interpolate({
    inputRange: [80, 300],
    outputRange: [1, 2],
    extrapolate: "clamp",
  });

  // Animdation func
  const onPressIn = Animated.spring(iconScale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(iconScale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goBackCenter = Animated.spring(iconPosition, {
    toValue: 0,
    useNativeDriver: true,
  });

  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderMove: (_, { dx, dy }) => {
        iconPosition.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: () => {
        Animated.parallel([onPressOut, goBackCenter]).start();
      },
    })
  ).current;

  return (
    <Container>
      <Edge>
        <WordContainer style={{ transform: [{ scale: greenWordScale }] }}>
          <Word color={GREEN}>know</Word>
        </WordContainer>
      </Edge>
      <Center>
        <IconCard
          {...panResponder.panHandlers}
          style={{
            transform: [
              ...iconPosition.getTranslateTransform(),
              { scale: iconScale },
            ],
          }}
        >
          <Ionicons name="beer" color={GREY} size={76} />
        </IconCard>
      </Center>
      <Edge>
        <WordContainer style={{ transform: [{ scale: redWordScale }] }}>
          <Word color={RED}>don't know</Word>
        </WordContainer>
      </Edge>
    </Container>
  );
}
