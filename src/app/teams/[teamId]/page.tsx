'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCampaignStore } from '@/stores/campaign';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, ArrowLeft, Users, Calendar, Mail, Briefcase, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function TeamPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = params.teamId as string;

  const {
    getTeamById,
    getPersonById,
    setSelectedTeam
  } = useCampaignStore();

  const team = getTeamById(teamId);

  useEffect(() => {
    if (team) {
      setSelectedTeam(team);
    }
  }, [team, setSelectedTeam]);

  if (!team) {
    return (
      <div className="container max-w-6xl mx-auto p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">团队未找到</h1>
          <Button onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
        </div>
      </div>
    );
  }

  const progress = (team.members.length / team.maxMembers) * 100;
  const openSpots = team.maxMembers - team.members.length;

  const handleMemberClick = (personId: string) => {
    router.push(`/teams/${teamId}/members/${personId}`);
  };

  const handleJoinTeam = () => {
    // TODO: Implement join team logic
    console.log('Joining team:', team.name);
  };

  return (
    <div className="container max-w-6xl mx-auto p-4 space-y-6">
      {/* Team Header */}
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回活动
        </Button>

        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{team.name}</h1>
                <p className="text-muted-foreground max-w-2xl">{team.description}</p>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{team.members.length} / {team.maxMembers} 名成员</span>
                  </div>
                  {team.isRecommended && (
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Sparkles className="h-4 w-4" />
                      <span>推荐</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">空余名额</p>
                  <p className="text-2xl font-bold">{openSpots}</p>
                </div>

                {openSpots > 0 && (
                  <Button onClick={handleJoinTeam} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    加入团队
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>团队技能和标签</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {team.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>团队成员</CardTitle>
            <CardDescription>该团队有 {team.members.length} 名成员</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.members.map((member) => (
                <Card
                  key={member.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleMemberClick(member.id)}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <p className="text-xs text-muted-foreground">加入于 {new Date(member.joinedAt).toLocaleDateString()}</p>
                    </div>

                    <div className="text-right">
                      <div className="flex flex-wrap gap-1 max-w-32">
                        {member.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                        ))}
                        {member.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs">+{member.skills.length - 2}</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {openSpots > 0 && (
          <Card className="bg-muted/50">
            <CardContent className="text-center py-6">
              <h3 className="text-lg font-semibold mb-2">准备好加入 {team.name} 了吗？</h3>
              <p className="text-muted-foreground mb-4">
                现在有 {openSpots} 个空余名额。
              </p>
              <Button onClick={handleJoinTeam} size="lg">
                <Plus className="h-4 w-4 mr-2" />
                加入团队
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}