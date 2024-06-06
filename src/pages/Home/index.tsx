import { HandPalm, Play } from 'phosphor-react'
import { HomeContainer, StartCountdowButton, StopCountdowButton } from './style'
import { NewCylceForm } from './components/NewCycleForm'
import { CountdowCycle } from './components/CountdowCycle'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useContext } from 'react'
import { CyclesContext } from '../../context/CyclesContext'

const newCycleFormScheme = zod.object({
  task: zod.string().min(1, 'Informe a sua tarefa'),
  minutesAmountInput: zod
    .number()
    .min(5, 'O ciclo precisa ser no minímo de 5 minutos')
    .max(60, 'O ciclo preciso ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormScheme>

export function Home() {
  const { activeCycle, createNewCycle, interrupdedCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormScheme),
    defaultValues: {
      task: '',
      minutesAmountInput: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCylceForm />
        </FormProvider>
        <CountdowCycle />

        {activeCycle ? (
          <StopCountdowButton onClick={interrupdedCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdowButton>
        ) : (
          <StartCountdowButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdowButton>
        )}
      </form>
    </HomeContainer>
  )
}
