import { AdminPositions } from "@/language/structure/profile"

export type Admin = {
    role: "admin"
    position: keyof AdminPositions
}