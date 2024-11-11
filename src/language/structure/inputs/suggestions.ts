import {Action} from "."

export type Suggestions = {
  actions: {
    update: Action
    delete: {
      cemetery: Action
      washer: Action
      funeralPump: Action
    }
  }
}