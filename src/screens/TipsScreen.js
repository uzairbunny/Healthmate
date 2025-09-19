import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { saveFavoriteTip } from '../utils/storage';

const TipsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = [
    'All',
    'Fitness',
    'Nutrition',
    'Mental Health',
    'Skin Care',
    'Sleep',
    'Hydration',
  ];

  const healthTips = [
    {
      id: '1',
      title: 'Morning Stretch Routine',
      content: 'Start your day with 5 minutes of stretching to improve flexibility and reduce muscle tension.',
      category: 'Fitness',
      date: '2025-09-18',
    },
    {
      id: '2',
      title: 'Balanced Diet',
      content: 'Include a variety of colorful fruits and vegetables in your meals for essential vitamins and minerals.',
      category: 'Nutrition',
      date: '2025-09-17',
    },
    {
      id: '3',
      title: 'Mindfulness Meditation',
      content: 'Practice 10 minutes of mindfulness meditation daily to reduce stress and improve focus.',
      category: 'Mental Health',
      date: '2025-09-16',
    },
    {
      id: '4',
      title: 'Skin Hydration',
      content: 'Drink water consistently throughout the day to keep your skin hydrated and glowing.',
      category: 'Skin Care',
      date: '2025-09-15',
    },
    {
      id: '5',
      title: 'Sleep Schedule',
      content: 'Maintain a consistent sleep schedule by going to bed and waking up at the same time daily.',
      category: 'Sleep',
      date: '2025-09-14',
    },
  ];

  const filteredTips = selectedCategory === 'All'
    ? healthTips
    : healthTips.filter(tip => tip.category === selectedCategory);

  const saveTipToFavorites = async (tip) => {
    const success = await saveFavoriteTip(tip);
    if (success) {
      Alert.alert('Saved!', 'Tip added to your favorites.');
    } else {
      Alert.alert('Error', 'Failed to save tip. Please try again.');
    }
  };

  const renderTipItem = ({ item }) => (
    <View style={styles.tipCard}>
      <View style={styles.tipHeader}>
        <Text style={styles.tipTitle}>{item.title}</Text>
        <TouchableOpacity onPress={() => saveTipToFavorites(item)}>
          <Icon name="favorite-border" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
      <Text style={styles.tipContent}>{item.content}</Text>
      <View style={styles.tipFooter}>
        <View style={styles.tipCategory}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.tipDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health Tips</Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredTips}
        renderItem={renderTipItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tipsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 20,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    color: '#666',
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  tipsList: {
    paddingBottom: 20,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  tipContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  tipFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipCategory: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  tipDate: {
    color: '#999',
    fontSize: 14,
  },
});

export default TipsScreen;