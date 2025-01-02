import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import {Menu} from "iconsax-react";
import {Fragment} from "react";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {DeathDeclaration} from "@/firebase/firestore/collections/deathDeclarations/model";

function ActionsDropdown({deathDeclaration}: {deathDeclaration: DeathDeclaration}) {
  const validateModalProps = useDisclosure();
  const rejectModalProps = useDisclosure();

  const {languageData} = useLanguage();
  const buttons = languageData?.commons.buttons;
  return (
    <Fragment>
      {/* <ValidateDeathModal
        disclosureProps={validateModalProps}
      /> */}
      {/* <UpdateSuggestionModal
        disclosureProps={rejectModalProps}
      /> */}
      <Dropdown
        className="text-black"
      >
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <Menu size={24} className="stroke-default-300" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            onPress={validateModalProps.onOpen}
          >{buttons?.approve}</DropdownItem>
          <DropdownItem
            onPress={rejectModalProps.onOpen}
            color="danger">{buttons?.reject}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Fragment>
  );
}

export default ActionsDropdown;
