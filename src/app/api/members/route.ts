import { NextResponse } from 'next/server'

// Mock members data – 在实际项目中可替换为后端数据
const MOCK_MEMBERS = [
    {
        id: 1,
        activityId: 1,
        teamId: 1,
        name: '阿尔法',
        avatar: '/avatar.webp',
        quote: '热爱挑战，期待合作！',
        mbti: 'INTJ',
        description: '算法工程师 / LLM Enthusiast',
        tags: ['LLM', 'Go', 'AI'],
    },
    {
        id: 2,
        activityId: 1,
        teamId: 2,
        name: '贝塔',
        avatar: '/avatar.webp',
        quote: '设计即生活。',
        mbti: 'ENFP',
        description: '产品设计师 / Web3 Lover',
        tags: ['Design', 'Figma'],
    },
    {
        id: 3,
        activityId: 2,
        teamId: 3,
        name: '查理',
        avatar: '/avatar.webp',
        quote: '代码改变世界。',
        mbti: 'ISTP',
        description: '全栈开发 / DevOps',
        tags: ['React', 'Docker'],
    },
    {
        id: 4,
        activityId: 2,
        teamId: 3,
        name: '达尔文',
        avatar: '/avatar.webp',
        quote: '创新源于好奇心。',
        mbti: 'ENTJ',
        description: '创业者 / 商业策略',
        tags: ['Startup', 'Strategy'],
    },
    {
        id: 5,
        activityId: 3,
        teamId: 4,
        name: 'Echo',
        avatar: '/avatar.webp',
        quote: 'Keep pushing boundaries.',
        mbti: 'ENTP',
        description: 'AI Researcher',
        tags: ['Python', 'NLP'],
    },
    {
        id: 6,
        activityId: 3,
        teamId: 4,
        name: 'Foxtrot',
        avatar: '/avatar.webp',
        quote: 'Design for people.',
        mbti: 'INFJ',
        description: 'UX Designer',
        tags: ['UX', 'Accessibility'],
    },
]

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const activityIdParam = searchParams.get('activityId')
    const teamIdParam = searchParams.get('teamId')

    let data = [...MOCK_MEMBERS]

    if (teamIdParam) {
        const teamId = Number(teamIdParam)
        data = data.filter((m) => m.teamId === teamId)
    } else if (activityIdParam) {
        const activityId = Number(activityIdParam)
        data = data.filter((m) => m.activityId === activityId)
    }

    return NextResponse.json(data)
} 