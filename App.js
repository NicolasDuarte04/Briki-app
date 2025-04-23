import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert, Picker } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>briki</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#333" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#333" />
      
      <View style={styles.rememberContainer}>
        <Text style={styles.rememberText}>☐ Remember me</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TripInfo')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.link}>Create new account</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or sign in with</Text>
      <TouchableOpacity style={styles.socialButton}><Text style={styles.socialText}>Continue with Google</Text></TouchableOpacity>
      <TouchableOpacity style={styles.socialButton}><Text style={styles.socialText}>Continue with Apple</Text></TouchableOpacity>
    </SafeAreaView>
  );
};

const TripInfoScreen = ({ navigation }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [startDate, setStartDate] = useState('Wed Apr 23 2025');
  const [endDate, setEndDate] = useState('Wed Apr 23 2025');
  const [age, setAge] = useState('');

  const handleSubmit = () => {
    if (!from || !to || !startDate || !endDate || !age) {
      Alert.alert('Please complete all fields before proceeding.');
      return;
    }
    navigation.navigate('Plans');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Trip Info</Text>

      <Text style={styles.label}>From:</Text>
      <TextInput style={styles.input} placeholder="Enter country or city" placeholderTextColor="#333" value={from} onChangeText={setFrom} />

      <Text style={styles.label}>To:</Text>
      <TextInput style={styles.input} placeholder="Enter destination" placeholderTextColor="#333" value={to} onChangeText={setTo} />

      <Text style={styles.label}>Start Date:</Text>
      <TextInput style={styles.input} value={startDate} editable={false} />

      <Text style={styles.label}>End Date:</Text>
      <TextInput style={styles.input} value={endDate} editable={false} />

      <TextInput style={styles.input} placeholder="Your age" placeholderTextColor="#333" keyboardType="numeric" value={age} onChangeText={setAge} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>See Plans</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const PlansScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Recommended Plans</Text>
      <ScrollView>
        {[
          { company: 'AXA', price: '$45', coverage: '$200,000', features: ['Trip cancellation', 'Baggage', 'COVID-19'] },
          { company: 'Turismo Seguro', price: '$38', coverage: '$150,000', features: ['Trip cancellation', 'Baggage'] },
          { company: 'SecurViajes', price: '$52', coverage: '$300,000', features: ['Emergency return', 'Trip interruption'] }
        ].map((plan, idx) => (
          <View key={idx} style={styles.planCard}>
            <Text style={styles.planTitle}>{plan.company}</Text>
            <Text style={styles.planPrice}>{plan.price}</Text>
            <Text style={styles.planCoverage}>Coverage: {plan.coverage}</Text>
            {plan.features.map((feature, fidx) => (
              <Text key={fidx}>• {feature}</Text>
            ))}
            <TouchableOpacity style={styles.selectButton} onPress={() => navigation.navigate('Checkout')}>
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
      <Text style={styles.header}>Checkout</Text>
      <Text>Stripe integration will go here.</Text>
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
    backgroundColor: '#fffcef',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 60,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#eee',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007aff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    color: '#007aff',
    textAlign: 'center',
    marginTop: 8,
  },
  socialButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  socialText: {
    color: '#fff',
    textAlign: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginBottom: 4,
    marginTop: 12,
    fontWeight: '500',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rememberText: {
    color: '#333',
    marginLeft: 6,
  },
  orText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007aff',
  },
  planPrice: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  planCoverage: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  selectButton: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  }
});