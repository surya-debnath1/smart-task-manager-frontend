import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types/task';
import StatusBadge from './StatusBadge';

interface Props {
  task: Task;
  onToggleStatus: (task: Task) => void;
  onDelete: (id: string) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function TaskCard({
  task,
  onToggleStatus,
  onDelete,
}: Props) {
  const created = formatDate(task.createdAt);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{task.title}</Text>
          {task.description ? (
            <Text style={styles.description}>{task.description}</Text>
          ) : null}
        </View>

        <TouchableOpacity onPress={() => onToggleStatus(task)}>
          <StatusBadge status={task.status} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.timestampContainer}>
          <Text style={styles.timestampText}>
            Created: {created}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(task._id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  bottomRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  timestampContainer: {
    flex: 1,
  },
  timestampText: {
    fontSize: 11,
    color: '#888',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});