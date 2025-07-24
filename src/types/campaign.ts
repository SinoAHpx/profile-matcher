export interface Person {
  id: string;
  name: string;
  avatar: string;
  role: string;
  skills: string[];
  bio: string;
  joinedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  campaignId: string;
  members: Person[];
  maxMembers: number;
  isRecommended: boolean;
  tags: string[];
  createdAt: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  startDate: string;
  endDate: string;
  totalTeams: number;
  maxTeams: number;
  tags: string[];
  organizer: string;
}

export interface CampaignWithTeams extends Campaign {
  teams: Team[];
}