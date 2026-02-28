import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  title: string;
  rightIcon?: string;
  onRightPress?: () => void;
}

export default function Header({
  title,
  rightIcon,
  onRightPress,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {rightIcon && onRightPress ? (
        <TouchableOpacity onPress={onRightPress}>
          <Text style={styles.icon}>{rightIcon}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 22,
  },
  placeholder: {
    width: 22,
  },
});