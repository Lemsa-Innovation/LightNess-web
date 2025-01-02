import {Action} from "."

export type Questions = {
  isPaid: string;
  perpetuity: string;
  muslimFriendly: string;
  belongsToMosque: string;
}
export type Suggestions = {
  labels: {
    emptyComment: string;
  }

  questions: Questions

  actions: {
    update: Action
    delete: {
      cemetery: Action
      washer: Action
      funeralPump: Action
      comment: Action
    }
  }
}