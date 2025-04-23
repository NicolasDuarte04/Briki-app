import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';

const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>briki</Text>
      <Text style={styles.subtitle}>Login to your account</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#555" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#555" value={password} onChangeText={setPassword} secureTextEntry />
      <View style={styles.checkboxRow}>
        <Text>☐ Remember me</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TripInfo')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.link}>Forgot password?</Text>
      <Text style={styles.link}>Create new account</Text>
      <Text style={{ marginTop: 20 }}>Or sign in with</Text>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const TripInfoScreen = ({ navigation }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = () => {
    if (!from || !to || !age) {
      Alert.alert('Missing info', 'Please complete all required fields.');
      return;
    }
    navigation.navigate('Plans');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.subtitle}>Trip Info</Text>
        <Text style={styles.label}>From:</Text>
        <TextInput style={styles.input} placeholder="Enter country or city" value={from} onChangeText={setFrom} />
        <Text style={styles.label}>To:</Text>
        <TextInput style={styles.input} placeholder="Enter destination" value={to} onChangeText={setTo} />
        <Text style={styles.label}>Start Date:</Text>
        <DateTimePicker value={startDate} mode="date" display="default" onChange={(e, date) => date && setStartDate(date)} />
        <Text style={styles.label}>End Date:</Text>
        <DateTimePicker value={endDate} mode="date" display="default" onChange={(e, date) => date && setEndDate(date)} />
        <TextInput style={styles.input} placeholder="Your age" keyboardType="numeric" value={age} onChangeText={setAge} />
        <TextInput style={styles.input} placeholder="Optional email for confirmation" value={email} onChangeText={setEmail} />
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>See Plans</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const PlansScreen = ({ navigation }) => {
  const plans = [
    { provider: 'AXA', price: 45, features: ['Trip cancellation', 'Baggage', 'COVID-19'] },
    { provider: 'Turismo Seguro', price: 38, features: ['Trip cancellation', 'Baggage'] },
    { provider: 'SecurViajes', price: 52, features: ['Emergency return', 'Trip interruption'] },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.subtitle}>Recommended Plans</Text>
        {plans.map((plan, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{plan.provider}</Text>
            <Text style={styles.cardPrice}>${plan.price}</Text>
            {plan.features.map((feature, i) => (
              <Text key={i}>• {feature}</Text>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Checkout')}>
              <Text style={styles.buttonText}>Select</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const CheckoutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitle}>Checkout</Text>
      <Text style={{ marginVertical: 10 }}>Stripe integration will go here.</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm and Pay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TripInfo" component={TripInfoScreen} />
        <Stack.Screen name="Plans" component={PlansScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fffaf0',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
  },
  label: {
    marginBottom: 5,
    marginTop: 10,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007aff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#007aff',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  link: {
    color: '#007aff',
    marginTop: 8,
  },
  socialButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  socialText: {
    color: '#fff',
    textAlign: 'center',
  },
});