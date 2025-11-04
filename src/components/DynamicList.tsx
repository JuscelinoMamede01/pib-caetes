import React from 'react'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

type Item = { label: string; content: string }

// internal items include stable ids for dnd-kit
type InternalItem = Item & { id: string }

interface Props {
  items?: Item[]
  onChange?: (items: Item[]) => void
}

function SortableItem({ id, item, onEdit, onRemove }: { id: string; item: InternalItem; onEdit: () => void; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="bg-slate-700 p-3 rounded-md">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-neutral-100">{item.label}</div>
          <div className="text-sm text-neutral-100/80">{item.content}</div>
        </div>
        <div className="flex items-center space-x-2">
          <GripVertical className="cursor-grab text-neutral-100/80 hover:text-neutral-100 touch-none" {...attributes} {...listeners} />
          <button type="button" onClick={onEdit} className="text-xs text-neutral-100/80 hover:text-neutral-100">Editar</button>
          <button type="button" onClick={onRemove} className="text-xs text-rose-400 hover:text-rose-300">Remover</button>
        </div>
      </div>
    </div>
  )
}

export function DynamicList({ items = [], onChange }: Props) {
  // map incoming items to internal items with stable ids
  const makeInternal = (itemsIn: Item[]) =>
    itemsIn.map((it) => ({ id: `${Math.random().toString(36).slice(2, 9)}-${Date.now()}`, ...it }))

  const [local, setLocal] = React.useState<InternalItem[]>(makeInternal(items))
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null)
  const [draft, setDraft] = React.useState<Item>({ label: '', content: '' })
  const [mode, setMode] = React.useState<'insert' | 'edit' | null>(null)

  React.useEffect(() => {
    // recreate internal list when prop items change
    setLocal(makeInternal(items))
  }, [items])

  const pushChange = (next: InternalItem[]) => {
    setLocal(next)
  // expose items without internal ids to parent
  onChange?.(next.map((x) => ({ label: x.label, content: x.content })))
  }

  function startAdd(atIndex: number) {
    setMode('insert')
    setEditingIndex(atIndex)
    setDraft({ label: '', content: '' })
  }

  function startEdit(index: number) {
    setMode('edit')
    setEditingIndex(index)
    setDraft(local[index] ?? { label: '', content: '' })
  }

  function save() {
    if (editingIndex == null || mode == null) return
    const next = [...local]
    if (mode === 'insert') {
      // create internal id for inserted item
      next.splice(editingIndex, 0, { id: `${Math.random().toString(36).slice(2, 9)}-${Date.now()}`, ...draft })
    } else {
      // edit
      next[editingIndex] = { ...next[editingIndex], ...draft }
    }
    pushChange(next)
    setEditingIndex(null)
    setDraft({ label: '', content: '' })
    setMode(null)
  }

  function cancel() {
    setEditingIndex(null)
    setDraft({ label: '', content: '' })
    setMode(null)
  }

  function removeAt(i: number) {
    const next = [...local]
    next.splice(i, 1)
    pushChange(next)
  }

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 0 } })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = local.findIndex((i) => i.id === String(active.id))
      const newIndex = local.findIndex((i) => i.id === String(over.id))
      if (oldIndex >= 0 && newIndex >= 0) {
        const next = arrayMove(local, oldIndex, newIndex)
        pushChange(next)
      }
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={local.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {local.map((it, idx) => (
            <SortableItem key={it.id} id={it.id} item={it} onEdit={() => startEdit(idx)} onRemove={() => removeAt(idx)} />
          ))}

          {/* Add at end button */}
          <div className="flex items-center space-x-2">
            <button type="button" onClick={() => startAdd(local.length)} className="px-3 py-1 rounded bg-slate-600 text-neutral-100 text-sm">+ Adicionar item</button>
          </div>

          {/* Inline editor */}
          {editingIndex !== null && (
            <div className="mt-2 p-3 bg-slate-800 rounded-md">
              <div className="flex flex-col space-y-2">
                <input
                  className="w-full px-3 py-2 rounded-md bg-slate-700 text-neutral-100 border border-slate-600"
                  placeholder="Insira seu título. Ex: Leitura Responsiva"
                  value={draft.label}
                  onChange={(e) => setDraft((d) => ({ ...d, label: e.target.value }))}
                />
                <input
                  className="w-full px-3 py-2 rounded-md bg-slate-700 text-neutral-100 border border-slate-600"
                  placeholder="Conteúdo"
                  value={draft.content}
                  onChange={(e) => setDraft((d) => ({ ...d, content: e.target.value }))}
                />
                <div className="flex space-x-2 justify-end">
                  <button type="button" onClick={cancel} className="px-3 py-1 rounded bg-slate-600 text-neutral-100 text-sm">Cancelar</button>
                  <button type="button" onClick={save} className="px-3 py-1 rounded bg-slate-600 text-neutral-100 text-sm">Salvar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default DynamicList

