import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYLE = 'INTERRUPT_CURRENT_CYLE',
  MARCK_CURRENT_CYLE_AS_FINESHED = 'MARCK_CURRENT_CYLE_AS_FINESHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return { type: ActionTypes.ADD_NEW_CYCLE, payload: { newCycle } }
}

export function interrupdedCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYLE,
  }
}

export function marckCurrentCycleAsFineshedAction() {
  return {
    type: ActionTypes.MARCK_CURRENT_CYLE_AS_FINESHED,
  }
}
