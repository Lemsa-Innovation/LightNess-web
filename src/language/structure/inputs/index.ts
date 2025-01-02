import {Attachements} from "./attachements";
import {Suggestions} from "./suggestions";
import {Users} from "./users";
export type ToastContents = {
    error: string
    success: string
}
export interface Field {
    label: string;
    placeholder?: string;
    description?: string
}
export interface FieldWithValues extends Field {
    values: Record<string, string>
}

export interface AutocompleteField extends Field {
    labels: {
        noResult: string
    }
}
export interface Action {
    label?: string
    header?: string
    toast: ToastContents
    confirmation?: {
        title: string
        message: string
    }
    description?: string
}

export interface Inputs {
    users: Users
    suggestions: Suggestions
    attachements: Attachements
    deathDeclarations: {
        labels: {
            declaredBy: string
            placeOfDeath: string
            dateOfDeath: string
        }
        actions: {
            validateDeclaration: Action
            rejectDeclaration: Action
        }
    }
    commons: {
        name: Field
        isActive: Field
        searchByName: Field
        gender: {
            label: {
                unique: string
                multiple: string
            }
            values: {
                men: string
                women: string
                kids: string
            }
        }
        choice: {
            yes: string;
            no: string;
        }
    }
}