import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { saveFavoriteTip, getDailyTip, saveDailyTip } from '../utils/storage';
import { scheduleDailyTipNotification } from '../utils/notifications';

const HomeScreen = ({ navigation }) => {
  const healthCategories = [
    { id: 1, name: 'Fitness', icon: 'fitness-center' },
    { id: 2, name: 'Nutrition', icon: 'restaurant' },
    { id: 3, name: 'Mental Health', icon: 'psychology' },
    { id: 4, name: 'Skin Care', icon: 'spa' },
    { id: 5, name: 'Sleep', icon: 'bed' },
    { id: 6, name: 'Hydration', icon: 'local-drink' },
  ];

  const [dailyTip, setDailyTip] = useState({
    id: 1,
    title: 'Stay Hydrated',
    content: 'Drink at least 8 glasses of water daily to maintain optimal health and energy levels.',
    category: 'Hydration',
  });

  useEffect(() => {
    loadDailyTip();
  }, []);

  const loadDailyTip = async () => {
    const tip = await getDailyTip();
    if (tip) {
      setDailyTip(tip);
    } else {
      // Save the default tip if none exists
      await saveDailyTip(dailyTip);
    }
    
    // Schedule daily notification for this tip
    await scheduleDailyTipNotification(dailyTip);
  };

  const saveTipToFavorites = async () => {
    const success = await saveFavoriteTip(dailyTip);
    if (success) {
      Alert.alert('Saved!', 'Daily tip added to your favorites.');
    } else {
      Alert.alert('Error', 'Failed to save tip. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning!</Text>
        <Text style={styles.subGreeting}>Your health journey starts now</Text>
      </View>

      <View style={styles.dailyTipContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily Health Tip</Text>
          <TouchableOpacity onPress={saveTipToFavorites}>
            <Icon name="favorite-border" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>{dailyTip.title}</Text>
          <Text style={styles.tipContent}>{dailyTip.content}</Text>
          <View style={styles.tipCategory}>
            <Text style={styles.categoryText}>{dailyTip.category}</Text>
          </View>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Health Categories</Text>
        <View style={styles.categoriesGrid}>
          {healthCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => navigation.navigate('Tips')}
            >
              <View style={styles.categoryIcon}>
                <Icon name={category.icon} size={24} color="#4CAF50" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Chat')}
          >
            <Text style={styles.actionText}>Ask AI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Favorites')}
          >
            <Text style={styles.actionText}>My Favorites</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 30,
    marginTop: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dailyTipContainer: {
    marginBottom: 30,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tipContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  tipCategory: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  categoryText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  categoriesContainer: {
    marginBottom: 30,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  quickActions: {
    marginBottom: 30,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;