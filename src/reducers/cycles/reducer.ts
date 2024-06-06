import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutes: number
  startDate: Date
  interrupdedDate?: Date
  fineshedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeIdCycle: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeIdCycle = action.payload.newCycle.id
      })

    case ActionTypes.INTERRUPT_CURRENT_CYLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeIdCycle
      })
      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeIdCycle = null
        draft.cycles[currentCycleIndex].interrupdedDate = new Date()
      })
    }

    case ActionTypes.MARCK_CURRENT_CYLE_AS_FINESHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeIdCycle
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeIdCycle = null
        draft.cycles[currentCycleIndex].fineshedDate = new Date()
      })
    }

    default:
      return state
  }
}
