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
          <h1 className="text-2xl font-bold">Campaign not found</h1>
          <Button onClick={() => router.push('/home')} className="mt-4">
            Back to Campaigns
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
      name: user?.name || 'Current User',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'user'}`,
      role: 'Team Lead',
      skills: ['Management', 'Leadership'],
      bio: 'Team creator and project lead',
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
        Back to Campaign
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create New Team</CardTitle>
          <CardDescription>
            Create a team for {campaign.title}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Team Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter team name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Team Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your team's goals and focus"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Team Size</Label>
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
              Maximum number of team members
            </p>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
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
              Select relevant skills and technologies for your team
            </p>
          </div>

          <div className="pt-4 space-y-4">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Team Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Name:</span> {formData.name || "Team Name"}
                  </div>
                  <div>
                    <span className="font-medium">Description:</span> {formData.description || "Team description"}
                  </div>
                  <div>
                    <span className="font-medium">Max Members:</span> {formData.maxMembers}
                  </div>
                  <div>
                    <span className="font-medium">Tags:</span> {formData.tags.join(', ') || "None selected"}
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
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!formData.name.trim() || !formData.description.trim()}
                className="flex-1"
              >
                Create Team
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}