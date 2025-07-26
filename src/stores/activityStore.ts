import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Activity {
  id: number
  title: string
  date: string
  location: string
  description: string
  colorClass: string
  hasBeta?: boolean

  // 用户在首次进入活动时填写的自我介绍信息
  introduction?: {
    message: string
    // 预留字段: 未来可扩展技能等
    skills?: string[]
  }
}

// 队伍
export interface Team {
  id: number
  activityId: number
  title: string
  description: string
  color: string
  dots: number[]
}

// 成员/选手
export interface Member {
  id: number
  activityId: number
  teamId: number
  name: string
  avatar: string
  quote: string
  mbti: string
  description: string
  tags: string[]
}

interface ActivityStore {
  activities: Activity[]
  teams: Team[]
  members: Member[]
  searchQuery: string

  // 当前正在进行自我介绍的活动 ID （首次进入时设定）
  currentActivityId: number | null

  // Activity Actions
  setActivities: (activities: Activity[]) => void
  addActivity: (activity: Omit<Activity, 'id'>) => void

  /** 设置当前需要填写介绍的活动 ID */
  setCurrentActivityId: (id: number | null) => void

  /** 保存某个活动的自我介绍信息 */
  setActivityIntroduction: (
    id: number,
    introduction: { message: string; skills?: string[] }
  ) => void

  /** 根据 id 获取活动 */
  getActivityById: (id: number) => Activity | undefined
  setSearchQuery: (query: string) => void
  getFilteredActivities: () => Activity[]

  // Team Actions
  setTeams: (teams: Team[]) => void
  addTeam: (team: Omit<Team, 'id'>) => void

  // Member Actions
  setMembers: (members: Member[]) => void
  addMember: (member: Omit<Member, 'id'>) => void
}

export const useActivityStore = create<ActivityStore>()(
  persist(
    (set, get) => ({
      activities: [],
      teams: [],
      members: [],
      searchQuery: '',

      currentActivityId: null,

      setActivities: (activities) => set({ activities }),

      addActivity: (activity) => {
        const { activities } = get()
        const newActivity = {
          ...activity,
          id: activities.length ? Math.max(...activities.map(a => a.id)) + 1 : 1,
        }
        set({ activities: [...activities, newActivity] })
      },

      setCurrentActivityId: (id) => set({ currentActivityId: id }),

      setActivityIntroduction: (id, introduction) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id ? { ...activity, introduction } : activity
          ),
        }))
      },

      getActivityById: (id) => {
        const { activities } = get()
        return activities.find((a) => a.id === id)
      },

      setSearchQuery: (searchQuery) => set({ searchQuery }),

      getFilteredActivities: () => {
        const { activities, searchQuery } = get()
        if (!searchQuery) return activities

        return activities.filter(activity =>
          activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      },

      // Team Operations
      setTeams: (teams) => set({ teams }),

      addTeam: (team) => {
        const { teams } = get()
        const newTeam = {
          ...team,
          id: teams.length ? Math.max(...teams.map(t => t.id)) + 1 : 1,
        }
        set({ teams: [...teams, newTeam] })
      },

      // Member Operations
      setMembers: (members) => set({ members }),

      addMember: (member) => {
        const { members } = get()
        const newMember = {
          ...member,
          id: members.length ? Math.max(...members.map(m => m.id)) + 1 : 1,
        }
        set({ members: [...members, newMember] })
      }
    }),
    {
      name: 'activity-store',
    }
  )
)