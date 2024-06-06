import { FormContainer, MinutesAmountInput, TaskInput } from './style'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../context/CyclesContext'

export function NewCylceForm() {
  const { activeIdCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="taskSuggestions"
        disabled={!!activeIdCycle}
        {...register('task')} // o spreed operator está pegando todos os atributos do register
      />

      <datalist id="taskSuggestions">
        <option value="projeto 1" />
        <option value="projeto 5" />
        <option value="projeto 3" />
        <option value="projeto 2" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeIdCycle}
        {...register('minutesAmountInput', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
