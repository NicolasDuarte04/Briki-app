import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Alert, Switch, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
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
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>briki</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TripInfo')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity><Text style={styles.link}>Forgot password?</Text></TouchableOpacity>
      <TouchableOpacity><Text style={styles.link}>Create new account</Text></TouchableOpacity>
    </SafeAreaView>
  );
}
function TripInfoScreen({ navigation }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [age, setAge] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const handleContinue = () => {
    if (!from || !to || !age || !startDate || !endDate) {
      Alert.alert("Please complete all fields before continuing.");
    } else {
      navigation.navigate('Plans');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.title}>Trip Info</Text>

        <Text style={styles.label}>From:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={from} onValueChange={setFrom}>
            <Picker.Item label="Select origin..." value="" />
            <Picker.Item label="Bogotá" value="Bogotá" />
            <Picker.Item label="CDMX" value="CDMX" />
          </Picker>
        </View>

        <Text style={styles.label}>To:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={to} onValueChange={setTo}>
            <Picker.Item label="Select destination..." value="" />
            <Picker.Item label="New York" value="New York" />
            <Picker.Item label="Madrid" value="Madrid" />
          </Picker>
        </View>

        <Text style={styles.label}>Start Date:</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowStart(true)}>
          <Text>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStart && (
          <DateTimePicker value={startDate} mode="date" display="default"
            onChange={(e, selected) => { setShowStart(false); if (selected) setStartDate(selected); }}
          />
        )}

        <Text style={styles.label}>End Date:</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowEnd(true)}>
          <Text>{endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEnd && (
          <DateTimePicker value={endDate} mode="date" display="default"
            onChange={(e, selected) => { setShowEnd(false); if (selected) setEndDate(selected); }}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Your age"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>See Plans</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
function PlansScreen({ navigation }) {
  const [compare, setCompare] = useState(false);

  const plans = [
    {
      name: 'AXA',
      price: '$45',
      coverage: '$200,000',
      perks: ['Trip cancellation', 'COVID-19', 'Baggage loss'],
    },
    {
      name: 'Turismo Seguro',
      price: '$38',
      coverage: '$150,000',
      perks: ['Medical expenses', 'Lost baggage'],
    },
    {
      name: 'SecurViajes',
      price: '$52',
      coverage: '$300,000',
      perks: ['Emergency return', 'Full trip protection'],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recommended Plans</Text>

      <View style={styles.compareToggle}>
        <Text style={styles.label}>Compare Plans</Text>
        <Switch value={compare} onValueChange={setCompare} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        {compare ? (
          <View style={styles.compareContainer}>
            {plans.map((plan, index) => (
              <View key={index} style={styles.compareCard}>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text>{plan.price}</Text>
                <Text>{plan.coverage}</Text>
                {plan.perks.map((perk, idx) => (
                  <Text key={idx} style={styles.bullet}>• {perk}</Text>
                ))}
              </View>
            ))}
          </View>
        ) : (
          plans.map((plan, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.planName}>{plan.name}</Text>
              <Text>{plan.price}</Text>
              <Text>{plan.coverage}</Text>
              {plan.perks.map((perk, idx) => (
                <Text key={idx} style={styles.bullet}>• {perk}</Text>
              ))}
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Checkout')}>
                <Text style={styles.buttonText}>Select</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
function CheckoutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text>Your Stripe integration will be added here.</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm & Pay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdf5',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    alignItems: 'center',
  },
  form: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#444',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#222',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 6,
    fontWeight: '500',
    fontSize: 15,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
    maxWidth: 360,
    alignSelf: 'center',
    fontSize: 16,
    color: '#000',
  },
  pickerContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
    maxWidth: 360,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '90%',
    maxWidth: 360,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    maxWidth: 360,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 5,
  },
  bullet: {
    color: '#444',
    fontSize: 14,
    marginBottom: 2,
  },
  compareToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  compareContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  compareCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    width: 120,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  link: {
    marginTop: 10,
    color: '#007AFF',
  },
});