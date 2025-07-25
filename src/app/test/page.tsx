import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TestPage() {
  return (
    <div className="flex flex-col bg-[#FFF] justify-center h-full container mx-auto p-4 space-y-8">
      <Input className='h-15' placeholder="这个是input" />
      <Button className='h-15'>下一步</Button>
      <Button variant={'outline'} className='h-15'>下一步</Button>
    </div>
  );
}