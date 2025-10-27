import { CancelButton, SubmitButton } from "@/components/@materialUI";
import { UseDisclosureReturn } from "@/components/types";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { SupabaseUser } from "@/hooks/useSupabaseUsers";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

function UpdateUserModal({
  user,
  disclosureProps,
}: {
  user: SupabaseUser;
  disclosureProps: UseDisclosureReturn;
}) {
  const { languageData } = useLanguage();
  const users = languageData?.inputs.users;

  const { isOpen, onOpenChange, onClose } = disclosureProps;
  const action = languageData?.inputs.suggestions.actions.update;

  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    phone_number: user.phone_number || "",
    role: user.role || "user",
  });

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      const supabase = createClient();

      console.log(`✏️ [UpdateUserModal] Updating user: ${user.id}`);

      // Update users table
      const result: any = await (supabase as any)
        .from("users")
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone_number: formData.phone_number,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id as any);
      const { error: userError } = result;

      if (userError) {
        console.error("✏️ [UpdateUserModal] User update error:", userError);
        throw userError;
      }

      // Update user_roles table if role changed
      if (formData.role !== user.role) {
        const { error: roleError } = await (supabase as any)
          .from("user_roles")
          .update({ role: formData.role })
          .eq("user_id", user.id as any);

        if (roleError) {
          console.error("✏️ [UpdateUserModal] Role update error:", roleError);
          throw roleError;
        }
      }

      console.log(`✅ [UpdateUserModal] Successfully updated user: ${user.id}`);
      toast.success(action?.toast.success || "User updated successfully");
      onClose();

      // Refresh the page to update the user list
      window.location.reload();
    } catch (error) {
      console.error("✏️ [UpdateUserModal] Update error:", error);
      toast.error(action?.toast.error || "Failed to update user");
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      className="text-black"
    >
      <ModalContent>
        <ModalHeader>{action?.header}</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <Input
              label="First Name"
              value={formData.first_name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, first_name: e.target.value }))
              }
              placeholder="Enter first name"
              variant="bordered"
            />
            <Input
              label="Last Name"
              value={formData.last_name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, last_name: e.target.value }))
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
          <CancelButton onPress={onClose} isDisabled={isUpdating} />
          <SubmitButton onPress={handleUpdate} isLoading={isUpdating} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export { UpdateUserModal };
