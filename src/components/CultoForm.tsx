'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import DynamicList from '@/components/DynamicList'
import { DatePicker } from '@/components/ui/date-picker'

type Item = { label: string; content: string }

export function CultoForm() {
  const [customItems, setCustomItems] = React.useState<Item[]>(() => {
    const saved = localStorage.getItem('cultoItems')
    console.log('Initializing items from localStorage:', saved)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error parsing saved items on init', e)
        return []
      }
    }
    return []
  })
  const [dataCulto, setDataCulto] = React.useState<string | undefined>(() => {
    const saved = localStorage.getItem('cultoDate')
    console.log('Initializing date from localStorage:', saved)
    return saved || undefined
  })
  const [isSending, setIsSending] = React.useState(false)

  useEffect(() => {
    console.log('Saving items:', customItems)
    localStorage.setItem('cultoItems', JSON.stringify(customItems))
  }, [customItems])

  useEffect(() => {
    console.log('Saving date:', dataCulto)
    if (dataCulto) {
      localStorage.setItem('cultoDate', dataCulto)
    } else {
      localStorage.removeItem('cultoDate')
    }
  }, [dataCulto])

  useEffect(() => {
    console.log('Saving items:', customItems)
    localStorage.setItem('cultoItems', JSON.stringify(customItems))
  }, [customItems])

  useEffect(() => {
    console.log('Saving date:', dataCulto)
    if (dataCulto) {
      localStorage.setItem('cultoDate', dataCulto)
    } else {
      localStorage.removeItem('cultoDate')
    }
  }, [dataCulto])

  function buildMessage(items: Item[], date?: string) {
    let mensagem = ' *Programação do Culto - PIB Caetés*\n\n'
    if (date) {
      // date expected in yyyy-MM-dd
      const parts = date.split('-')
      if (parts.length === 3) {
        const [ano, mes, dia] = parts
        mensagem += ` *Data:* ${dia}/${mes}/${ano}\n\n`
      }
    }
    if (items.length === 0) {
      mensagem += 'Sem itens adicionados.'
    } else {
      items.forEach((it) => {
        if (it.label) mensagem += `• ${it.label}: `
        if (it.content) mensagem += `${it.content}`
        mensagem += '\n'
      })
    }

    mensagem += '\n\nQue Deus abençoe nosso culto!'
    return mensagem
  }

  function sendToWhatsApp() {
    setIsSending(true)
    const msg = buildMessage(customItems, dataCulto)
    const encoded = encodeURIComponent(msg)
    window.open('https://wa.me/?text=' + encoded, '_blank')
    setIsSending(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 py-6 px-3 sm:py-8 sm:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 rounded-lg shadow-xl p-5 sm:p-8">
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-neutral-100 mb-1 sm:mb-2">📋 Programação do Culto</h1>
            <p className="text-xs sm:text-base text-neutral-100 font-semibold">PIB Caetés</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-neutral-100 mb-2">Crie a programação do culto</h3>
              <p className="text-xs text-neutral-100/80 mb-2">Selecione a data e adicione os itens na ordem da programação.</p>
              <div className="mb-3">
                <DatePicker value={dataCulto} onChange={(v) => setDataCulto(v)} placeholder="Selecione a data do culto" />
              </div>
              <DynamicList items={customItems} onChange={setCustomItems} />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-100 mb-2">Pré-visualização</h4>
              <div className="whitespace-pre-line text-sm text-neutral-100 bg-slate-700 p-3 rounded-md">{buildMessage(customItems, dataCulto)}</div>
            </div>

            <div>
              <Button onClick={sendToWhatsApp} disabled={isSending} className="w-full bg-slate-600 hover:bg-slate-700 text-xs sm:text-sm text-neutral-100 font-bold py-2 sm:py-3 rounded-lg transition-colors shadow-lg">
                {isSending ? '⏳ Enviando...' : '📤 Enviar via WhatsApp'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CultoForm
