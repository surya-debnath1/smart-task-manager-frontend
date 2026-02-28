import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { createTask } from '../src/services/taskService';
import { useAuth } from '../src/context/AuthContext';

const ACCENT = '#007bff';

export default function CreateTaskScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] =
    useState<'Pending' | 'In Progress' | 'Completed'>('Pending');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) return null;

  const handleCreate = async () => {
    if (!title) {
      Alert.alert('Error', 'Task title is required');
      return;
    }

    try {
      setLoading(true);
      await createTask({ title, description, status });
      router.replace('/tasks');
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Could not create task'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Task</Text>

      <TextInput
        placeholder="Task Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Description"
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.statusContainer}>
        {['Pending', 'In Progress', 'Completed'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.statusButton,
              status === item && styles.activeStatus,
            ]}
            onPress={() =>
              setStatus(item as 'Pending' | 'In Progress' | 'Completed')
            }
          >
            <Text
              style={[
                styles.statusText,
                status === item && styles.activeStatusText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createText}>
          {loading ? 'Creating...' : 'Create Task'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statusButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ACCENT,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeStatus: {
    backgroundColor: ACCENT,
  },
  activeStatusText: {
    color: '#fff',
  },
  statusText: {
    color: '#333',
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: ACCENT,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  createText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});