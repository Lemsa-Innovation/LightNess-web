import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { Fragment } from "react";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { useAuth } from "@/contexts/auth/AuthContext";
import { User } from "@/firebase/firestore";
import { DeleteUserModal, UpdateUserModal } from "../modals";
import { Icon } from "@iconify/react";

function UserActionsDropdown({ user }: { user: User }) {
  const deletedProps = useDisclosure();
  const updatedProps = useDisclosure();
  const { tenant } = useAuth();
  const canBeDeleted = !(
    user.role === "admin" &&
    tenant?.customClaims.role === "admin" &&
    tenant.customClaims.position !== "super"
  );

  const { languageData } = useLanguage();
  const buttons = languageData?.commons.buttons;
  return (
    <Fragment>
      <DeleteUserModal user={user} disclosureProps={deletedProps} />
      <UpdateUserModal user={user} disclosureProps={updatedProps} />
      <Dropdown className="text-black">
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <Icon
              icon="mdi:dots-vertical"
              className="size-6 stroke-default-300"
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="edit" onPress={updatedProps.onOpen}>
            {buttons?.edit}
          </DropdownItem>
          <DropdownItem
            key="delete"
            onPress={() => {
              canBeDeleted && deletedProps.onOpen();
            }}
            color="danger"
          >
            {buttons?.delete}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Fragment>
  );
}

export { UserActionsDropdown };
