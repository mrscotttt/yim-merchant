import { SITE_CONFIG } from '@/mocks/config'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black py-4 text-center text-xs tracking-widest text-gray-500 uppercase">
      © 2026 {SITE_CONFIG.name}. All Rights Reserved.
    </footer>
  )
}
