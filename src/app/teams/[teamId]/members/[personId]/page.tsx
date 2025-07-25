'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCampaignStore } from '@/stores/campaign';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Briefcase, Calendar, MapPin, Link2 } from 'lucide-react';
import Image from 'next/image';

export default function PersonPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = params.teamId as string;
  const personId = params.personId as string;
  
  const { getPersonById, getTeamById } = useCampaignStore();
  
  const person = getPersonById(personId);
  const team = getTeamById(teamId);

  if (!person || !team) {
    return (
      <div className="container max-w-4xl mx-auto p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">未找到成员</h1>
          <Button onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      <Button 
        variant="ghost" 
        onClick={() => router.push(`/teams/${teamId}`)} 
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        返回 {team.name}
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback className="text-2xl">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h1 className="text-2xl font-bold">{person.name}</h1>
                  <p className="text-muted-foreground">{person.role}</p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {person.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  联系
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{person.role}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>加入于 {new Date(person.joinedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>远程</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>关于</CardTitle>
              <CardDescription>了解更多关于 {person.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{person.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>技能和专长</CardTitle>
              <CardDescription>专业技能和专业领域</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {person.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>团队信息</CardTitle>
              <CardDescription>当前团队归属</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{team.name}</h3>
                  <p className="text-sm text-muted-foreground">{team.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => router.push(`/teams/${teamId}`)}
                >
                  查看团队
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>最近活动</CardTitle>
              <CardDescription>最新贡献和更新</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-medium">加入了 {team.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(person.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-medium">技能已更新</p>
                    <p className="text-xs text-muted-foreground">
                      增加了 {person.skills[0]} 和 {person.skills[1]} 方面的专长
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}