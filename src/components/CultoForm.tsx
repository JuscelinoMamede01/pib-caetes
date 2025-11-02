'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '@/components/ui/date-picker'

const formSchema = z.object({
  dataCulto: z.string().min(1, 'Data do culto é obrigatória'),
  leituraResponsiva: z.string().optional(),
  leituraResponsivaAtiva: z.boolean(),
  musicaAbertura: z.string().optional(),
  musicaAberturaAtiva: z.boolean(),
  avisos: z.string().optional(),
  avisosAtiva: z.boolean(),
  leituraBiblica: z.string().optional(),
  leituraBiblicanAtiva: z.boolean(),
  oracaoIntercessao: z.string().optional(),
  oracaoIntercessaoAtiva: z.boolean(),
  momentoCeia: z.string().optional(),
  momentoCeiaAtiva: z.boolean(),
  oracaoCriancas: z.string().optional(),
  oracaoCriancasAtiva: z.boolean(),
  ofertorioLeitura: z.string().optional(),
  ofertorioLeituraAtiva: z.boolean(),
  ofertorioLouvor: z.string().optional(),
  ofertorioLouvorAtiva: z.boolean(),
  mensagemBiblica: z.string().optional(),
  mensagemBiblicaAtiva: z.boolean(),
  louvorFinal: z.string().optional(),
  louvorFinalAtiva: z.boolean(),
})

type CultoFormData = z.infer<typeof formSchema>

export function CultoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CultoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataCulto: '',
      leituraResponsiva: '',
      leituraResponsivaAtiva: false,
      musicaAbertura: '',
      musicaAberturaAtiva: false,
      avisos: '',
      avisosAtiva: false,
      leituraBiblica: '',
      leituraBiblicanAtiva: false,
      oracaoIntercessao: '',
      oracaoIntercessaoAtiva: false,
      momentoCeia: '',
      momentoCeiaAtiva: false,
      oracaoCriancas: '',
      oracaoCriancasAtiva: false,
      ofertorioLeitura: '',
      ofertorioLeituraAtiva: false,
      ofertorioLouvor: '',
      ofertorioLouvorAtiva: false,
      mensagemBiblica: '',
      mensagemBiblicaAtiva: false,
      louvorFinal: '',
      louvorFinalAtiva: false,
    },
  })

  function onSubmit(data: CultoFormData) {
    setIsSubmitting(true)

    // Converte data de yyyy-mm-dd para dd/mm/yyyy
    const [ano, mes, dia] = data.dataCulto.split('-')
    const dataFormatada = `${dia}/${mes}/${ano}`

    let mensagem = ' *Culto de Adoração - PIB Caetés*\n\n'
    mensagem += ' *Data:* ' + dataFormatada + '\n\n'

    if (data.leituraResponsivaAtiva && data.leituraResponsiva) {
      mensagem += ' *Leitura Responsiva:*\n' + data.leituraResponsiva + '\n\n'
    }

    if (data.musicaAberturaAtiva && data.musicaAbertura) {
      mensagem += ' *Música de Abertura:*\n' + data.musicaAbertura + '\n\n'
    }

    if (data.avisosAtiva && data.avisos) {
      mensagem += ' *Avisos:*\n' + data.avisos + '\n\n'
    }

    if (data.leituraBiblicanAtiva && data.leituraBiblica) {
      mensagem += ' *Leitura Bíblica:*\n' + data.leituraBiblica + '\n\n'
    }

    if (data.oracaoIntercessaoAtiva && data.oracaoIntercessao) {
      mensagem += ' *Oração de Intercessão:*\n' + data.oracaoIntercessao + '\n\n'
    }

    if (data.momentoCeiaAtiva && data.momentoCeia) {
      mensagem += ' *Momento da Ceia:*\n' + data.momentoCeia + '\n\n'
    }

    if (data.oracaoCriancasAtiva && data.oracaoCriancas) {
      mensagem += ' *Oração com Crianças:*\n' + data.oracaoCriancas + '\n\n'
    }

    if (data.ofertorioLeituraAtiva && data.ofertorioLeitura) {
      mensagem += ' *Ofertório - Leitura:*\n' + data.ofertorioLeitura + '\n\n'
    }

    if (data.ofertorioLouvorAtiva && data.ofertorioLouvor) {
      mensagem += ' *Ministério - Louvor:*\n' + data.ofertorioLouvor + '\n\n'
    }

    if (data.mensagemBiblicaAtiva && data.mensagemBiblica) {
      mensagem += ' *Mensagem Bíblica:*\n' + data.mensagemBiblica + '\n\n'
    }

    if (data.louvorFinalAtiva && data.louvorFinal) {
      mensagem += ' *Louvor Final:*\n' + data.louvorFinal + '\n\n'
    }

    mensagem += '\n Que Deus abençoe nosso cuLouvorlto!'

    const encodedMessage = encodeURIComponent(mensagem)
    window.open('https://wa.me/?text=' + encodedMessage, '_blank')

    setIsSubmitting(false)
  }

  const formFields = [
    { key: 'leituraResponsiva', label: ' Leitura Responsiva', placeholder: 'Salmo 100', type: 'textarea', activeKey: 'leituraResponsivaAtiva' },
    { key: 'musicaAbertura', label: ' Música de Abertura', placeholder: 'Ministério de louvor: Toma Todo o Meu Ser', type: 'input', activeKey: 'musicaAberturaAtiva' },
    { key: 'avisos', label: ' Avisos', placeholder: 'Ex: Próximas reuniões e eventos', type: 'textarea', activeKey: 'avisosAtiva' },
    { key: 'leituraBiblica', label: ' Leitura Bíblica', placeholder: 'Ex: Romanos 12:1-2', type: 'textarea', activeKey: 'leituraBiblicanAtiva' },
    { key: 'oracaoIntercessao', label: ' Oração de Intercessão', placeholder: 'Ex: Temas para oração', type: 'textarea', activeKey: 'oracaoIntercessaoAtiva' },
    { key: 'momentoCeia', label: ' Culto de Ceia', placeholder: 'Ex: Instruções ou reflexão', type: 'textarea', activeKey: 'momentoCeiaAtiva' },
    { key: 'oracaoCriancas', label: ' Oração com Crianças', placeholder: 'Ex: Temática ou versículo', type: 'textarea', activeKey: 'oracaoCriancasAtiva' },
    { key: 'ofertorioLeitura', label: ' Ofertório - Leitura', placeholder: 'Ex: Verso para reflexão', type: 'textarea', activeKey: 'ofertorioLeituraAtiva' },
    { key: 'ofertorioLouvor', label: ' Ministério de louvor', placeholder: 'Ex: Música durante ofertório', type: 'input', activeKey: 'ofertorioLouvorAtiva' },
    { key: 'mensagemBiblica', label: ' Mensagem Bíblica', placeholder: 'Ex: Resumo do sermão', type: 'textarea', activeKey: 'mensagemBiblicaAtiva' },
    { key: 'louvorFinal', label: ' Louvor Final', placeholder: 'Ex: Jesus é Rei', type: 'input', activeKey: 'louvorFinalAtiva' },
  ]

  return (
    <div className="min-h-screen bg-slate-900 py-6 px-3 sm:py-8 sm:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 rounded-lg shadow-xl p-5 sm:p-8">
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-neutral-100 mb-1 sm:mb-2">
               📋 Programação do Culto
            </h1>
            <p className="text-xs sm:text-base text-neutral-100 font-semibold">PIB Caetés</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="dataCulto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base font-semibold text-neutral-100">
                      📅 Data do Culto *
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Selecione a data do culto"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-4 sm:space-y-6 border-t-2 border-slate-600 pt-4 sm:pt-6">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-neutral-100 mb-2"> Crie sua programação</h2>
                  <p className="text-xs sm:text-sm text-neutral-100 bg-slate-700 p-2 sm:p-3 rounded-md">
                    💡 Clique no checkbox de cada elemento que terá na programação para habilitar o preenchimento das informações
                  </p>
                </div>

                {formFields.map((field) => (
                  <div key={field.key} className="p-3 sm:p-4 rounded-lg bg-slate-700">
                    <FormField
                      control={form.control}
                      name={field.activeKey as any}
                      render={({ field: checkboxField }) => (
                        <FormItem className="flex items-center justify-start space-x-3 mb-3">
                          <FormControl>
                            <Checkbox checked={checkboxField.value} onCheckedChange={checkboxField.onChange} className="border-slate-400 w-4 h-4 sm:w-5 sm:h-5 mt-1" />
                          </FormControl>
                          <FormLabel className="text-xs sm:text-sm font-semibold cursor-pointer text-neutral-100 m-0 py-0">
                            {field.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    {form.watch(field.activeKey as any) && (
                      <FormField
                        control={form.control}
                        name={field.key as any}
                        render={({ field: inputField }) => (
                          <FormItem>
                            <FormControl>
                              {field.type === 'textarea' ? (
                                <Textarea {...inputField} placeholder={field.placeholder} className="text-xs sm:text-sm border-2 border-slate-600 bg-slate-800 text-neutral-100 placeholder-neutral-400 focus:border-slate-500 resize-none" rows={3} />
                              ) : (
                                <Input {...inputField} placeholder={field.placeholder} className="text-xs sm:text-sm border-2 border-slate-600 bg-slate-800 text-neutral-100 placeholder-neutral-400 focus:border-slate-500" />
                              )}
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 sm:pt-6">
                <Button type="submit" disabled={isSubmitting} className="w-full bg-slate-600 hover:bg-slate-700 text-xs sm:text-sm text-neutral-100 font-bold py-2 sm:py-3 rounded-lg transition-colors shadow-lg">
                  {isSubmitting ? '⏳ Enviando...' : '📤 Enviar via WhatsApp'}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-neutral-100 font-semibold">
          <p>* Campo obrigatório</p>
        </div>
      </div>
    </div>
  )
}

export default CultoForm
