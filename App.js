import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Alert, Switch, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useWindowDimensions } from 'react-native';

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
  const { width } = useWindowDimensions();
  const inputWidth = Math.min(width * 0.9, 360);
  const fontSize = width < 375 ? 14 : 16;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.logo, { fontSize: 42 }]}>briki</Text>
      <Text style={[styles.subtitle, { fontSize }]}>Login to your account</Text>

      <TextInput
        style={[styles.input, { width: inputWidth, fontSize }]}
        placeholder="Email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { width: inputWidth, fontSize }]}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={[styles.button, { width: inputWidth }]} onPress={() => navigation.navigate('TripInfo')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity><Text style={styles.link}>Forgot password?</Text></TouchableOpacity>
      <TouchableOpacity><Text style={styles.link}>Create new account</Text></TouchableOpacity>
    </SafeAreaView>
  );
}
function TripInfoScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const inputWidth = Math.min(width * 0.9, 360);
  const fontSize = width < 375 ? 14 : 16;

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [age, setAge] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const handleContinue = () => {
    if (!from || !to || !age || !startDate || !endDate) {
      Alert.alert("Please complete all fields.");
      return;
    }
    navigation.navigate('Plans');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={[styles.title, { fontSize: 22 }]}>Trip Info</Text>

        <Text style={[styles.label, { fontSize }]}>From:</Text>
        <TouchableOpacity
          style={[styles.input, { width: inputWidth }]}
          onPress={() =>
            Alert.alert("Choose Origin", null, [
              { text: "Bogotá", onPress: () => setFrom("Bogotá") },
              { text: "CDMX", onPress: () => setFrom("CDMX") },
              { text: "Cancel", style: "cancel" },
            ])
          }
        >
          <Text>{from || 'Select origin...'}</Text>
        </TouchableOpacity>
	        <Text style={[styles.label, { fontSize }]}>To:</Text>
        <TouchableOpacity
          style={[styles.input, { width: inputWidth }]}
          onPress={() =>
            Alert.alert("Choose Destination", null, [
              { text: "New York", onPress: () => setTo("New York") },
              { text: "Madrid", onPress: () => setTo("Madrid") },
              { text: "Cancel", style: "cancel" },
            ])
          }
        >
          <Text>{to || 'Select destination...'}</Text>
        </TouchableOpacity>

        <Text style={[styles.label, { fontSize }]}>Start Date:</Text>
        <TouchableOpacity
          onPress={() => setShowStart(true)}
          style={[styles.input, { width: inputWidth }]}
        >
          <Text>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStart && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStart(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
            style={{ backgroundColor: 'white' }}
          />
        )}
	        <Text style={[styles.label, { fontSize }]}>End Date:</Text>
        <TouchableOpacity
          onPress={() => setShowEnd(true)}
          style={[styles.input, { width: inputWidth, marginBottom: 20 }]}
        >
          <Text>{endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEnd && (
          <View style={{ marginBottom: 20 }}>
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEnd(false);
                if (selectedDate) setEndDate(selectedDate);
              }}
              style={{ backgroundColor: 'white' }}
            />
          </View>
        )}

        <TextInput
          style={[styles.input, { width: inputWidth, fontSize, marginTop: 10 }]}
          placeholder="Your age"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <TouchableOpacity style={[styles.button, { width: inputWidth }]} onPress={handleContinue}>
          <Text style={styles.buttonText}>See Plans</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}	
}
function PlansScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width * 0.9, 360);
  const compareCardWidth = Math.min(width * 0.42, 170);
  const fontSize = width < 375 ? 14 : 16;

  const [compare, setCompare] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([]);

  const togglePlan = (name) => {
    if (selectedPlans.includes(name)) {
      setSelectedPlans(selectedPlans.filter(p => p !== name));
    } else {
      setSelectedPlans([...selectedPlans, name]);
    }
  };

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
      <Text style={[styles.title, { fontSize: 22 }]}>Recommended Plans</Text>

      <View style={styles.compareToggle}>
        <Text style={[styles.label, { fontSize }]}>Compare Plans</Text>
        <Switch value={compare} onValueChange={setCompare} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
	          {compare ? (
          selectedPlans.length >= 2 ? (
            <View style={styles.compareContainer}>
              {plans
                .filter(plan => selectedPlans.includes(plan.name))
                .map((plan, index) => (
                  <View key={index} style={[styles.compareCard, { width: compareCardWidth }]}>
                    <Text style={[styles.planName, { fontSize: fontSize + 1 }]}>{plan.name}</Text>
                    <Text style={{ fontSize }}>{plan.price}</Text>
                    <Text style={{ fontSize }}>{plan.coverage}</Text>
                    {plan.perks.map((perk, idx) => (
                      <Text key={idx} style={styles.bullet}>• {perk}</Text>
                    ))}
                  </View>
              ))}
            </View>
          ) : (
            <Text style={{ color: '#999', textAlign: 'center', marginTop: 20 }}>
              Please select 2 or more plans to compare.
            </Text>
          )
        ) : (
          plans.map((plan, index) => {
            const isSelected = selectedPlans.includes(plan.name);
            return (
              <View key={index} style={[styles.card, { width: cardWidth }]}>
                <Text style={[styles.planName, { fontSize: fontSize + 1 }]}>{plan.name}</Text>
                <Text>{plan.price}</Text>
                <Text>{plan.coverage}</Text>
                {plan.perks.map((perk, idx) => (
                  <Text key={idx} style={styles.bullet}>• {perk}</Text>
                ))}
                <TouchableOpacity
                  style={{ marginTop: 10 }}
                  onPress={() => togglePlan(plan.name)}
                >
                  <Text style={{ color: isSelected ? '#007AFF' : '#999' }}>
                    {isSelected ? '✓ Selected for Comparison' : 'Select to Compare'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { width: cardWidth, marginTop: 10 }]}
                  onPress={() => navigation.navigate('Checkout')}
                >
                  <Text style={styles.buttonText}>Select</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
function CheckoutScreen() {
  const { width } = useWindowDimensions();
  const inputWidth = Math.min(width * 0.9, 360);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text>Your Stripe integration will be added here.</Text>

      <TouchableOpacity style={[styles.button, { width: inputWidth }]}>
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
    alignItems: 'center',
    paddingBottom: 40,
  },
  logo: {
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    color: '#444',
    marginBottom: 30,
  },
    title: {
    fontWeight: '700',  // was 600
    marginBottom: 20,
    color: '#222',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 6,
    fontWeight: '600', // was 500
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
    color: '#000',
  },
  pickerContainerFixed: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
    height: 48,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
    buttonText: {
    color: '#fff',
    fontWeight: '700', // was 600
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignSelf: 'center',
  },
    planName: {
    fontWeight: '700', // was 600
    color: '#007AFF',
    marginBottom: 5,
  },
    bullet: {
    color: '#444',
    fontSize: 14,
    fontWeight: '500', // NEW line
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
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  compareCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  link: {
    marginTop: 10,
    color: '#007AFF',
  },
});