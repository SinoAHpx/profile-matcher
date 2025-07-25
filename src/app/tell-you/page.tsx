import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  return (
    <div className="flex flex-col h-full items-center justify-between p-12">
      <div className="flex justify-start w-full max-w-md">
        <h1 className="mt-10 text-6xl font-bold mb-8">讲述你</h1>
      </div>

      <div className="w-full max-w-md space-y-6">
        <Textarea placeholder="说说你自己吧" className="w-full h-[420px] resize-none" />
      </div>

      <div className="flex w-full justify-center space-x-8 mt-4">
        <Button className="flex-1 h-15" variant="outline">
          上一步
        </Button>
        <Button className="flex-1 h-15">完成</Button>
      </div>
    </div>
  );
}
