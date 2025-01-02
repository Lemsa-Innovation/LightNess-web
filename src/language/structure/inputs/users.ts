import {Action, Field} from "../inputs";
import {ImageField} from "./attachements";

export interface Users {
    fields: {
        email: Field & {undefinedEmail: string};
        lastName: Field;
        firstName: Field;
        phoneNumber: Field & {undefinedPhoneNumber: string}
        password: Field;
        birthday: Field;
        username: Field;
        profilePhoto: ImageField & {
            label: string
        }
    }
    actions: {
        updateProfile: Action
        deleteUser: Action
        updateUser: Action
        verifications: {
            email: Action
            phone: Action
        }
        createAdmin: Action
    }
}