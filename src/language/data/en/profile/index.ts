import { Profile } from "@/language/structure/profile";

export const profile: Profile = {
  roles: {
    admin: {
      label: "Administrator",
      positions: {
        super: "Super Admin",
        manager: "Manager",
        secretary: "Secretary",
      },
    },
    user: {
      label: "User",
      positions: {
        regular: "Regular User",
        premium: "Premium User",
        vip: "VIP User",
      },
    },
  },
};
