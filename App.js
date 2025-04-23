import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// FAKE PLAN DATA
const plans = [
  {
    company: 'AXA',
    price: '$45',
    coverage: '$200,000',
    benefits: ['Trip cancellation', 'Baggage', 'COVID-19'],
  },
  {
    company: 'Turismo Seguro',
    price: '$38',
    coverage: '$150,000',
    benefits: ['Trip cancellation', 'Baggage'],
  },
  {
    company: 'SecurViajes',
    price: '$52',
    coverage: '$300,000',
    benefits: ['Emergency return', 'Baggage loss', 'Trip interruption'],
  },
];

// SCREEN 1: Welcome
function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>briki</Text>
      <Text style={styles.checkmark}>✔︎</Text>
      <Text style={styles.subtitle}>Travel Insurance in 2 Minutes</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Form')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

// SCREEN 2: Travel Form
function FormScreen({ navigation }) {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.title}>Your Trip Info</Text>
      <TextInput style={styles.input} placeholder="Fly from..." placeholderTextColor="#999" value={destination} onChangeText={setDestination} />
      <TextInput style={styles.input} placeholder="Start date (YYYY-MM-DD)" placeholderTextColor="#999" value={startDate} onChangeText={setStartDate} />
      <TextInput style={styles.input} placeholder="End date (YYYY-MM-DD)" placeholderTextColor="#999" value={endDate} onChangeText={setEndDate} />
      <TextInput style={styles.input} placeholder="Your age" placeholderTextColor="#999" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Your email" placeholderTextColor="#999" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Plans')}>
        <Text style={styles.buttonText}>See Plans</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// SCREEN 3: Plan List
function PlanListScreen({ navigation }) {
  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.title}>Recommended Plans</Text>
      {plans.map((plan, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.company}>{plan.company}</Text>
          <Text style={styles.price}>{plan.price}</Text>
          <Text style={styles.coverage}>Coverage: {plan.coverage}</Text>
          {plan.benefits.map((b, j) => (
            <Text key={j} style={styles.bullet}>• {b}</Text>
          ))}
          <TouchableOpacity style={styles.buttonSmall} onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

// SCREEN 4: Checkout
function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're all set!</Text>
      <Text style={styles.subtitle}>Your insurance will be sent to your email.</Text>
      <Text style={{ fontSize: 80, marginTop: 30 }}>✓</Text>
    </View>
  );
}

// APP ROOT
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="Plans" component={PlanListScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6eb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#fff6eb',
    padding: 24,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  checkmark: {
    fontSize: 26,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#222',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonSmall: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  company: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
  },
  coverage: {
    marginTop: 4,
    marginBottom: 4,
    color: '#444',
  },
  bullet: {
    color: '#555',
    fontSize: 14,
  },
});