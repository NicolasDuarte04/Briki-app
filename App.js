import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>briki</Text>
      <Text style={styles.subtitle}>Travel Insurance. Instantly.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Form')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

function FormScreen({ navigation }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [age, setAge] = useState('');
  const [optionalEmail, setOptionalEmail] = useState('');

  const validateAndContinue = () => {
    if (!origin || !destination || !age || !startDate || !endDate) {
      Alert.alert("Missing Information", "Please complete all fields before continuing.");
    } else {
      navigation.navigate('Plans', { optionalEmail });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Trip Info</Text>

      <Text style={styles.label}>From:</Text>
      <Picker selectedValue={origin} onValueChange={setOrigin} style={styles.picker}>
        <Picker.Item label="Select country..." value="" />
        <Picker.Item label="Bogotá" value="Bogotá" />
        <Picker.Item label="CDMX" value="CDMX" />
      </Picker>

      <Text style={styles.label}>To:</Text>
      <Picker selectedValue={destination} onValueChange={setDestination} style={styles.picker}>
        <Picker.Item label="Select destination..." value="" />
        <Picker.Item label="NYC" value="NYC" />
        <Picker.Item label="Madrid" value="Madrid" />
      </Picker>

      <TouchableOpacity onPress={() => setShowStart(true)} style={styles.dateInput}>
        <Text>Start Date: {startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStart && <DateTimePicker value={startDate} mode="date" onChange={(_, date) => { setShowStart(false); if (date) setStartDate(date); }} />}

      <TouchableOpacity onPress={() => setShowEnd(true)} style={styles.dateInput}>
        <Text>End Date: {endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEnd && <DateTimePicker value={endDate} mode="date" onChange={(_, date) => { setShowEnd(false); if (date) setEndDate(date); }} />}

      <TextInput style={styles.input} placeholder="Your age" value={age} keyboardType="numeric" onChangeText={setAge} />
      <TextInput style={styles.input} placeholder="Optional email for confirmation" value={optionalEmail} onChangeText={setOptionalEmail} />

      <TouchableOpacity style={styles.button} onPress={validateAndContinue}>
        <Text style={styles.buttonText}>See Plans</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function PlansScreen({ route }) {
  const [compare, setCompare] = useState(false);
  const { optionalEmail } = route.params;

  const plans = [
    { name: "AXA", price: "$45", coverage: "$200k", benefits: ["COVID-19", "Lost Luggage", "Flight Delay"] },
    { name: "Turismo Seguro", price: "$39", coverage: "$150k", benefits: ["Trip Cancellation", "Medical", "Basic Baggage"] },
    { name: "SecurViajes", price: "$52", coverage: "$300k", benefits: ["Full Coverage", "Emergency Return", "VIP Service"] },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recommended Plans</Text>
      <TouchableOpacity onPress={() => setCompare(!compare)}>
        <Text style={styles.link}>{compare ? "Hide Comparison" : "Compare Plans"}</Text>
      </TouchableOpacity>

      {compare ? (
        <View style={styles.compareBox}>
          {plans.map((plan, i) => (
            <View key={i} style={styles.compareCard}>
              <Text style={styles.cardTitle}>{plan.name}</Text>
              <Text>{plan.price}</Text>
              <Text>{plan.coverage}</Text>
              {plan.benefits.map((b, j) => (
                <Text key={j} style={styles.bullet}>• {b}</Text>
              ))}
            </View>
          ))}
        </View>
      ) : (
        plans.map((plan, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardTitle}>{plan.name}</Text>
            <Text>{plan.price}</Text>
            <Text>{plan.coverage}</Text>
            {plan.benefits.map((b, j) => (
              <Text key={j} style={styles.bullet}>• {b}</Text>
            ))}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Select</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="Plans" component={PlansScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#fffdf6',
    alignItems: 'center',
  },
  logo: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  dateInput: {
    backgroundColor: '#fff',
    padding: 12,
    width: '100%',
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  picker: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    marginTop: 10,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#ddd',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#007AFF',
  },
  bullet: {
    color: '#555',
    fontSize: 14,
  },
  compareBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  compareCard: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
  },
  link: {
    color: '#007AFF',
    marginBottom: 16,
  },
});