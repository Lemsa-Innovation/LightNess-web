export interface AdminPositions {
    super: string
    manager: string
    secretary: string
}

export interface UserRoles {
    admin: {
        label: string
        positions: AdminPositions
    }
    user: {
        label: string
        positions: {
            regular: string;
            premium: string;
            vip: string;
        }
    }
}
export interface Profile {
    roles: UserRoles
}