import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';

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

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>briki</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#666" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#666" />

      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Remember me</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TripInfo')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity><Text style={styles.link}>Forgot password?</Text></TouchableOpacity>
      <TouchableOpacity><Text style={styles.link}>Create new account</Text></TouchableOpacity>

      <Text style={{ marginTop: 20 }}>Or sign in with</Text>

      <TouchableOpacity style={styles.blackButton}><Text style={styles.blackButtonText}>Continue with Google</Text></TouchableOpacity>
      <TouchableOpacity style={styles.blackButton}><Text style={styles.blackButtonText}>Continue with Apple</Text></TouchableOpacity>
    </SafeAreaView>
  );
};

const TripInfoScreen = ({ navigation }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const validate = () => {
    if (!from || !to || !age) {
      Alert.alert("Missing Info", "Please fill all required fields.");
    } else {
      navigation.navigate('Plans');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.header}>Trip Info</Text>

        <Text style={styles.label}>From:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter country or city"
          value={from}
          onChangeText={setFrom}
        />

        <Text style={styles.label}>To:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter destination"
          value={to}
          onChangeText={setTo}
        />

        <Text style={styles.label}>Start Date:</Text>
        <TouchableOpacity onPress={() => setShowStart(true)} style={styles.input}>
          <Text>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStart && (
          <DateTimePicker value={startDate} mode="date" display="default" onChange={(e, date) => {
            setShowStart(false);
            date && setStartDate(date);
          }} />
        )}

        <Text style={styles.label}>End Date:</Text>
        <TouchableOpacity onPress={() => setShowEnd(true)} style={styles.input}>
          <Text>{endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEnd && (
          <DateTimePicker value={endDate} mode="date" display="default" onChange={(e, date) => {
            setShowEnd(false);
            date && setEndDate(date);
          }} />
        )}

        <TextInput
          style={styles.input}
          placeholder="Your age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <TextInput
          style={styles.input}
          placeholder="Optional email for confirmation"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button} onPress={validate}>
          <Text style={styles.buttonText}>See Plans</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const PlansScreen = ({ navigation }) => {
  const [compare, setCompare] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Recommended Plans</Text>

      <View style={styles.toggleContainer}>
        <Text style={{ marginRight: 10 }}>Compare plans</Text>
        <Switch value={compare} onValueChange={setCompare} />
      </View>

      <ScrollView>
        {compare ? (
          <Text style={{ textAlign: 'center', margin: 10 }}>Comparison table view coming soon...</Text>
        ) : (
          <>
            {[
              { name: 'AXA', price: 45, details: ['Trip cancellation', 'Baggage', 'COVID-19'] },
              { name: 'Turismo Seguro', price: 38, details: ['Trip cancellation', 'Baggage'] },
              { name: 'SecurViajes', price: 52, details: ['Emergency return', 'Trip interruption'] },
            ].map((plan, idx) => (
              <View key={idx} style={styles.planCard}>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planPrice}>${plan.price}</Text>
                {plan.details.map((d, i) => <Text key={i}>• {d}</Text>)}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Checkout')}>
                  <Text style={styles.buttonText}>Select</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const CheckoutScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Checkout</Text>
    <Text>Stripe integration will go here.</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Confirm and Pay</Text>
    </TouchableOpacity>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fffdf2',
  },
  form: {
    paddingBottom: 40,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
  },
  label: {
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007aff',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  blackButton: {
    backgroundColor: 'black',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  blackButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  checkboxContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  link: {
    color: '#007aff',
    marginTop: 10,
    textAlign: 'center',
  },
  planCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007aff',
  },
  planPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'center',
  },
});