import { Campaign, Team, Person } from '@/types/campaign';

export const mockPeople: Person[] = [
  {
    id: 'person-1',
    name: 'Alex Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    role: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'Next.js'],
    bio: 'Passionate about creating beautiful and functional web experiences.',
    joinedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'person-2',
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'UX Designer',
    skills: ['Figma', 'User Research', 'Prototyping'],
    bio: 'Creating user-centered designs that solve real problems.',
    joinedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'person-3',
    name: 'Mike Williams',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    role: 'Backend Developer',
    skills: ['Node.js', 'Python', 'PostgreSQL'],
    bio: 'Building scalable and robust server-side applications.',
    joinedAt: '2024-01-18T09:15:00Z'
  },
  {
    id: 'person-4',
    name: 'Emma Davis',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    role: 'Product Manager',
    skills: ['Agile', 'Product Strategy', 'Data Analysis'],
    bio: 'Bridging the gap between user needs and technical solutions.',
    joinedAt: '2024-01-22T11:45:00Z'
  },
  {
    id: 'person-5',
    name: 'David Kim',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    role: 'DevOps Engineer',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    bio: 'Automating everything and keeping systems running smoothly.',
    joinedAt: '2024-01-19T16:20:00Z'
  },
  {
    id: 'person-6',
    name: 'Lisa Anderson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    role: 'Mobile Developer',
    skills: ['React Native', 'iOS', 'Flutter'],
    bio: 'Creating seamless mobile experiences across platforms.',
    joinedAt: '2024-01-21T13:10:00Z'
  }
];

export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'React Masters',
    description: 'Building the next generation of web applications with React and TypeScript.',
    campaignId: 'campaign-1',
    members: [mockPeople[0], mockPeople[1]],
    maxMembers: 5,
    isRecommended: true,
    tags: ['React', 'Frontend', 'TypeScript'],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'team-2',
    name: 'Python Pioneers',
    description: 'Developing scalable backend solutions with Python and Django.',
    campaignId: 'campaign-1',
    members: [mockPeople[2], mockPeople[4]],
    maxMembers: 4,
    isRecommended: false,
    tags: ['Python', 'Backend', 'Django'],
    createdAt: '2024-01-16T12:00:00Z'
  },
  {
    id: 'team-3',
    name: 'UX Innovators',
    description: 'Creating exceptional user experiences through thoughtful design.',
    campaignId: 'campaign-2',
    members: [mockPeople[1], mockPeople[3]],
    maxMembers: 6,
    isRecommended: true,
    tags: ['UX', 'Design', 'Research'],
    createdAt: '2024-01-17T09:30:00Z'
  },
  {
    id: 'team-4',
    name: 'Mobile Mavericks',
    description: 'Cross-platform mobile development with React Native and Flutter.',
    campaignId: 'campaign-2',
    members: [mockPeople[5], mockPeople[0]],
    maxMembers: 4,
    isRecommended: false,
    tags: ['Mobile', 'React Native', 'Flutter'],
    createdAt: '2024-01-18T14:00:00Z'
  },
  {
    id: 'team-5',
    name: 'Cloud Architects',
    description: 'Designing and implementing cloud-native solutions on AWS.',
    campaignId: 'campaign-3',
    members: [mockPeople[4], mockPeople[2]],
    maxMembers: 3,
    isRecommended: true,
    tags: ['AWS', 'Cloud', 'DevOps'],
    createdAt: '2024-01-19T11:00:00Z'
  },
  {
    id: 'team-6',
    name: 'Product Innovators',
    description: 'Building products that users love through data-driven decisions.',
    campaignId: 'campaign-3',
    members: [mockPeople[3], mockPeople[1]],
    maxMembers: 5,
    isRecommended: false,
    tags: ['Product', 'Strategy', 'Data'],
    createdAt: '2024-01-20T15:30:00Z'
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    title: 'Web Development Sprint 2024',
    description: 'Join teams building innovative web applications using modern technologies. Collaborate with developers, designers, and product managers to create impactful solutions.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop',
    category: 'Web Development',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    totalTeams: 2,
    maxTeams: 10,
    tags: ['Web', 'Frontend', 'Backend', 'Full-stack'],
    organizer: 'Tech Community'
  },
  {
    id: 'campaign-2',
    title: 'Mobile App Challenge',
    description: 'Create cross-platform mobile applications that solve real-world problems. Work with designers and developers to build apps for iOS and Android.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop',
    category: 'Mobile Development',
    startDate: '2024-02-15',
    endDate: '2024-05-15',
    totalTeams: 2,
    maxTeams: 8,
    tags: ['Mobile', 'React Native', 'Flutter', 'iOS', 'Android'],
    organizer: 'Mobile Dev Group'
  },
  {
    id: 'campaign-3',
    title: 'Cloud Infrastructure Hackathon',
    description: 'Build scalable cloud infrastructure solutions using AWS, Azure, or GCP. Focus on DevOps, containerization, and microservices architecture.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop',
    category: 'Cloud Computing',
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    totalTeams: 2,
    maxTeams: 12,
    tags: ['Cloud', 'AWS', 'DevOps', 'Docker', 'Kubernetes'],
    organizer: 'Cloud Native Club'
  }
];

export const getCampaignWithTeams = (campaignId: string) => {
  const campaign = mockCampaigns.find(c => c.id === campaignId);
  const teams = mockTeams.filter(t => t.campaignId === campaignId);
  
  if (!campaign) return null;
  
  return {
    ...campaign,
    teams
  };
};