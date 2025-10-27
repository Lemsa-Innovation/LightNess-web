import { CancelButton, SubmitButton } from "@/components/@materialUI";

import { useAuth } from "@/contexts/auth/AuthContext";
import { useLanguage } from "@/contexts/language/LanguageContext";
import {
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

function CreateUserModal() {
  const { user: currentUser } = useAuth();
  const { languageData } = useLanguage();
  const action = languageData?.inputs.users.actions.createAdmin;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    role: "user",
  });

  const handleCreate = async () => {
    try {
      setIsCreating(true);
      const supabase = createClient();

      // Create user in auth.users (this will also create the user in public.users via trigger)
      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email: formData.email,
          password: formData.password,
          user_metadata: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone_number: formData.phone_number,
          },
        });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error("No user data returned from auth creation");
      }

      // Create role entry
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: authData.user.id,
        role: formData.role,
      } as any);

      if (roleError) {
        throw roleError;
      }

      toast.success("User created successfully");
      onClose();

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        role: "user",
      });

      // Refresh the page to update the user list
      window.location.reload();
    } catch (error) {
      toast.error("Failed to create user");
    } finally {
      setIsCreating(false);
    }
  };

  // Only show for super admin users
  if (currentUser?.role === "super_admin") {
    return (
      <>
        <Button color="primary" onPress={onOpen}>
          {action?.label || "Create User"}
        </Button>

        <Modal
          size="2xl"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="text-black"
        >
          <ModalContent>
            <ModalHeader>Create New User</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <Input
                  label="First Name"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      first_name: e.target.value,
                    }))
                  }
                  placeholder="Enter first name"
                  variant="bordered"
                />
                <Input
                  label="Last Name"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      last_name: e.target.value,
                    }))
                  }
                  placeholder="Enter last name"
                  variant="bordered"
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter email"
                  variant="bordered"
                />
                <Input
                  label="Phone Number"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone_number: e.target.value,
                    }))
                  }
                  placeholder="Enter phone number"
                  variant="bordered"
                />
                <Input
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Enter password"
                  variant="bordered"
                />
                <Select
                  label="Role"
                  selectedKeys={[formData.role]}
                  onSelectionChange={(keys) => {
                    const role = Array.from(keys)[0] as string;
                    setFormData((prev) => ({ ...prev, role }));
                  }}
                  variant="bordered"
                >
                  <SelectItem key="user">User</SelectItem>
                  <SelectItem key="admin">Admin</SelectItem>
                  <SelectItem key="super_admin">Super Admin</SelectItem>
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <CancelButton onPress={onClose} isDisabled={isCreating} />
              <SubmitButton onPress={handleCreate} isLoading={isCreating} />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return null;
}

export { CreateUserModal };
