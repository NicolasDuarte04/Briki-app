import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const selectedPlan = {
    company: 'AXA',
    price: '$45',
    coverage: '$200,000',
    benefits: ['Trip cancellation', 'Baggage', 'COVID-19'],
  };

  const handlePurchase = () => {
    alert('Insurance purchased! A confirmation email will be sent.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <View style={styles.planBox}>
        <Text style={styles.planCompany}>{selectedPlan.company}</Text>
        <Text style={styles.planPrice}>{selectedPlan.price}</Text>
        <Text>Coverage: {selectedPlan.coverage}</Text>
        {selectedPlan.benefits.map((b, i) => (
          <Text key={i} style={styles.benefit}>• {b}</Text>
        ))}
      </View>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handlePurchase}>
        <Text style={styles.buttonText}>Buy Insurance Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff6eb',
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  planBox: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 10,
    marginBottom: 24,
    elevation: 2,
  },
  planCompany: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  planPrice: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 6,
  },
  benefit: {
    color: '#444',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});