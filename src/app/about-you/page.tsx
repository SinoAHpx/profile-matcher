import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className="flex flex-col h-full items-center justify-between p-12">
      <div className='flex justify-start w-full max-w-md'>
        <h1 className="mt-30 text-6xl font-bold mb-8">关于你</h1>
      </div>
      
      <div className="w-full max-w-md space-y-6">
        <Input placeholder="你的兴趣爱好" className="w-full h-15" />
        
        <Input placeholder="MBTI" className="w-full h-15" />
        
        <Input placeholder="你最想说的一句话" className="w-full h-15" />
      </div>
    
      
      <div className="flex w-full justify-center space-x-8 mt-4">
        <Button className='flex-1 h-15' variant="outline">上一步</Button>
        <Button className='flex-1 h-15'>下一步</Button>
      </div>
    </div>
  )
}