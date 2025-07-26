import { NextResponse } from 'next/server'

interface Team {
    id: number
    activityId: number
    title: string
    description: string
    color: string
    dots: number[]
}

// Mock data – 可根据需要扩展
const MOCK_TEAMS: Team[] = [
    {
        id: 1,
        activityId: 1,
        title: '具身机器人+洗澡',
        description: '智能硬件招募 组队',
        color: 'bg-[#488ccd]',
        dots: [1, 1, 1, 0],
    },
    {
        id: 2,
        activityId: 1,
        title: '招 Web3 开发/后端',
        description: '这边还差一名队友\n已经有较为成熟创意',
        color: 'bg-[#488ccd]',
        dots: [1, 1, 1, 0],
    },
    {
        id: 3,
        activityId: 2,
        title: '准备做 AI 生成游戏',
        description: '希望你具备扎实工程基础与极强学习能力的开发，非常熟悉 cursor 等 AI IDE',
        color: 'bg-[#f5894f]',
        dots: [1, 1, 0, 0],
    },
    {
        id: 4,
        activityId: 2,
        title: '招募平面设计师',
        description: '招募平面设计师和 AI 提示词大神 欢迎来端点 B 找我们',
        color: 'bg-[#f5894f]',
        dots: [1, 1, 0, 0],
    },
]

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const activityIdParam = searchParams.get('activityId')

    let data = [...MOCK_TEAMS]
    if (activityIdParam) {
        const activityId = Number(activityIdParam)
        data = data.filter((t) => t.activityId === activityId)
    }

    return NextResponse.json(data)
} 