import type { AIAssistantData } from '../types/aiAssistant.types';

export const mockAIAssistantData: AIAssistantData = {
  botName: 'Cogni Care AI',
  statusText: 'Online',
  bannerTitle: 'Hello! How are you feeling today?',
  bannerSubtitle: "I'm here to listen, help you reflect, and support your wellbeing.",
  quickPrompts: [
    {
      id: 'feelings',
      title: 'Understand My Feelings',
      subtitle: 'Help me explore what I am feeling.',
      icon: 'feelings',
      prompt: "I'd like help exploring and understanding how I'm feeling right now.",
    },
    {
      id: 'stress',
      title: 'Manage Stress',
      subtitle: 'Learn simple ways to manage daily stress.',
      icon: 'stress',
      prompt: 'Can you teach me some simple techniques to manage stress and anxiety?',
    },
    {
      id: 'sleep',
      title: 'Improve My Sleep',
      subtitle: 'Explore healthy sleep habits.',
      icon: 'sleep',
      prompt: "I'm having trouble sleeping lately. How can I build better sleep habits?",
    },
    {
      id: 'day',
      title: 'Talk About My Day',
      subtitle: "Share what's on my mind.",
      icon: 'day',
      prompt: "I'd love to chat about how my day went and unload what's on my mind.",
    },
  ],
  initialMessages: [
    {
      id: 'msg-1',
      sender: 'user',
      text: "I've been feeling stressed about my exams lately.",
      timestamp: '10:24 AM',
      status: 'read',
    },
    {
      id: 'msg-2',
      sender: 'assistant',
      text: "I'm sorry that things have been feeling stressful. Exams can bring a lot of pressure. Would you like to talk about what's been bothering you the most?",
      timestamp: '10:24 AM',
    },
  ],
  safetyNote: "Your wellbeing matters. Share only what you're comfortable with.",
  disclaimer: 'Cogni Care AI offers general wellbeing support, not medical diagnosis or treatment.',
};

