import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  Switch
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const cities = ['Bogotá', 'CDMX', 'NYC', 'Madrid'];

export default function App() {
  const [screen, setScreen] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [age, setAge] = useState('');
  const [compare, setCompare] = useState(false);
  const [plans] = useState([
    { name: 'AXA', price: 45, coverage: '$200,000', perks: ['Trip cancellation', 'Baggage', 'COVID-19'] },
    { name: 'Turismo Seguro', price: 38, coverage: '$150,000', perks: ['Trip cancellation', 'Baggage'] },
    { name: 'SecurViajes', price: 52, coverage: '$300,000', perks: ['Emergency return', 'Trip interruption'] },
  ]);

  const goToTripInfo = () => {
    if (!email || !password) return Alert.alert('Please fill out email and password');
    setScreen('trip');
  };

  const viewPlans = () => {
    if (!fromCity || !toCity || !startDate || !endDate || !age) {
      return Alert.alert('Please fill out all fields');
    }
    setScreen('plans');
  };

  const goToCheckout = () => {
    setScreen('checkout');
  };

  const renderPlans = () => (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Recommended Plans</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ marginRight: 10 }}>Compare Plans</Text>
        <Switch value={compare} onValueChange={setCompare} />
      </View>
      {plans.map((plan, idx) => (
        <View key={idx} style={[styles.card, compare && styles.cardCompare]}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.price}>${plan.price}</Text>
          <Text>Coverage: {plan.coverage}</Text>
          {plan.perks.map((perk, i) => <Text key={i}>• {perk}</Text>)}
          <TouchableOpacity style={styles.button} onPress={goToCheckout}>
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderTripInfo = () => (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Trip Info</Text>
      <Text style={styles.label}>From:</Text>
      <View style={styles.input}>
        <Picker selectedValue={fromCity} onValueChange={setFromCity}>
          <Picker.Item label="Select city..." value="" />
          {cities.map((city, i) => <Picker.Item key={i} label={city} value={city} />)}
        </Picker>
      </View>
      <Text style={styles.label}>To:</Text>
      <View style={styles.input}>
        <Picker selectedValue={toCity} onValueChange={setToCity}>
          <Picker.Item label="Select city..." value="" />
          {cities.map((city, i) => <Picker.Item key={i} label={city} value={city} />)}
        </Picker>
      </View>
      <Text style={styles.label}>Start Date:</Text>
      <TouchableOpacity onPress={() => setShowStart(true)} style={styles.input}>
        <Text>{startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStart && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(e, selected) => {
            setShowStart(false);
            if (selected) setStartDate(selected);
          }}
        />
      )}
      <Text style={styles.label}>End Date:</Text>
      <TouchableOpacity onPress={() => setShowEnd(true)} style={styles.input}>
        <Text>{endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEnd && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(e, selected) => {
            setShowEnd(false);
            if (selected) setEndDate(selected);
          }}
        />
      )}
      <TextInput
        placeholder="Your age"
        placeholderTextColor="#666"
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TouchableOpacity style={styles.button} onPress={viewPlans}>
        <Text style={styles.buttonText}>See Plans</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  const renderLogin = () => (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>briki</Text>
      <Text style={styles.subheading}>Login to your account</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.checkboxRow}>
        <Text>Remember me</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={goToTripInfo}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.link}>Create new account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  const renderCheckout = () => (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      <Text>Stripe integration will go here.</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm and Pay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  if (screen === 'login') return renderLogin();
  if (screen === 'trip') return renderTripInfo();
  if (screen === 'plans') return renderPlans();
  if (screen === 'checkout') return renderCheckout();
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fffbee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  subheading: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#eee',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    width: '90%',
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 2,
    fontWeight: '600',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    color: '#007aff',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: '90%',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#aaa',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  cardCompare: {
    borderWidth: 2,
    borderColor: '#007aff',
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007aff',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
});