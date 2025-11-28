import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../types/navigation';

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootTabParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();

  const handleNavigateToLogin = () => {
    navigation.navigate('Login', { redirectTo: 'Home' });
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register', { email: 'exemplo@fiap.com.br' });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao App!</Text>
        {route.params?.user && (
          <Text style={styles.welcomeText}>Olá, {route.params.user}!</Text>
        )}
        {route.params?.message && (
          <Text style={styles.messageText}>{route.params.message}</Text>
        )}
        <Text style={styles.subtitle}>
          Este é um exemplo de Tab Navigator para demonstração em aula
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Funcionalidades Demonstradas:</Text>
          <Text style={styles.cardText}>• Navegação entre tabs</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNavigateToLogin}>
          <Text style={styles.buttonText}>Ir para Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleNavigateToRegister}>
          <Text style={styles.buttonText}>Ir para Cadastro</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#1e3a8a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1e3a8a',
    alignItems: 'center',
  },
  alertButtonText: {
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
