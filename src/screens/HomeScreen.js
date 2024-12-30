import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Welcome, ${username}`,
    });
  }, [navigation, username]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(
          'https://aerodatabox.p.rapidapi.com/flights/airports/icao/KJFK/2023-12-06T10:00/2023-12-06T12:00?withLeg=true&direction=departure',
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
              'X-RapidAPI-Key': '79c7a2dbd0msh46aa56531b582ebp160fe2jsn406a3c266b3',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch flight data.');
        }
        const data = await response.json();
        setItems(data.departures || []); // Ensure it doesn't break if data is undefined
      } catch (error) {
        console.error(error);
        alert('Could not fetch flight data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleItemClick = () => {
    setItemCount(itemCount + 1);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Flight: {item.flightNumber}</Text>
      <Text>From: {item.departure.airport.name}</Text>
      <Text>To: {item.arrival.airport.name}</Text>
      <Text>Departure: {item.departure.scheduledTime}</Text>
      <TouchableOpacity style={styles.cardButton} onPress={handleItemClick}>
        <Text style={styles.cardButtonText}>Click to Count</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#226b94" />
      ) : items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>No flights available.</Text>
      )}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>Item Click Count: {itemCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  card: {
    padding: 15,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardButton: {
    marginTop: 10,
    backgroundColor: '#226b94',
    padding: 10,
    borderRadius: 5,
  },
  cardButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#ff5722',
    padding: 10,
    borderRadius: 50,
  },
  floatingButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
