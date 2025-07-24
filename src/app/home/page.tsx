'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCampaignStore } from '@/stores/campaign';
import { Campaign } from '@/types/campaign';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, Tag, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const { campaigns, initializeMockData } = useCampaignStore();

  useEffect(() => {
    initializeMockData();
  }, [initializeMockData]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleCampaignClick = (campaignId: string) => {
    router.push(`/campaigns/${campaignId}`);
  };

  return (
    <div className="container max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
        <p className="text-muted-foreground">
          Join exciting campaigns and collaborate with talented teams
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onClick={() => handleCampaignClick(campaign.id)}
          />
        ))}
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">No campaigns available</div>
        </div>
      )}
    </div>
  );
}

function CampaignCard({ campaign, onClick }: { campaign: Campaign; onClick: () => void }) {
  const progress = (campaign.totalTeams / campaign.maxTeams) * 100;
  const daysLeft = Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <div className="relative h-48">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur">
            {campaign.category}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-1">{campaign.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {campaign.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Ends {formatDate(campaign.endDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{campaign.totalTeams} / {campaign.maxTeams} teams</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Teams</span>
            <span className="font-medium">{progress.toFixed(0)}% full</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex flex-wrap gap-1">
          {campaign.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {campaign.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{campaign.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" variant="ghost">
          View Campaign
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}