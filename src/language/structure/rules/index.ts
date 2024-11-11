export interface Rules {
    field: {
        isRequired: string;
        minLength: string;
        maxLength: string;
    };
    number: {
        invalid: string;
        minValue: string;
        maxValue: string;
        integer: string;
        positive: string;
        maxShouldGreaterthenMin: string
    };
    birthday: {
        isRequired: string;
    }
    date: {
        isRequired: string;
    }
    email: {
        isRequired: string
        invalid: string
        alreadyExists: string
    };
    phone: {
        isRequired: string
        invalid: string
        alreadyExists: string
    };
    password: {
        isRequired: string;
        minLength: string;
        maxLength: string;
        requiredLetter: string;
        requiredNumber: string;
    };
    choice: {
        default: {
            isRequired: string;
        };
        gender: {
            isRequired: string;
        };
        iAgree: {
            isRequired: string;
        };
    }
    list: {
        isRequired: string;
    }
}