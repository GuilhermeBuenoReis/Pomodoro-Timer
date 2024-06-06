import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interrupdedCurrentCycleAction,
  marckCurrentCycleAsFineshedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutesAmountInput: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeIdCycle: string | null
  amountSecondsPassed: number
  marckCurrentCycleAsFinheshed: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interrupdedCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeIdCycle: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@pomodoro-timer:cycles-state1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
    },
  )
  const { cycles, activeIdCycle } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeIdCycle)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@pomodoro-timer:cycles-state1.0.0', stateJSON)
  }, [cyclesState])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutes: data.minutesAmountInput,
      startDate: new Date(),
    }
    setAmountSecondsPassed(0)
    dispatch(addNewCycleAction(newCycle))
  }

  function interrupdedCurrentCycle() {
    dispatch(interrupdedCurrentCycleAction())
  }

  function marckCurrentCycleAsFinheshed() {
    dispatch(marckCurrentCycleAsFineshedAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeIdCycle,
        marckCurrentCycleAsFinheshed,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interrupdedCurrentCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
