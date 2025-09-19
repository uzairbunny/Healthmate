import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { getUserProfile, saveUserProfile } from '../utils/storage';

const ProfileScreen = () => {
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState('28');
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [goals, setGoals] = useState(['Weight Loss']);

  const goalOptions = ['Weight Loss', 'Muscle Gain', 'Stress Management', 'General Fitness'];

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const profile = await getUserProfile();
    if (profile) {
      setName(profile.name || 'John Doe');
      setAge(profile.age || '28');
      setGender(profile.gender || 'Male');
      setHeight(profile.height || '175');
      setWeight(profile.weight || '70');
      setGoals(profile.goals || ['Weight Loss']);
    }
  };

  const toggleGoal = (goal) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const saveProfile = async () => {
    const profile = {
      name,
      age,
      gender,
      height,
      weight,
      goals,
    };

    const success = await saveUserProfile(profile);
    if (success) {
      Alert.alert('Profile Saved', 'Your profile information has been updated successfully!');
    } else {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <TouchableOpacity style={styles.editAvatarButton}>
            <Text style={styles.editAvatarText}>Edit Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
          />
        </View>

        <View style={styles.formRow}>
          <View style={[styles.formGroup, styles.formHalf]}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="Age"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.formGroup, styles.formHalf]}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === 'Male' && styles.selectedGender,
                ]}
                onPress={() => setGender('Male')}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === 'Male' && styles.selectedGenderText,
                  ]}
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === 'Female' && styles.selectedGender,
                ]}
                onPress={() => setGender('Female')}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === 'Female' && styles.selectedGenderText,
                  ]}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.formRow}>
          <View style={[styles.formGroup, styles.formHalf]}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              placeholder="Height"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.formGroup, styles.formHalf]}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="Weight"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <View style={styles.goalsSection}>
        <Text style={styles.sectionTitle}>Health Goals</Text>
        <View style={styles.goalsContainer}>
          {goalOptions.map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                styles.goalButton,
                goals.includes(goal) && styles.selectedGoal,
              ]}
              onPress={() => toggleGoal(goal)}
            >
              <Text
                style={[
                  styles.goalText,
                  goals.includes(goal) && styles.selectedGoalText,
                ]}
              >
                {goal}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
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
  profileSection: {
    backgroundColor: '#fff',
    margin: 20,
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 36,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  editAvatarButton: {
    padding: 10,
  },
  editAvatarText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formHalf: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
  },
  selectedGender: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  genderText: {
    color: '#666',
    fontWeight: '600',
  },
  selectedGenderText: {
    color: '#4CAF50',
  },
  goalsSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  goalButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedGoal: {
    backgroundColor: '#4CAF50',
  },
  goalText: {
    color: '#666',
    fontWeight: '600',
  },
  selectedGoalText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    margin: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;