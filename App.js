import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Image, Platform, CheckBox
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Placeholder logos (replace with actual paths if needed)
const insuranceLogos = {
  AXA: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Logo_AXA.svg/1200px-Logo_AXA.svg.png',
  Turismo: 'https://via.placeholder.com/60x30.png?text=Turismo',
  SecurViajes: 'https://via.placeholder.com/60x30.png?text=SecurViajes',
};

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>briki<Text style={styles.check}>✓</Text></Text>
      <Text style={styles.subtitle}>Insurance in 2 minutes</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <View style={styles.checkboxRow}>
        <CheckBox value={remember} onValueChange={setRemember} />
        <Text> Remember me</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Form')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.link}>Sign in with Google / Apple (placeholder)</Text>
      <Text style={styles.link}>Forgot password?</Text>
      <Text style={styles.link}>Create account</Text>
    </View>
  );
}

function FormScreen({ navigation }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [currency, setCurrency] = useState('USD');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Trip</Text>

      <Picker selectedValue={origin} onValueChange={(v) => setOrigin(v)} style={styles.picker}>
        <Picker.Item label="Fly from..." value="" />
        <Picker.Item label="Bogotá" value="Bogotá" />
        <Picker.Item label="Mexico City" value="CDMX" />
      </Picker>

      <Picker selectedValue={destination} onValueChange={(v) => setDestination(v)} style={styles.picker}>
        <Picker.Item label="Fly to..." value="" />
        <Picker.Item label="NYC" value="NYC" />
        <Picker.Item label="Madrid" value="Madrid" />
      </Picker>

      <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
        <Text>Start: {startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker value={startDate} mode="date" onChange={(_, d) => { setShowStartPicker(false); if (d) setStartDate(d); }} />
      )}

      <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
        <Text>End: {endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker value={endDate} mode="date" onChange={(_, d) => { setShowEndPicker(false); if (d) setEndDate(d); }} />
      )}

      <TextInput style={styles.input} placeholder="Your age" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Your email" value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Picker selectedValue={currency} onValueChange={(v) => setCurrency(v)} style={styles.picker}>
        <Picker.Item label="USD $" value="USD" />
        <Picker.Item label="EUR €" value="EUR" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Plans')}>
        <Text style={styles.buttonText}>See Plans</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
function PlansScreen({ navigation }) {
  const plans = [
    {
      company: 'AXA',
      logo: insuranceLogos.AXA,
      price: 45,
      coverage: '$200,000',
      details: ['Trip cancellation', 'COVID-19', 'Luggage loss'],
    },
    {
      company: 'Turismo',
      logo: insuranceLogos.Turismo,
      price: 35,
      coverage: '$150,000',
      details: ['Trip interruption', 'Medical care'],
    },
    {
      company: 'SecurViajes',
      logo: insuranceLogos.SecurViajes,
      price: 52,
      coverage: '$300,000',
      details: ['Emergency return', 'Premium support'],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recommended Plans</Text>
      {plans.map((p, i) => (
        <View key={i} style={styles.card}>
          <Image source={{ uri: p.logo }} style={styles.logoImg} />
          <Text style={styles.cardTitle}>{p.company}</Text>
          <Text style={styles.coverage}>Coverage: {p.coverage}</Text>
          {p.details.map((d, j) => (
            <Text key={j} style={styles.detail}>• {d}</Text>
          ))}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Payment')}>
            <Text style={styles.buttonText}>Select - ${p.price}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

function PaymentScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Payment</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Confirmation')}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

function ConfirmationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're all set!</Text>
      <Text style={styles.subtitle}>A confirmation has been sent to your email.</Text>
      <Text style={{ fontSize: 60, marginTop: 40 }}>✓</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Account</Text>
      <Text>Name: Juan Traveler</Text>
      <Text>Email: juan@example.com</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Need Help?</Text>
      <Text style={styles.subtitle}>Chatbot assistant coming soon...</Text>
      <Text>Contact: support@briki.com</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="Plans" component={PlansScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#fff6eb',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#000',
  },
  check: {
    color: '#007AFF',
    fontSize: 24,
    position: 'absolute',
    top: -6,
    right: -10,
  },
  subtitle: {
    marginBottom: 20,
    color: '#333',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  picker: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  dateButton: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    color: '#007AFF',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#ccc',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  logoImg: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#007AFF',
  },
  coverage: {
    color: '#444',
  },
  detail: {
    color: '#666',
    fontSize: 14,
  },
});