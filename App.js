import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, SafeAreaView, Alert, Switch, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
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
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>briki</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <View style={styles.formGroup}>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#666" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#666" />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TripInfo')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
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
    if (!from || !to || !age) {
      Alert.alert("Please complete all fields.");
      return;
    }
    navigation.navigate('Plans');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Trip Info</Text>

        <Text style={styles.label}>From:</Text>
        <Picker style={styles.picker} selectedValue={from} onValueChange={setFrom}>
          <Picker.Item label="Select city..." value="" />
          <Picker.Item label="Bogotá" value="Bogotá" />
          <Picker.Item label="CDMX" value="CDMX" />
        </Picker>

        <Text style={styles.label}>To:</Text>
        <Picker style={styles.picker} selectedValue={to} onValueChange={setTo}>
          <Picker.Item label="Select city..." value="" />
          <Picker.Item label="NYC" value="NYC" />
          <Picker.Item label="Madrid" value="Madrid" />
        </Picker>

        <TextInput style={styles.input} placeholder="Your age" keyboardType="numeric" value={age} onChangeText={setAge} />

        <TouchableOpacity style={styles.input} onPress={() => setShowStart(true)}>
          <Text>Start Date: {startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStart && (
          <DateTimePicker value={startDate} mode="date" display="default"
            onChange={(_, d) => { setShowStart(false); if (d) setStartDate(d); }}
          />
        )}

        <TouchableOpacity style={styles.input} onPress={() => setShowEnd(true)}>
          <Text>End Date: {endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEnd && (
          <DateTimePicker value={endDate} mode="date" display="default"
            onChange={(_, d) => { setShowEnd(false); if (d) setEndDate(d); }}
          />
        )}

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
      company: 'AXA',
      price: '$45',
      coverage: '$200K',
      features: ['Trip cancellation', 'COVID-19', 'Baggage loss'],
    },
    {
      company: 'Turismo Seguro',
      price: '$38',
      coverage: '$150K',
      features: ['Baggage', 'Medical'],
    },
    {
      company: 'SecurViajes',
      price: '$52',
      coverage: '$300K',
      features: ['Full coverage', 'Emergency return'],
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Plans</Text>

      <View style={styles.compareToggle}>
        <Text>Compare Plans</Text>
        <Switch value={compare} onValueChange={setCompare} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {compare ? (
          <View style={styles.compareContainer}>
            {plans.map((p, i) => (
              <View key={i} style={styles.compareCard}>
                <Text style={styles.planTitle}>{p.company}</Text>
                <Text>{p.price}</Text>
                <Text>{p.coverage}</Text>
                {p.features.map((f, j) => (
                  <Text key={j} style={styles.bullet}>• {f}</Text>
                ))}
              </View>
            ))}
          </View>
        ) : (
          plans.map((p, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.planTitle}>{p.company}</Text>
              <Text>{p.price}</Text>
              <Text>{p.coverage}</Text>
              {p.features.map((f, j) => (
                <Text key={j} style={styles.bullet}>• {f}</Text>
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
      <Text>Stripe integration will go here.</Text>
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
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  logo: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    alignSelf: 'flex-start',
    marginLeft: 15,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
    maxWidth: 360,
    alignSelf: 'center',
  },
  picker: {
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
  planTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 5,
  },
  bullet: {
    color: '#444',
    marginBottom: 2,
  },
  compareToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  compareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    flexWrap: 'wrap',
  },
  compareCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    width: 110,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  formGroup: {
    width: '90%',
    maxWidth: 360,
    alignSelf: 'center',
    marginBottom: 20,
  },
});