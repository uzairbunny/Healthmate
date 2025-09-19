import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { getFavoriteTips, getChatHistory } from '../utils/storage';

const FavoritesScreen = () => {
  const [activeTab, setActiveTab] = useState('Tips');
  const [favoriteTips, setFavoriteTips] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    if (activeTab === 'Chat') {
      loadChatHistory();
    }
  }, [activeTab]);

  const loadFavorites = async () => {
    const tips = await getFavoriteTips();
    setFavoriteTips(tips);
  };

  const loadChatHistory = async () => {
    const history = await getChatHistory();
    // Group messages into question-answer pairs
    const groupedHistory = [];
    for (let i = 0; i < history.length; i += 2) {
      if (history[i].sender === 'user' && history[i + 1] && history[i + 1].sender === 'bot') {
        groupedHistory.push({
          id: history[i].id,
          question: history[i].text,
          answer: history[i + 1].text,
          timestamp: history[i].timestamp,
        });
      }
    }
    setChatHistory(groupedHistory);
  };

  const renderTipItem = ({ item }) => (
    <View style={styles.tipCard}>
      <Text style={styles.tipTitle}>{item.title}</Text>
      <Text style={styles.tipContent}>{item.content}</Text>
      <View style={styles.tipCategory}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
    </View>
  );

  const renderChatItem = ({ item }) => (
    <View style={styles.chatCard}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>{item.answer}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Favorites</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Tips' && styles.activeTab]}
          onPress={() => setActiveTab('Tips')}
        >
          <Text style={[styles.tabText, activeTab === 'Tips' && styles.activeTabText]}>
            Favorite Tips
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Chat' && styles.activeTab]}
          onPress={() => setActiveTab('Chat')}
        >
          <Text style={[styles.tabText, activeTab === 'Chat' && styles.activeTabText]}>
            Chat History
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Tips' ? (
        <FlatList
          data={favoriteTips}
          renderItem={renderTipItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No favorite tips yet</Text>
              <Text style={styles.emptySubtext}>Start exploring health tips and save your favorites!</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={chatHistory}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No chat history yet</Text>
              <Text style={styles.emptySubtext}>Start a conversation with the AI assistant!</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  listContainer: {
    paddingHorizontal: 20,
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
  chatCard: {
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
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default FavoritesScreen;