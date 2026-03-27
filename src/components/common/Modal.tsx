'use client'

interface ModalProps {
  isShowModal: boolean
  headerMessage: string
  bodyMessage: string
  onConfirm: () => void
  onCancel: () => void
}

export default function Modal({
  isShowModal,
  headerMessage,
  bodyMessage,
  onConfirm,
  onCancel,
}: ModalProps) {
  if (!isShowModal) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div className="w-full max-w-sm bg-gray-100 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-300 px-5 py-3">
          <p className="text-sm font-black tracking-widest uppercase">{headerMessage}</p>
          <button onClick={onCancel} className="text-gray-400 hover:text-black" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm text-gray-600">{bodyMessage}</p>
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-300 px-5 py-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold tracking-widest text-gray-500 uppercase hover:text-black"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-black px-4 py-2 text-xs font-bold tracking-widest text-white uppercase hover:bg-gray-800"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
