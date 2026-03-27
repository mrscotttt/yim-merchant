import { SITE_CONFIG } from '@/mocks/config'

export default function AnnouncementBar() {
  return (
    <div className="bg-black py-2 text-center text-xs font-semibold tracking-widest text-white uppercase">
      {SITE_CONFIG.announcement}
    </div>
  )
}
