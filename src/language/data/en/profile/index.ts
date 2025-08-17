import { Profile } from "@/language/structure/profile";

export const profile: Profile = {
  roles: {
    admin: {
      label: "Administrator",
      description: "Full system access",
    },
    super_admin: {
      label: "Super Administrator",
      description: "Complete system control",
    },
    user: {
      label: "User",
      description: "Basic user access",
    },
  },
  account: {
    title: "Account Settings",
    description: "Manage your account information and preferences",
  },
  personal: {
    title: "Personal Information",
    description: "Update your personal details",
  },
  security: {
    title: "Security Settings",
    description: "Manage your account security",
  },
  notifications: {
    title: "Notification Preferences",
    description: "Configure your notification settings",
  },
};
