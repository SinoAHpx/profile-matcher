import Hobbies from "@/components/hobbies";
import { AdvancedInput } from "@/components/ui/advanced-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TestPage() {
  return (
    <div className="flex flex-col bg-[#FFF] justify-center h-full container mx-auto p-4 space-y-16">
      <Input className="h-15" placeholder="这个是input" />
      <AdvancedInput className="h-15" title="hi">
        <Hobbies />
      </AdvancedInput>
      <Button className="h-15">下一步</Button>

      <Button variant={"outline"} className="h-15">
        下一步
      </Button>
    </div>
  );
}
