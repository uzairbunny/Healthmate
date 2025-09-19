// Mock AI assistant implementation
// This can be replaced with actual OpenAI API integration

const mockResponses = {
  workout: "For a 20-minute home workout, try this routine: 5 minutes warm-up, 10 minutes of bodyweight exercises (squats, push-ups, lunges), and 5 minutes cool-down with stretching.",
  nutrition: "A balanced diet includes: 50% vegetables and fruits, 25% whole grains, and 25% protein. Stay hydrated with 8 glasses of water daily.",
  sleep: "For better sleep quality: maintain a consistent sleep schedule, avoid screens 1 hour before bed, keep your room cool and dark, and try relaxation techniques like deep breathing.",
  stress: "To manage stress: practice deep breathing exercises, take regular breaks, engage in physical activity, maintain social connections, and consider mindfulness meditation.",
  default: "I'm here to help with health and wellness questions! You can ask about nutrition, workouts, sleep, stress management, and more. What would you like to know?"
};

export const getAIResponse = async (userInput) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lowerInput = userInput.toLowerCase();
  
  if (lowerInput.includes('workout') || lowerInput.includes('exercise')) {
    return mockResponses.workout;
  } else if (lowerInput.includes('nutrition') || lowerInput.includes('food')) {
    return mockResponses.nutrition;
  } else if (lowerInput.includes('sleep')) {
    return mockResponses.sleep;
  } else if (lowerInput.includes('stress')) {
    return mockResponses.stress;
  } else {
    return mockResponses.default;
  }
};

// Uncomment and use this function when integrating with real OpenAI API
/*
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'YOUR_API_KEY_HERE', // Replace with your actual API key
  dangerouslyAllowBrowser: true, // Note: This should be handled securely in production
});

export const getAIResponse = async (userInput) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful health and wellness assistant. Provide evidence-based advice on nutrition, exercise, sleep, and mental health. Keep responses concise and actionable.'
        },
        {
          role: 'user',
          content: userInput
        }
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 200,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error getting AI response:', error);
    return 'Sorry, I encountered an error processing your request. Please try again.';
  }
};
*/