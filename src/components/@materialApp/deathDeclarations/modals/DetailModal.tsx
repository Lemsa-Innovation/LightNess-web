import { MinimalUser } from "@/components/@materialApp/deathDeclarations";
import { DateChip, StatusChip } from "@/components/@materialUI";
import { UseDisclosureReturn } from "@/components/types";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { SupabaseDeathDeclaration } from "@/hooks/useSupabaseDeathDeclarations";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { RejectDeadModal, ValidateDeathModal } from ".";

interface DetailModalProps {
  matchedUid: string;
  matchedUser?: {
    id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    avatar_image?: string;
    photo_url?: string;
  };
  declarations: Array<
    SupabaseDeathDeclaration & {
      user?: {
        id: string;
        first_name?: string;
        last_name?: string;
        email: string;
        avatar_image?: string;
        photo_url?: string;
      };
    }
  >;
  disclosureProps: UseDisclosureReturn;
  onSuccess?: () => void;
}

function DetailModal({
  matchedUid,
  matchedUser,
  declarations,
  disclosureProps,
  onSuccess,
}: DetailModalProps) {
  const { languageData } = useLanguage();
  const { isOpen, onOpenChange, onClose } = disclosureProps;
  const deathDeclarations = languageData?.inputs.deathDeclarations;

  // Validate/Reject modals visibility
  const validateModalProps = useDisclosure();
  const rejectModalProps = useDisclosure();

  const pendingDeclarationUids = declarations
    .filter((d) => d.status === "pending")
    .map((d) => d.uid);
  const hasPending = pendingDeclarationUids.length > 0;

  const handleAttachmentClick = (url: string) => {
    window.open(url, "_blank");
  };

  const globalStatus = declarations[0]?.status || "pending";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      className="text-black max-w-3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>{/* keep header to render the Close (X) */}</ModalHeader>
        <ModalBody className="gap-4 pt-6 pb-2">
          {/* Title and global status below the close button */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">
              {deathDeclarations?.labels.details || "Death Declaration Details"}
            </h2>
            <div>
              <StatusChip
                statusKey={
                  globalStatus === "approved"
                    ? "active"
                    : globalStatus === "rejected"
                    ? "inactive"
                    : "pending"
                }
              />
            </div>
          </div>
          {hasPending && (
            <>
              <ValidateDeathModal
                matchedUid={matchedUid}
                declarationUids={pendingDeclarationUids}
                disclosureProps={validateModalProps}
                onSuccess={onSuccess}
              />
              <RejectDeadModal
                matchedUid={matchedUid}
                declarationUids={pendingDeclarationUids}
                disclosureProps={rejectModalProps}
                onSuccess={onSuccess}
              />
            </>
          )}
          {/* Deceased Person */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">
              {deathDeclarations?.labels.deceasedPerson || "Deceased Person"}
            </h3>
            {matchedUser && <MinimalUser user={matchedUser} />}
          </div>

          {/* Declarations */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">
              {deathDeclarations?.labels.declarations || "Declarations"}
            </h3>
            {declarations.map((declaration) => (
              <div
                key={declaration.uid}
                className="flex flex-col gap-3 border-2 border-gray-200 rounded-lg p-4"
              >
                {/* Declarer Info */}
                <div className="flex flex-row justify-between items-start">
                  <div className="flex flex-col gap-2">
                    {declaration.user && (
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-gray-600">
                          {deathDeclarations?.labels.declaredBy ||
                            "Declared by"}
                        </p>
                        <MinimalUser user={declaration.user} />
                      </div>
                    )}
                    <DateChip timestamp={declaration.created_at} withTime />
                  </div>
                </div>

                {/* Description */}
                {declaration.description && (
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-gray-600">
                      {deathDeclarations?.labels.description || "Description"}
                    </p>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">
                      {declaration.description}
                    </p>
                  </div>
                )}

                {/* Attachments */}
                {declaration.attachments &&
                  declaration.attachments.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium text-gray-600">
                        {deathDeclarations?.labels.attachments || "Attachments"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {declaration.attachments.map((attachment, index) => (
                          <button
                            key={index}
                            onClick={() => handleAttachmentClick(attachment)}
                            className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm transition-colors cursor-pointer"
                          >
                            {deathDeclarations?.labels.viewAttachment ||
                              "View Attachment"}{" "}
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </ModalBody>
        {hasPending && (
          <ModalFooter>
            <div className="w-full flex flex-row justify-end gap-2">
              <Button color="danger" onPress={rejectModalProps.onOpen}>
                {deathDeclarations?.actions.rejectDeclaration.label}
              </Button>
              <Button color="primary" onPress={validateModalProps.onOpen}>
                {deathDeclarations?.actions.validateDeclaration.label}
              </Button>
            </div>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}

export { DetailModal };
