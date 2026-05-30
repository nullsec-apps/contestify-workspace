import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useContests } from '../hooks/useContests'
import { PLATFORM_LIST } from '../lib/platforms'
import { STAGES, type StageId } from '../lib/stages'
import toast from 'react-hot-toast'

export default function AddContestDialog() {
  const add = useContests((s) => s.add)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState('devpost')
  const [prize, setPrize] = useState('')
  const [stage, setStage] = useState<StageId>('idea')
  const [days, setDays] = useState('3')

  function submit() {
    if (!title.trim()) { toast.error('Title required'); return }
    add({
      id: 'm' + Date.now(),
      title: title.trim(),
      platform,
      stage,
      deadline: Date.now() + (parseFloat(days) || 3) * 864e5,
      prize: prize.trim() || 'TBD',
      updatedAt: Date.now(),
      source: PLATFORM_LIST.find((p) => p.id === platform)?.name,
    })
    toast.success('Contest added', { style: { background: '#191C23', color: '#F4F1EA', border: '1px solid #3DE3A0' } })
    setOpen(false); setTitle(''); setPrize(''); setDays('3')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-[#FF5C3A] hover:bg-[#FF5C3A]/90 text-white transition-all duration-200">
          <Plus size={16} className="mr-1" /> Add Contest
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#191C23] border-white/10 text-[#F4F1EA]">
        <DialogHeader><DialogTitle className="font-display">Add a contest manually</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-[#8A8F9C]">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Summer Logo Sprint" className="bg-black/30 border-white/10 mt-1 h-11" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-[#8A8F9C]">Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="bg-black/30 border-white/10 mt-1 h-11"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#191C23] border-white/10 text-[#F4F1EA]">
                  {PLATFORM_LIST.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-[#8A8F9C]">Stage</Label>
              <Select value={stage} onValueChange={(v) => setStage(v as StageId)}>
                <SelectTrigger className="bg-black/30 border-white/10 mt-1 h-11"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#191C23] border-white/10 text-[#F4F1EA]">
                  {STAGES.map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-[#8A8F9C]">Prize</Label>
              <Input value={prize} onChange={(e) => setPrize(e.target.value)} placeholder="$1,000" className="bg-black/30 border-white/10 mt-1 h-11" />
            </div>
            <div>
              <Label className="text-xs text-[#8A8F9C]">Deadline (days)</Label>
              <Input type="number" value={days} onChange={(e) => setDays(e.target.value)} className="bg-black/30 border-white/10 mt-1 h-11" />
            </div>
          </div>
          <Button onClick={submit} className="w-full bg-[#FF5C3A] hover:bg-[#FF5C3A]/90 text-white h-11 transition-all duration-200">Add to board</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}