'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreateTeamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateTeam: (teamData: { name: string; description: string }) => void
  activityId?: string
}

export function CreateTeamDialog({
  open,
  onOpenChange,
  onCreateTeam,
  activityId
}: CreateTeamDialogProps) {
  const [teamName, setTeamName] = useState('')
  const [description, setDescription] = useState('')

  const handleCreate = () => {
    if (!teamName.trim()) return

    onCreateTeam({
      name: teamName,
      description
    })

    // Reset form
    setTeamName('')
    setDescription('')
    onOpenChange(false)
  }

  const handleCancel = () => {
    setTeamName('')
    setDescription('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-left">
            <div className="flex flex-row justify-start items-center">
              <div className="w-1 h-10 bg-gray-300 mr-2"></div>
              <span>创建队伍</span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-left">
            为你的活动创建一个新的队伍
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="teamName">队伍名称</Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="输入队伍名称"
              className="w-full"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">队伍描述</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="描述你的队伍目标和需求"
              rows={4}
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter>
          <div className="flex flex-row justify-center w-full gap-4 ">
            <Button className="flex-1 h-10" variant="outline" onClick={handleCancel}>
              取消
            </Button>
            <Button className="flex-1 h-10" onClick={handleCreate} disabled={!teamName.trim()}>
              创建队伍  
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Custom hook for easier usage
export function useCreateTeamDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return {
    isOpen,
    setIsOpen,
    CreateTeamDialog: (props: Omit<CreateTeamDialogProps, 'open' | 'onOpenChange'>) => (
      <CreateTeamDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        {...props}
      />
    )
  }
}