import type { AIAssistantData, ChatMessage } from '../types/aiAssistant.types';
import { mockAIAssistantData } from '../data/aiAssistant.data';

export async function getAIAssistantData(): Promise<AIAssistantData> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockAIAssistantData);
    }, 150);
  });
}

const AI_KNOWLEDGE_REPLIES: Record<string, string[]> = {
  stress: [
    "It's completely normal to feel stressed when stakes feel high. Let's try the 4-7-8 breathing exercise: Inhale slowly for 4 seconds, hold for 7 seconds, and exhale gently for 8 seconds. Would you like to do a round together?",
    'When exams or tasks pile up, breaking them into 25-minute Pomodoro focus blocks followed by a 5-minute break can calm the nervous system. What subject feels heaviest right now?',
  ],
  sleep: [
    'Good sleep starts 1 hour before bed: turning down blue screens, keeping the room cool (around 18-20°C), and writing down tomorrow’s worries on paper can quiet a racing mind. Would you like a sleep relaxation guide?',
    'Consistent sleep and wake times anchor your circadian rhythm. Even 10 minutes of morning sunlight helps melatonin production at night.',
  ],
  feelings: [
    'Emotions are signals, not permanent states. If you had to describe what you feel right now in 3 words, what would they be? There are no wrong answers.',
    "Acknowledging your feelings is the first step toward lightness. I'm right here with you. Take all the time you need.",
  ],
  day: [
    "Thank you for sharing your day with me! What was one moment today that made you smile, even just a little? And what part felt challenging?",
    'Every day has its ups and downs. Tell me more about what happened — I am listening.',
  ],
  default: [
    'I hear you, and your feelings are completely valid. Taking things one step at a time is more than enough right now. How can I best support you in this moment?',
    'Thank you for being open with me. Remember to be gentle with yourself today. Would you like to explore some grounding exercises, or would you simply prefer to talk more?',
  ],
};

export async function sendUserMessage(
  userText: string
): Promise<{ replyMessage: ChatMessage }> {
  return new Promise(resolve => {
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let pool = AI_KNOWLEDGE_REPLIES.default;

      if (lower.includes('stress') || lower.includes('exam') || lower.includes('pressure') || lower.includes('anxiety')) {
        pool = AI_KNOWLEDGE_REPLIES.stress;
      } else if (lower.includes('sleep') || lower.includes('tired') || lower.includes('insomnia') || lower.includes('bed')) {
        pool = AI_KNOWLEDGE_REPLIES.sleep;
      } else if (lower.includes('feel') || lower.includes('sad') || lower.includes('overwhelm') || lower.includes('mood')) {
        pool = AI_KNOWLEDGE_REPLIES.feelings;
      } else if (lower.includes('day') || lower.includes('today') || lower.includes('talk') || lower.includes('work')) {
        pool = AI_KNOWLEDGE_REPLIES.day;
      }

      const randomReply = pool[Math.floor(Math.random() * pool.length)];

      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;

      resolve({
        replyMessage: {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: randomReply,
          timestamp: `${formattedHours}:${minutes} ${ampm}`,
        },
      });
    }, 1100);
  });
}

