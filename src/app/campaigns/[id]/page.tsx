'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCampaignStore } from '@/stores/campaign';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Users, Star, Calendar, Tag } from 'lucide-react';
import Image from 'next/image';

export default function CampaignPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;
  
  const { 
    getCampaignById, 
    getTeamsByCampaign, 
    setSelectedCampaign 
  } = useCampaignStore();

  const campaign = getCampaignById(campaignId);
  const teams = getTeamsByCampaign(campaignId);
  
  const recommendedTeams = teams.filter(team => team.isRecommended);
  const allTeams = teams;

  useEffect(() => {
    if (campaign) {
      setSelectedCampaign(campaign);
    }
  }, [campaign, setSelectedCampaign]);

  if (!campaign) {
    return (
      <div className="container max-w-6xl mx-auto p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Campaign not found</h1>
          <Button onClick={() => router.push('/home')} className="mt-4">
            Back to Campaigns
          </Button>
        </div>
      </div>
    );
  }

  const handleTeamClick = (teamId: string) => {
    router.push(`/teams/${teamId}`);
  };

  const handleCreateTeam = () => {
    router.push(`/campaigns/${campaignId}/teams/create`);
  };

  return (
    <div className="container max-w-6xl mx-auto p-4 space-y-6">
      {/* Campaign Header */}
      <div className="space-y-4">
        <div className="relative h-64 rounded-lg overflow-hidden">
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <Badge className="mb-2">{campaign.category}</Badge>
            <h1 className="text-3xl font-bold">{campaign.title}</h1>
            <p className="text-sm opacity-90">Organized by {campaign.organizer}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-sm space-y-1">
                <div>Start: {new Date(campaign.startDate).toLocaleDateString()}</div>
                <div>End: {new Date(campaign.endDate).toLocaleDateString()}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Teams
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-sm space-y-1">
                <div>{campaign.totalTeams} teams joined</div>
                <div>{campaign.maxTeams - campaign.totalTeams} spots left</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1">
                {campaign.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm">{campaign.description}</p>
        </div>
      </div>

      {/* Teams Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Teams</h2>
          <Button onClick={handleCreateTeam}>
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>

        <Tabs defaultValue="recommended" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="recommended" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Recommended
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              All Teams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="space-y-4">
            {recommendedTeams.length > 0 ? (
              recommendedTeams.map((team) => (
                <TeamCard key={team.id} team={team} onClick={() => handleTeamClick(team.id)} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No recommended teams yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {allTeams.length > 0 ? (
              allTeams.map((team) => (
                <TeamCard key={team.id} team={team} onClick={() => handleTeamClick(team.id)} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No teams available yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function TeamCard({ team, onClick }: { team: any; onClick: () => void }) {
  const progress = (team.members.length / team.maxMembers) * 100;

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{team.name}</CardTitle>
            <CardDescription className="line-clamp-2">{team.description}</CardDescription>
          </div>
          {team.isRecommended && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              Recommended
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Members</span>
          <span className="font-medium">{team.members.length} / {team.maxMembers}</span>
        </div>
        
        <div className="flex -space-x-2">
          {team.members.slice(0, 4).map((member: any) => (
            <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
          {team.members.length > 4 && (
            <Avatar className="h-8 w-8 border-2 border-background bg-muted">
              <AvatarFallback>+{team.members.length - 4}</AvatarFallback>
            </Avatar>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1">
          {team.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}