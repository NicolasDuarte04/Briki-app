import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  const plans = [
    {
      company: 'AXA',
      price: '$45',
      coverage: '$200,000',
      includes: ['Trip cancellation', 'Baggage', 'COVID-19'],
    },
    {
      company: 'Turismo',
      price: '$38',
      coverage: '$150,000',
      includes: ['Trip cancellation', 'Baggage'],
    },
    {
      company: 'Secur',
      price: '$52',
      coverage: '$300,000',
      includes: ['Trip cancellation', 'Baggage', 'Emergency return'],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select a Travel Insurance Plan</Text>

      {plans.map((plan, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.company}>{plan.company}</Text>
          <Text style={styles.price}>{plan.price}</Text>
          <Text style={styles.coverage}>Coverage: {plan.coverage}</Text>
          {plan.includes.map((item, i) => (
            <Text key={i} style={styles.detail}>• {item}</Text>
          ))}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff6eb',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    marginBottom: 8,
  },
  coverage: {
    fontSize: 16,
    marginBottom: 6,
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});