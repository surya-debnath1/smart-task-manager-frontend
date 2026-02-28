import { useState, useCallback, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';

import { getTasks, updateTask, deleteTask } from '../src/services/taskService';
import { Task } from '../src/types/task';

import Header from '../src/components/Header';
import SearchBar from '../src/components/SearchBar';
import FilterBar from '../src/components/FilterBar';
import TaskCard from '../src/components/TaskCard';
import FloatingButton from '../src/components/FloatingButton';

const ACCENT = '#007bff';

type FilterType = 'All' | 'Pending' | 'In Progress' | 'Completed';

export default function TasksScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!user) {
      setTasks([]);
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setTasks([]);
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (task: Task) => {
    let newStatus: Task['status'];

    if (task.status === 'Pending') newStatus = 'In Progress';
    else if (task.status === 'In Progress') newStatus = 'Completed';
    else newStatus = 'Pending';

    try {
      const updated = await updateTask(task._id, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? updated : t))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks
    .filter((task) =>
      filter === 'All' ? true : task.status === filter
    )
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={ACCENT} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="My Tasks"
        rightIcon="👤"
        onRightPress={() => router.push('/profile')}
      />

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search tasks..."
      />

      <FilterBar
        selected={filter}
        onSelect={setFilter}
        accentColor={ACCENT}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggleStatus={handleStatusToggle}
            onDelete={handleDelete}
          />
        )}
      />

      <FloatingButton
        onPress={() => router.push('/create-task')}
        color={ACCENT}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});