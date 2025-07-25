import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProfilePage = () => {
  return (
    <div className="bg-white text-gray-800 flex flex-col items-center font-sans p-10 pb-32">
      <div className="w-full max-w-md mx-auto space-y-4">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 p-4">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Chill</h1>
            <p className="text-gray-500">INFJ 设计师</p>
          </div>
          <Avatar className="w-30 h-30 ml-auto">
            <AvatarImage
              src="./avatar.webp"
              alt="Alpha"
              className="object-cover"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>

        {/* Quote */}
        <div className="flex flex-col my-8 px-4 space-y-6">
          <span className="text-8xl h-10 text-gray-300 font-serif">“</span>
          <p className="text-xl font-semibold text-center">灭杀一切邪恶。</p>
          <span className="text-8xl h-10 text-end text-gray-300 font-serif">
            ”
          </span>
        </div>

        {/* Bio */}
        <Card className="my-4 shadow-none border-none">
          <CardContent className="p-4 rounded-lg">
            <p className="text-gray-600 leading-relaxed">
              把孤独酿成酒与旧梦对饮尽 <br />
              山河远阔不敌我胸中万丈云 <br />
              在废墟上种花等待黎明生长 <br />
              以瓦砾作琴仍奏星辰的赞歌 <br />
              雨落长街我听铁马冰河回响 <br />
              宁作人间惊雷不作温顺微光 <br />
              破晓之前我已与黑暗议和过 <br />
              让灵魂立于风口守望时代回旋 <br />
              半盏孤灯也敢涉远海万里浪 <br />
              心有山海静观浮世画卷翻涌 <br />
              纵身入夜仍携烛火等天明去 <br />
              我以温柔为矛刺透荒芜岁月 <br />
              借星河之光为自由镀一层甲 <br />
              穿越尘嚣只为守护内心旷野 <br />
              嘴里含雪仍要说出烈火真言 <br />
              世界多暗沉我偏偏要炽亮地 <br />
              把颤抖握紧化作击铁的韧性 <br />
              行至水穷处仍举杯敬风月长 <br />
              孤雁向南我向自由更深处遥 <br />
              眼底藏雷霆却轻声吻过花瓣 <br />
              醒后仍是少年不肯与苟且和解 <br />
              以浪漫对抗荒芜以信念策马 <br />
              风雪千山我自横笛向阳而行 <br />
            </p>
          </CardContent>
        </Card>

        <Card className="my-4 shadow-none border-none">
          <CardContent className="p-4 rounded-lg">
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </CardContent>
        </Card>

        {/* Hobbies */}
        <div className="flex justify-start space-x-2 p-4 overflow-x-auto">
          <Badge variant="outline" className="px-4 py-2 rounded-full">
            羽毛球
          </Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full">
            篮球
          </Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full">
            健身
          </Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full">
            野营
          </Badge>
        </div>

        {/* 底部导航 */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center gap-10 items-center p-4 bg-gradient-to-t from-white to-transparent z-40">
          <button className="text-center">
            <div className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-8 h-8 bg-[#5c5c5c] rounded-full"></div>
            </div>
            <p>自我</p>
          </button>
          <button className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-shadow">
              {/* 社群 icon */}
              <div className="w-8 h-8 relative flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * 2 * Math.PI;
                  const x = Math.cos(angle) * 10;
                  const y = Math.sin(angle) * 10;
                  return (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-gray-400"
                      style={{
                        top: `calc(50% + ${y}px)`,
                        left: `calc(50% + ${x}px)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <p>社群</p>
          </button>
        </div>

        <div
          className="bottom-0 left-0 right-0 h-40 -mb-30 rounded-t-2xl max-w-md"
          style={{
            background:
              "linear-gradient(to top, #FFF 50%, rgba(92, 92, 92, 0.67))",
          }}
        >
          <div className="text-center p-4 text-[#FFF] mb-4 text-sm">
            向上滑动以探索Echo
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
