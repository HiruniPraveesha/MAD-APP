import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image
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
    const fetchItems = async () => {
      try {
        // Fetch the latest 5 SpaceX launches
        const response = await fetch('https://api.spacexdata.com/v4/launches/past?limit=5');
        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }
        const data = await response.json();
        setItems(data); // Store the array of launches in the state
      } catch (error) {
        console.error(error);
        alert('Could not fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleItemClick = () => {
    setItemCount(itemCount + 1);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.links && item.links.patch && item.links.patch.large && (
        <Image
          source={{ uri: item.links.patch.large }}
          style={styles.cardImage}
        />
      )}
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text>{item.details || 'No description available.'}</Text>
      <Text>Status: {item.success ? 'Success' : 'Failure'}</Text>
      <Text>Date: {new Date(item.date_utc).toLocaleDateString()}</Text>
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
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No items available.</Text>
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
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
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
