import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProfilePage = () => {
  return (
    <div className="bg-white text-gray-800 flex flex-col items-center font-sans p-10">
      <div className="w-full max-w-md mx-auto space-y-4">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 p-4">
          <div>
            <h1 className="text-4xl font-bold">Alpha</h1>
            <p className="text-gray-500">INFJ   设计师</p>
          </div>
          <Avatar className="w-30 h-30 ml-auto">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Alpha" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>

        {/* Quote */}
        <div className="flex flex-col my-8 px-4 space-y-6">
            <span className="text-8xl h-10 text-gray-300 font-serif">“</span>
            <p className="text-xl font-semibold text-center">灭杀一切邪恶。</p>
            <span className="text-8xl h-10 text-end text-gray-300 font-serif">”</span>
        </div>

        {/* Bio */}
        <Card className="my-4 shadow-none border-none">
          <CardContent className="p-4 rounded-lg">
            <p className="text-gray-600 leading-relaxed">
            我来自一座黄沙漫天的小镇,毕业于湿热阴沉的海滨,base杭州,平时喜欢打羽毛球、健身,最近在研究3D打印机,有兴趣的友友可以联系我!
            </p>
          </CardContent>
        </Card>


        {/* Hobbies */}
        <div className="flex justify-start space-x-2 p-4 overflow-x-auto">
          <Badge variant="outline" className="px-4 py-2 rounded-full">羽毛球</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full">篮球</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full">健身</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full">野营</Badge>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-0 left-0 right-0 p-6 rounded-t-2xl max-w-md"
             style={{
               background: 'linear-gradient(to top, #FFF 50%, rgba(92, 92, 92, 0.67))'
             }}>
            <div className="text-center text-[#FFF] mb-4 text-sm">向上滑动以探索Echo</div>
            <div className="flex justify-around items-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                        <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                    </div>
                    <p>自我</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                        {/* Placeholder for社群 icon */}
                        <div className="w-8 h-8 bg-gray-300 rounded-full relative">
                            <div className="absolute w-2 h-2 bg-white rounded-full top-1/2 left-1/2 -mt-1 -ml-1"></div>
                            <div className="absolute w-2 h-2 bg-white rounded-full top-2 left-2"></div>
                            <div className="absolute w-2 h-2 bg-white rounded-full top-2 right-2"></div>
                            <div className="absolute w-2 h-2 bg-white rounded-full bottom-2 left-2"></div>
                            <div className="absolute w-2 h-2 bg-white rounded-full bottom-2 right-2"></div>
                            <div className="absolute w-2 h-2 bg-white rounded-full top-1/2 left-1 -mt-1"></div>
                            <div className="absolute w-2 h-2 bg-white rounded-full top-1/2 right-1 -mt-1"></div>
                            <div className="absolute w-2 h-2 bg-white rounded-full top-1 left-1/2 -ml-1"></div>
                            <div className="absolute w-2 h-2 bg-white rounded-full bottom-1 left-1/2 -ml-1"></div>
                        </div>
                    </div>
                    <p>社群</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;