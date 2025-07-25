'use client'

import * as React from 'react'

const categories = [
  { id: 'body', name: '身', label: '身体活动' },
  { id: 'mind', name: '脑', label: '智力活动' },
  { id: 'heart', name: '心', label: '情感活动' },
  { id: 'hands', name: '手', label: '手工活动' }
]

const hobbiesData = {
  body: [
    { id: 1, name: '跑步', icon: '🏃' },
    { id: 2, name: '游泳', icon: '🏊' },
    { id: 3, name: '瑜伽', icon: '🧘' },
    { id: 4, name: '骑行', icon: '🚴' },
    { id: 5, name: '徒步', icon: '🥾' },
    { id: 6, name: '健身', icon: '💪' }
  ],
  mind: [
    { id: 7, name: '阅读', icon: '📚' },
    { id: 8, name: '下棋', icon: '♟️' },
    { id: 9, name: '编程', icon: '💻' },
    { id: 10, name: '数独', icon: '🔢' },
    { id: 11, name: '写作', icon: '✍️' },
    { id: 12, name: '学习', icon: '📖' }
  ],
  heart: [
    { id: 13, name: '音乐', icon: '🎵' },
    { id: 14, name: '电影', icon: '🎬' },
    { id: 15, name: '绘画', icon: '🎨' },
    { id: 16, name: '摄影', icon: '📸' },
    { id: 17, name: '舞蹈', icon: '💃' },
    { id: 18, name: '唱歌', icon: '🎤' }
  ],
  hands: [
    { id: 19, name: '烹饪', icon: '👨‍🍳' },
    { id: 20, name: '园艺', icon: '🌱' },
    { id: 21, name: '木工', icon: '🔨' },
    { id: 22, name: '编织', icon: '🧶' },
    { id: 23, name: '陶艺', icon: '🏺' },
    { id: 24, name: '书法', icon: '✒️' }
  ]
}

export default function Hobbies() {
  const [activeTab, setActiveTab] = React.useState('body')

  return (
    <div className="max-w-4xl mx-auto">
      <div 
        className="flex rounded-b-lg"
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }}
      >
        {/* Left Column - Tabs */}
        <div className="w-32 border-r border-gray-200 p-4">
          <div className="flex flex-col space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === category.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Grid Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {hobbiesData[activeTab as keyof typeof hobbiesData].map((hobby) => (
              <div
                key={hobby.id}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
              >
                <div className="text-2xl mb-2">{hobby.icon}</div>
                <span className="text-sm font-medium text-gray-700">{hobby.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
