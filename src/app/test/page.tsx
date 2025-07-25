import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TestPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Page with UI Components</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Sample Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a sample card component.</p>
        </CardContent>
      </Card>
      
      <div className="mb-4">
        <Label htmlFor="sample-input">Sample Input</Label>
        <Input id="sample-input" placeholder="Enter something" />
      </div>
      
      <Button>Click Me</Button>
    </div>
  );
}