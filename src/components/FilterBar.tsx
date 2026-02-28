import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type FilterType = 'All' | 'Pending' | 'In Progress' | 'Completed';

interface Props {
  selected: FilterType;
  onSelect: (value: FilterType) => void;
  accentColor?: string;
}

export default function FilterBar({
  selected,
  onSelect,
  accentColor = '#6C63FF',
}: Props) {
  const filters: FilterType[] = [
    'All',
    'Pending',
    'In Progress',
    'Completed',
  ];

  return (
    <View style={styles.container}>
      {filters.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.button,
            { borderColor: accentColor },
            selected === item && { backgroundColor: accentColor },
          ]}
          onPress={() => onSelect(item)}
        >
          <Text
            style={[
              styles.text,
              { color: selected === item ? '#fff' : accentColor },
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});