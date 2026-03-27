import { ProductFilter } from '../controller/useController'

interface ProductFilterProps {
  filter: ProductFilter
  onUpdate: (patch: Partial<ProductFilter>) => void
  onReset: () => void
}

export default function ProductFilterView({ filter, onUpdate, onReset }: ProductFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Name</label>
        <input
          type="text"
          placeholder="Search..."
          value={filter.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="h-9 w-48 border border-gray-300 px-3 text-sm focus:border-black focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Min ฿</label>
        <input
          type="number"
          placeholder="0"
          value={filter.minPrice}
          onChange={(e) =>
            onUpdate({ minPrice: e.target.value === '' ? '' : Number(e.target.value) })
          }
          className="h-9 w-28 border border-gray-300 px-3 text-sm focus:border-black focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Max ฿</label>
        <input
          type="number"
          placeholder="99999"
          value={filter.maxPrice}
          onChange={(e) =>
            onUpdate({ maxPrice: e.target.value === '' ? '' : Number(e.target.value) })
          }
          className="h-9 w-28 border border-gray-300 px-3 text-sm focus:border-black focus:outline-none"
        />
      </div>

      <button
        onClick={onReset}
        className="h-9 border border-black px-4 text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white"
      >
        Reset
      </button>
    </div>
  )
}
