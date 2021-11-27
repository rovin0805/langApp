import React, { useRef, useState } from "react";
import { Animated, PanResponder, View, Easing } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import icons from "./icons";

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
  font-size: 20px;
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
  // Animation Values
  const iconScale = useRef(new Animated.Value(1)).current;
  const iconPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const iconOpacity = useRef(new Animated.Value(1)).current;
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

  // State
  const [iconIndex, setIconIndex] = useState(0);
  const showNextIcon = () => {
    setIconIndex((prev) => prev + 1);
    Animated.parallel([
      Animated.spring(iconScale, { toValue: 1, useNativeDriver: true }),
      Animated.spring(iconOpacity, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

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
  const onDropScale = Animated.timing(iconScale, {
    toValue: 0,
    useNativeDriver: true,
    duration: 50,
    easing: Easing.linear,
  });
  const onDropOpacity = Animated.timing(iconOpacity, {
    toValue: 0,
    useNativeDriver: true,
    easing: Easing.linear,
    duration: 50,
  });
  const onDropPosition = Animated.timing(iconPosition, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
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
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -250 || dy > 250) {
          Animated.sequence([
            Animated.parallel([onDropScale, onDropOpacity]),
            onDropPosition,
          ]).start(showNextIcon);
        } else {
          Animated.parallel([onPressOut, goBackCenter]).start();
        }
      },
    })
  ).current;

  return (
    <Container>
      <Edge>
        <WordContainer style={{ transform: [{ scale: greenWordScale }] }}>
          <Word color={GREEN}>I know</Word>
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
            opacity: iconOpacity,
          }}
        >
          <Ionicons name={icons[iconIndex]} color={GREY} size={76} />
        </IconCard>
      </Center>
      <Edge>
        <WordContainer style={{ transform: [{ scale: redWordScale }] }}>
          <Word color={RED}>I don't know</Word>
        </WordContainer>
      </Edge>
    </Container>
  );
}
