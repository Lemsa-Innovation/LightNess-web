import {
  CancelButton,
  SubmitButton,
  InputPassword,
  InputText,
} from "@/components/@materialUI";

import { useAuth } from "@/contexts/auth/AuthContext";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { Button } from "@heroui/react";
import { toast } from "sonner";

function CreateUserModal() {
  const { user: currentUser } = useAuth();
  const { languageData } = useLanguage();
  const action = languageData?.inputs.users.actions.createAdmin;

  // Only show for super admin users
  if (currentUser?.role === "super_admin") {
    return (
      <Button
        color="primary"
        isDisabled
        onPress={() => toast.info("User creation functionality coming soon")}
      >
        {action?.label || "Create User"}
      </Button>
    );
  }

  return null;
}

export { CreateUserModal };
