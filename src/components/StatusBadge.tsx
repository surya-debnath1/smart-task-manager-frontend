import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  status: 'Pending' | 'In Progress' | 'Completed';
}

export default function StatusBadge({ status }: Props) {
  const getBackgroundColor = () => {
    switch (status) {
      case 'Completed':
        return '#28a745';
      case 'In Progress':
        return '#ff9800';
      default:
        return '#6c757d';
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});