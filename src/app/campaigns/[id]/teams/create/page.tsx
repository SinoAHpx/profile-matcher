'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCampaignStore } from '@/stores/campaign';
import { useAuthStore } from '@/stores/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, ArrowLeft } from 'lucide-react';

const availableTags = [
  'Frontend', 'Backend', 'Full-stack', 'Mobile', 'DevOps', 'Design',
  'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'TypeScript',
  'AWS', 'Docker', 'Kubernetes', 'UI/UX', 'Product', 'Research'
];

export default function CreateTeamPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;
  
  const { createTeam, getCampaignById } = useCampaignStore();
  const { user } = useAuthStore();

  const campaign = getCampaignById(campaignId);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    maxMembers: 4,
    tags: [] as string[],
  });

  if (!campaign) {
    return (
      <div className="container max-w-4xl mx-auto p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">活动未找到</h1>
          <Button onClick={() => router.push('/home')} className="mt-4">
            返回活动列表
          </Button>
        </div>
      </div>
    );
  }

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      return;
    }

    // Create a mock person for the current user
    const currentUserPerson = {
      id: user?.id || 'current-user',
      name: user?.name || '当前用户',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'user'}`,
      role: '团队负责人',
      skills: ['Management', 'Leadership'],
      bio: '团队创建者和项目负责人',
      joinedAt: new Date().toISOString(),
    };

    createTeam({
      name: formData.name,
      description: formData.description,
      campaignId,
      members: [currentUserPerson],
      maxMembers: formData.maxMembers,
      isRecommended: false,
      tags: formData.tags,
    });

    router.push(`/campaigns/${campaignId}`);
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      <Button 
        variant="ghost" 
        onClick={() => router.push(`/campaigns/${campaignId}`)}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        返回活动
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>创建新团队</CardTitle>
          <CardDescription>
            为 {campaign.title} 创建一个团队
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">团队名称</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="输入团队名称"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">团队描述</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="描述您团队的目标和重点"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>团队规模</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  maxMembers: Math.max(2, prev.maxMembers - 1) 
                }))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="text-lg font-medium w-12 text-center">
                {formData.maxMembers}
              </span>
              
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  maxMembers: Math.min(10, prev.maxMembers + 1) 
                }))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              团队最大成员数
            </p>
          </div>

          <div className="space-y-2">
            <Label>标签</Label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={formData.tags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              为您的团队选择相关的技能和技术
            </p>
          </div>

          <div className="pt-4 space-y-4">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">团队预览</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">名称:</span> {formData.name || "团队名称"}
                  </div>
                  <div>
                    <span className="font-medium">描述:</span> {formData.description || "团队描述"}
                  </div>
                  <div>
                    <span className="font-medium">最大成员数:</span> {formData.maxMembers}
                  </div>
                  <div>
                    <span className="font-medium">标签:</span> {formData.tags.join(', ') || "未选择"}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => router.push(`/campaigns/${campaignId}`)}
                className="flex-1"
              >
                取消
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!formData.name.trim() || !formData.description.trim()}
                className="flex-1"
              >
                创建团队
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}