export type SideQuest = {
  id: string;
  name: string;
};

export interface Challenge {
  id: string;
  text: string;
  points: number;
  isBonus?: boolean;
  completed: boolean;
  description?: string;
  requirements?: string[];
}
export interface TreasureHuntItem {
  id: number;
  cityId: number;
  title: string;
  description: string;
  points: number;
  requirement: string[];
}

export interface ClueData {
  cityId: number;
  question: string;
  answerCode: string;
  hint: string;
  points: number;
  timeBonus: number | null;
  order: number;
  title: string | null;
  destination: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  userProgresses: any[];
  id: number;
}

export interface SideQuestCompletionData {
  pointsEarned: number;
  currentProgress: string; 
  message: string; 
}

export interface SideQuestCompletedResponse {
  message: string; 
  data: SideQuestCompletionData;
}
