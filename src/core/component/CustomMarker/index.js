import React, {useEffect, useRef} from 'react';
import {View, Text, Image, Animated} from 'react-native';
import style from './style';

const CustomMarker = ({text, imgSrc, markerStyle, headerText}) => {
  const scale = useRef(new Animated.Value(0)).current; // For scaling the circle
  const opacity = useRef(new Animated.Value(1)).current; // For fading the circle
  const isHeader = headerText.length !== 0;

  useEffect(() => {
    // Infinite ripple animation
    const rippleAnimation = Animated.loop(
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.5, // Scale factor
          duration: 1500, // Duration of one ripple
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0, // Fade out
          duration: 1500, // Duration of fade-out
          useNativeDriver: true,
        }),
      ]),
    );

    rippleAnimation.start();

    // Cleanup animation on unmount
    return () => rippleAnimation.stop();
  }, [scale, opacity]);

  return (
    <View style={style.currentLocation}>
      {/* Ripple effect */}
      <Animated.View
        style={[
          style.ripple,
          {
            transform: [{scale}],
            opacity,
          },
        ]}
      />
      {/* Marker */}
      <Image style={[style.img, markerStyle]} source={imgSrc} />
      {/* Optional Header */}
      {isHeader && <Text style={style.headerText}>{headerText}</Text>}
    </View>
  );
};

export default CustomMarker;
