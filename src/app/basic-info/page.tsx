'use client'

import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Page() {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [nickname, setNickname] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')

    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setAvatarUrl(url)
        }
    }

    return (
        <div className="flex flex-col h-full pt-20 items-center justify-between bg-[#FFF] p-12 space-y-16">
            {/* 圆形头像上传 */}
            <div className="relative">
                <Avatar className="w-[240px] h-[240px] cursor-pointer" onClick={() => document.getElementById('avatar-upload')?.click()}>
                    <AvatarImage src={avatarUrl || undefined} alt="头像" />
                    <AvatarFallback className="bg-gray-100 text-gray-400 text-xl">
                        点击上传头像
                    </AvatarFallback>
                </Avatar>
               
                <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                />
            </div>

            {/* 用户信息输入框 */}
            <div className="w-full max-w-md space-y-6">
                <Input 
                    className="h-15" 
                    placeholder="用户名/昵称" 
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <Input 
                    className="h-15" 
                    placeholder="邮箱" 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />
                <Input 
                    className="h-15" 
                    placeholder="职业" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>

            {/* 下一步按钮 */}
            <Button className="w-full max-w-md h-15 bg-black text-white">
                下一步
            </Button>
        </div>
    )
}