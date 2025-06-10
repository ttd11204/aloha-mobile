export type UserProfile = {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string | null;
  fullname: string | null;
  balance: number;
  profilePictureUrl: string | null;
  createdDate: string | null; // or Date | null if you plan to convert the string to a Date object
  emailConfirmed: boolean;
  phoneNumberConfirmed: boolean;
};

type SolvedClueDetail = {
  clueId: number;
  clueTitle: string;
  pointsEarned: number;
  completionTime: string; 
  cityName: string;
};

type SolvedQuestDetail = {
  sideQuestId: number;
  questTitle: string;
  pointsEarned: number;
  completionTime: string; 
};

export type UserGameProfile = {
  userId: string;
  fullname: string;
  solvedClues: number;
  solvedQuests: number;
  totalScore: number;
  currentRank: number;
  solvedClueDetails: SolvedClueDetail[];
  solvedQuestDetails: SolvedQuestDetail[];
};