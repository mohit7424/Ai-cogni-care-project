export type SenderType = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  sender: SenderType;
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface QuickPromptCardItem {
  id: string;
  title: string;
  subtitle: string;
  icon: 'feelings' | 'stress' | 'sleep' | 'day';
  prompt: string;
}

export interface ConversationHistoryItem {
  id: string;
  title: string;
  date: string;
  messageCount: number;
}

export interface AIAssistantData {
  botName: string;
  statusText: string;
  bannerTitle: string;
  bannerSubtitle: string;
  quickPrompts: QuickPromptCardItem[];
  initialMessages: ChatMessage[];
  safetyNote: string;
  disclaimer: string;
}

