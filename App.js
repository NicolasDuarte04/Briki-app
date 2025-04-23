import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// SCREEN 1 — Welcome
function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>briki</Text>
      <Text style={styles.subtitle}>Buy travel insurance in under 2 minutes</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TripForm')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

// SCREEN 2 — Trip Details Form
function TripFormScreen({ navigation }) {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>briki</Text>
      <Text style={styles.subtitle}>Travel Details</Text>

      <TextInput placeholder="Destination" style={styles.input} value={destination} onChangeText={setDestination} />
      <TextInput placeholder="Start Date (YYYY-MM-DD)" style={styles.input} value={startDate} onChangeText={setStartDate} />
      <TextInput placeholder="End Date (YYYY-MM-DD)" style={styles.input} value={endDate} onChangeText={setEndDate} />
      <TextInput placeholder="Traveler Age" style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PlanList')}>
        <Text style={styles.buttonText}>Show My Options</Text>
      </TouchableOpacity>
    </View>
  );
}

// SCREEN 3 — Plan Comparison
function PlanListScreen({ navigation }) {
  const plans = [
    {
      company: 'AXA',
      price: '$45',
      coverage: '$200,000',
      benefits: ['Trip cancellation', 'Baggage', 'COVID-19'],
    },
    {
      company: 'Turismo',
      price: '$38',
      coverage: '$150,000',
      benefits: ['Trip cancellation', 'Baggage'],
    },
    {
      company: 'Secur',
      price: '$52',
      coverage: '$300,000',
      benefits: ['Trip cancellation', 'Baggage', 'Emergency return'],
    },
  ];

  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.title}>Select a Travel Insurance Plan</Text>
      {plans.map((plan, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.company}>{plan.company}</Text>
          <Text style={styles.price}>{plan.price}</Text>
          <Text>Coverage: {plan.coverage}</Text>
          {plan.benefits.map((b, j) => (
            <Text key={j} style={styles.detail}>• {b}</Text>
          ))}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

// SCREEN 4 — Checkout
function CheckoutScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <View style={styles.card}>
        <Text style={styles.company}>AXA</Text>
        <Text style={styles.price}>$45</Text>
        <Text>Coverage: $200,000</Text>
        <Text>Includes: Trip Cancellation, Baggage, COVID-19</Text>
      </View>

      <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <TouchableOpacity style={styles.button} onPress={() => alert('Insurance purchased!')}>
        <Text style={styles.buttonText}>Buy Insurance Now</Text>
      </TouchableOpacity>
    </View>
  );
}

// APP NAVIGATION
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TripForm" component={TripFormScreen} />
        <Stack.Screen name="PlanList" component={PlanListScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// GLOBAL STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6eb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scroll: {
    backgroundColor: '#fff6eb',
    padding: 20,
    paddingTop: 60,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  company: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 6,
  },
  detail: {
    fontSize: 14,
    color: '#444',
  },
});