import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const plans = [
  {
    company: 'AXA',
    price: '$45',
    coverage: '$200,000',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Logo_AXA.svg/1200px-Logo_AXA.svg.png',
    benefits: ['Trip cancellation', 'Baggage', 'COVID-19'],
  },
  {
    company: 'Turismo Seguro',
    price: '$38',
    coverage: '$150,000',
    logo: 'https://via.placeholder.com/60x30.png?text=Turismo',
    benefits: ['Trip cancellation', 'Baggage'],
  },
  {
    company: 'SecurViajes',
    price: '$52',
    coverage: '$300,000',
    logo: 'https://via.placeholder.com/60x30.png?text=SecurViajes',
    benefits: ['Emergency return', 'Trip interruption'],
  },
];

function BrikiLogo() {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>br</Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.checkmark}>✓</Text>
        <Text style={styles.logoText}>iki</Text>
      </View>
    </View>
  );
}

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <BrikiLogo />
      <Text style={styles.subtitle}>Insurance in 2 minutes</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Form')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

function FormScreen({ navigation }) {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.title}>Your Trip Info</Text>

      <TextInput
        style={styles.input}
        placeholder="Fly from..."
        placeholderTextColor="#999"
        value={destination}
        onChangeText={setDestination}
      />

      <TouchableOpacity onPress={() => setShowStartPicker(true)}>
        <Text style={styles.inputLabel}>Start Date: {startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(e, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowEndPicker(true)}>
        <Text style={styles.inputLabel}>End Date: {endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(e, date) => {
            setShowEndPicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Your age"
        placeholderTextColor="#999"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Your email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Plans')}>
        <Text style={styles.buttonText}>See Plans</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function PlanListScreen({ navigation }) {
  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.title}>Recommended Plans</Text>
      {plans.map((plan, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.logoRow}>
            <Image source={{ uri: plan.logo }} style={styles.logoImg} />
            <Text style={styles.company}>{plan.company}</Text>
          </View>
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

function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're all set!</Text>
      <Text style={styles.subtitle}>Your policy will be sent to your email.</Text>
      <Text style={{ fontSize: 80, marginTop: 30 }}>✓</Text>
    </View>
  );
}

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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 5,
  },
  logoText: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  checkmark: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: -10,
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
  inputLabel: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#333',
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
    marginLeft: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImg: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
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