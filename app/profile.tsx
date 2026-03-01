import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import Header from '../src/components/Header';

const ACCENT = '#007bff';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const firstLetter = user?.name?.charAt(0).toUpperCase() || '?';

  const handleLogout = async () => {
    const confirmLogout =
      typeof window !== 'undefined'
        ? window.confirm('Are you sure you want to logout?')
        : true;

    if (!confirmLogout) return;

    await logout();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" />

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>

        {user && (
          <>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </>
        )}
      </View>

      {user ? (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Smart Task Manager</Text>
        <Text style={styles.footerSubText}>
          Built with React Native + Express
        </Text>
        <Text style={styles.footerSubText}>Version 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: ACCENT,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: '#dc3545',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: ACCENT,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontWeight: '600',
  },
  footerSubText: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
});