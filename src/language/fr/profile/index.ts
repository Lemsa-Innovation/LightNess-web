import {Profile} from "@/language/structure/profile";

export const profile: Profile = {
    roles: {
        admin: {
            label: "Admin",
            positions: {
                manager: "Gérant",
                secretary: "Secrétaire",
                // operationsManager: "Responsable des opérations",
                // financeManager: "Directeur financier",
                // hrManager: "Responsable des ressources humaines",
                // itAdmin: "Administrateur IT",
            }
        },
        user: {
            label: 'Utilisateur',
            positions: {
                regular: "Utilisateur régulier",
                premium: "Utilisateur premium",
                vip: "Utilisateur VIP"
            }
        },
    },
}