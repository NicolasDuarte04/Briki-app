import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [age, setAge] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cities = ['Bogotá', 'CDMX', 'NYC', 'Madrid'];

  const handleSubmit = () => {
    if (from && to && age && startDate && endDate) {
      setSubmitted(true);
    } else {
      alert('Please complete all fields to continue.');
    }
  };

  const formatDate = (date) => {
    return date.toDateString();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Trip Info</Text>

        <Text style={styles.label}>From:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={from}
            onValueChange={(itemValue) => setFrom(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select origin..." value="" color="#888" />
            {cities.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>To:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={to}
            onValueChange={(itemValue) => setTo(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select destination..." value="" color="#888" />
            {cities.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Start Date:</Text>
        <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.input}>
          <Text>{formatDate(startDate)}</Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowStartPicker(false);
              if (date) setStartDate(date);
            }}
          />
        )}

        <Text style={styles.label}>End Date:</Text>
        <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.input}>
          <Text>{formatDate(endDate)}</Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowEndPicker(false);
              if (date) setEndDate(date);
            }}
          />
        )}

        <TextInput
          placeholder="Your age"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>See Plans</Text>
        </TouchableOpacity>

        {submitted && (
          <Text style={styles.confirmation}>
            Great! You may now view your insurance options.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fefbee',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  pickerWrapper: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    color: '#000',
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    width: '100%',
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmation: {
    marginTop: 20,
    color: 'green',
    fontSize: 16,
  },
});