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
import DeleteSuggestionModal from "./DeleteModal";
import {Suggestion} from "@/firebase/firestore/collections/suggestions/models";
import {useLanguage} from "@/contexts/language/LanguageContext";
import UpdateSuggestionModal from "./UpdateModal";

function ActionsDropdown({suggestion}: {suggestion: Suggestion}) {
  const deletedSuggestionProps = useDisclosure();
  const updatedSuggestionProps = useDisclosure();

  const {languageData} = useLanguage();
  const buttons = languageData?.commons.buttons;
  return (
    <Fragment>
      <DeleteSuggestionModal
        suggestion={suggestion}
        disclosureProps={deletedSuggestionProps}
      />
      <UpdateSuggestionModal
        suggestion={suggestion}
        disclosureProps={updatedSuggestionProps}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <Menu size={24} className="stroke-default-300" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            onPress={updatedSuggestionProps.onOpen}
          >{buttons?.edit}</DropdownItem>
          <DropdownItem
            onPress={deletedSuggestionProps.onOpen}
            color="danger">{buttons?.delete}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Fragment>
  );
}

export default ActionsDropdown;
