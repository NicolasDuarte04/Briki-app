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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TripInfo" component={TripInfoScreen} />
        <Stack.Screen name="Plans" component={PlansScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
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

      <TouchableOpacity
        style={[styles.button, { width: inputWidth }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity><Text style={styles.link}>Forgot password?</Text></TouchableOpacity>
      <TouchableOpacity><Text style={styles.link}>Create new account</Text></TouchableOpacity>
    </SafeAreaView>
  );
}

function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const buttonWidth = Math.min(width * 0.9, 360);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={[styles.logo, { fontSize: 36, marginBottom: 10 }]}>briki</Text>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 30, color: '#333' }}>
          Welcome back!
        </Text>

        <TouchableOpacity
          style={[styles.button, { width: buttonWidth }]}
          onPress={() => navigation.navigate('TripInfo')}
        >
          <Text style={styles.buttonText}>Start New Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { width: buttonWidth }]}
          onPress={() => alert('Feature coming soon!')}
        >
          <Text style={styles.buttonText}>View Past Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { width: buttonWidth }]}
          onPress={() => alert('Support chat coming soon!')}
        >
          <Text style={styles.buttonText}>Support</Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 40, fontSize: 14, color: '#999' }}>
          Powered by Briki • v1.0
        </Text>
      </ScrollView>
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

  const formComplete = from && to && age && startDate && endDate;

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
          style={[styles.input, { width: inputWidth }]}
        >
          <Text>{endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEnd && (
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
        )}

        <TextInput
          style={[styles.input, { width: inputWidth, fontSize }]}
          placeholder="Your age"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <TouchableOpacity
          style={[
            styles.button,
            { width: inputWidth, backgroundColor: formComplete ? '#007AFF' : '#ccc' }
          ]}
          onPress={handleContinue}
          disabled={!formComplete}
        >
          <Text style={styles.buttonText}>See Plans</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
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
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={[styles.title, { fontSize: 22 }]}>Recommended Plans</Text>

        <View style={styles.compareToggle}>
          <Text style={[styles.label, { fontSize }]}>Compare Plans</Text>
          <Switch value={compare} onValueChange={setCompare} />
        </View>

        {compare ? (
          selectedPlans.length >= 2 ? (
            <View style={styles.compareContainer}>
              {plans
                .filter(plan => selectedPlans.includes(plan.name))
                .map((plan, index) => (
                  <View key={index} style={[styles.compareCard, { width: compareCardWidth }]}>
                    <Text style={[styles.planName, { fontSize: fontSize + 1 }]}>{plan.name}</Text>
                    <Text>{plan.price}</Text>
                    <Text>{plan.coverage}</Text>
                    {plan.perks.map((perk, idx) => (
                      <Text key={idx} style={styles.bullet}>• {perk}</Text>
                    ))}
                  </View>
              ))}
            </View>
          ) : (
            <Text style={{ color: '#999', textAlign: 'center', marginTop: 20 }}>
              Please select at least two plans to compare.
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
function CheckoutScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const inputWidth = Math.min(width * 0.9, 360);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text>Your Stripe integration will be added here.</Text>

      <TouchableOpacity
        style={[styles.button, { width: inputWidth }]}
        onPress={() => navigation.navigate('Confirmation', {
          from: 'Bogotá',
          to: 'New York',
          startDate: 'May 10, 2025',
          endDate: 'May 20, 2025',
          plan: 'AXA',
          price: '$45'
        })}
      >
        <Text style={styles.buttonText}>Confirm & Pay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function ConfirmationScreen({ navigation, route }) {
  const { width } = useWindowDimensions();
  const inputWidth = Math.min(width * 0.9, 360);
  const [loading, setLoading] = useState(true);

  const { from, to, startDate, endDate, plan, price } = route.params || {};

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <>
          <Text style={[styles.title, { fontSize: 20 }]}>Processing your payment...</Text>
          <Text style={{ color: '#777', marginTop: 20 }}>Please wait</Text>
        </>
      ) : (
        <>
          <Text style={[styles.title, { fontSize: 22 }]}>All Set!</Text>
          <Text style={{ textAlign: 'center', marginBottom: 20, color: '#333', fontSize: 16 }}>
            Your travel insurance has been confirmed.
          </Text>

          <View style={[styles.card, { width: inputWidth, backgroundColor: '#f8f8f8', padding: 18 }]}>
            <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 10 }}>Trip Summary</Text>
            <Text style={styles.bullet}>From: {from}</Text>
            <Text style={styles.bullet}>To: {to}</Text>
            <Text style={styles.bullet}>Start: {startDate}</Text>
            <Text style={styles.bullet}>End: {endDate}</Text>
            <Text style={styles.bullet}>Plan: {plan}</Text>
            <Text style={styles.bullet}>Total: {price}</Text>
          </View>

          <TouchableOpacity
            style={[styles.button, { width: inputWidth, marginTop: 30 }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Return to Home</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    alignItems: 'center',
  },
  form: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
    width: '100%',
  },
  logo: {
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    color: '#444',
    marginBottom: 30,
    fontWeight: '500',
  },
  title: {
    fontWeight: '700',
    marginBottom: 20,
    color: '#222',
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 6,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignSelf: 'center',
    color: '#000',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pickerContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  planName: {
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 5,
  },
  bullet: {
    color: '#444',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  compareToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    gap: 10,
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
    fontWeight: '500',
  },
});