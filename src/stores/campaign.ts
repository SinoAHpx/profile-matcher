import { create } from 'zustand';
import { Campaign, Team, Person } from '@/types/campaign';
import { mockCampaigns, mockTeams, mockPeople } from '@/lib/mock-data';

interface CampaignStore {
  campaigns: Campaign[];
  teams: Team[];
  people: Person[];
  selectedCampaign: Campaign | null;
  selectedTeam: Team | null;
  
  // Actions
  setCampaigns: (campaigns: Campaign[]) => void;
  setTeams: (teams: Team[]) => void;
  setSelectedCampaign: (campaign: Campaign | null) => void;
  setSelectedTeam: (team: Team | null) => void;
  
  // Derived data
  getCampaignById: (id: string) => Campaign | null;
  getTeamsByCampaign: (campaignId: string) => Team[];
  getTeamById: (id: string) => Team | null;
  getPersonById: (id: string) => Person | null;
  
  // Team management
  createTeam: (team: Omit<Team, 'id' | 'createdAt'>) => void;
  joinTeam: (teamId: string, person: Person) => void;
  
  // Initialize with mock data
  initializeMockData: () => void;
}

export const useCampaignStore = create<CampaignStore>((set, get) => ({
  campaigns: [],
  teams: [],
  people: [],
  selectedCampaign: null,
  selectedTeam: null,
  
  setCampaigns: (campaigns) => set({ campaigns }),
  setTeams: (teams) => set({ teams }),
  setSelectedCampaign: (campaign) => set({ selectedCampaign: campaign }),
  setSelectedTeam: (team) => set({ selectedTeam: team }),
  
  getCampaignById: (id) => {
    const { campaigns } = get();
    return campaigns.find(c => c.id === id) || null;
  },
  
  getTeamsByCampaign: (campaignId) => {
    const { teams } = get();
    return teams.filter(t => t.campaignId === campaignId);
  },
  
  getTeamById: (id) => {
    const { teams } = get();
    return teams.find(t => t.id === id) || null;
  },
  
  getPersonById: (id) => {
    const { people } = get();
    return people.find(p => p.id === id) || null;
  },
  
  createTeam: (teamData) => {
    const { teams } = get();
    const newTeam: Team = {
      ...teamData,
      id: `team-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set({ teams: [...teams, newTeam] });
  },
  
  joinTeam: (teamId, person) => {
    const { teams } = get();
    const updatedTeams = teams.map(team => {
      if (team.id === teamId && team.members.length < team.maxMembers) {
        return {
          ...team,
          members: [...team.members, person],
        };
      }
      return team;
    });
    set({ teams: updatedTeams });
  },
  
  initializeMockData: () => {
    set({
      campaigns: mockCampaigns,
      teams: mockTeams,
      people: mockPeople,
    });
  },
}));