import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>briki</Text>
      <Text style={styles.subtitle}>Travel Details</Text>

      <TextInput
        placeholder="Enter destination"
        style={styles.input}
        value={destination}
        onChangeText={setDestination}
      />
      <TextInput
        placeholder="Start date (YYYY-MM-DD)"
        style={styles.input}
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        placeholder="End date (YYYY-MM-DD)"
        style={styles.input}
        value={endDate}
        onChangeText={setEndDate}
      />
      <TextInput
        placeholder="Traveler's age"
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Show My Options</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6eb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});