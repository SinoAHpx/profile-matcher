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

interface ActivityStore {
  activities: Activity[]
  searchQuery: string

  // 当前正在进行自我介绍的活动 ID （首次进入时设定）
  currentActivityId: number | null

  // Actions
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
}

export const useActivityStore = create<ActivityStore>()(
  persist(
    (set, get) => ({
      activities: [
        {
          id: 1,
          title: "AdeventureX",
          date: "7.23-7.27",
          location: "杭州",
          description: "全国最大的黑客松",
          colorClass: "bg-[#f5894f]",
        },
        {
          id: 2,
          title: "年轻人入乡",
          date: "7.23-7.27",
          location: "昆山",
          description: "小红村大会与瓶行宇宙社会创新节",
          colorClass: "bg-[#488ccd]",
        },
        {
          id: 3,
          title: "羽毛球混双",
          date: "7月28日",
          location: "3km",
          description: "杭州市余杭区未来科技城体育馆",
          colorClass: "bg-[#a7a7a7]",
          hasBeta: true,
        },
        {
          id: 4,
          title: "羽毛球混双",
          date: "7月28日",
          location: "3km",
          description: "杭州市余杭区未来科技城体育馆",
          colorClass: "bg-[#a7a7a7]",
          hasBeta: true,
        },
        {
          id: 5,
          title: "羽毛球混双",
          date: "7月28日",
          location: "3km",
          description: "杭州市余杭区未来科技城体育馆",
          colorClass: "bg-[#a7a7a7]",
          hasBeta: true,
        },
        {
          id: 6,
          title: "羽毛球混双",
          date: "7月28日",
          location: "3km",
          description: "杭州市余杭区未来科技城体育馆",
          colorClass: "bg-[#a7a7a7]",
          hasBeta: true,
        },
        {
          id: 7,
          title: "羽毛球混双",
          date: "7月28日",
          location: "3km",
          description: "杭州市余杭区未来科技城体育馆",
          colorClass: "bg-[#a7a7a7]",
          hasBeta: true,
        },
      ],
      searchQuery: '',

      currentActivityId: null,

      setActivities: (activities) => set({ activities }),

      addActivity: (activity) => {
        const { activities } = get()
        const newActivity = {
          ...activity,
          id: Math.max(...activities.map(a => a.id), 0) + 1,
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
      }
    }),
    {
      name: 'activity-store',
    }
  )
)