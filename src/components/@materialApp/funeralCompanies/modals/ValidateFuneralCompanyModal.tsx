"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Switch,
  Link,
  Divider,
  Chip,
} from "@heroui/react";
import { CancelButton, SubmitButton } from "@/components/@materialUI";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { SupabaseFuneralCompany } from "@/hooks/useSupabaseFuneralCompanies";
import { ExternalLink } from "lucide-react";

interface ValidateFuneralCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  funeralCompany: SupabaseFuneralCompany;
  onRefresh?: () => void;
}

export function ValidateFuneralCompanyModal({
  isOpen,
  onClose,
  funeralCompany,
  onRefresh,
}: ValidateFuneralCompanyModalProps) {
  const [isValidatingIdentity, setIsValidatingIdentity] = useState(
    funeralCompany.is_validated_identity || false
  );
  const [isLoading, setIsLoading] = useState(false);

  // Update local state when funeralCompany prop changes
  useEffect(() => {
    setIsValidatingIdentity(funeralCompany.is_validated_identity || false);
  }, [funeralCompany]);

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const { error } = await (supabase as any).rpc(
        "update_validation_status",
        {
          entity_type: "funeral",
          target_uid: funeralCompany.uid,
          new_is_validated_identity: isValidatingIdentity,
          new_is_validated_certification: null,
        }
      );

      if (error) {
        throw error;
      }

      toast.success("Funeral company validation updated successfully");
      onRefresh?.();
      onClose();
    } catch (error: any) {
      console.error("Error updating funeral company validation:", error);
      toast.error(error?.message || "Failed to update validation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      classNames={{
        body: "py-4",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">
                Valider l&apos;entreprise de pompes funèbres
              </h2>
              <p className="text-sm text-gray-500 font-normal">
                Vérifier l&apos;identité de {funeralCompany.company_name}
              </p>
            </ModalHeader>
            <ModalBody>
              {/* Company Info Section */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-sm mb-2">
                    Informations de l&apos;entreprise
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">
                        Nom de l&apos;entreprise:
                      </span>
                      <p className="font-medium">
                        {funeralCompany.company_name}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Téléphone:</span>
                      <p className="font-medium">
                        {funeralCompany.phone_number}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p className="font-medium">{funeralCompany.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Région:</span>
                      <p className="font-medium">{funeralCompany.region}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Adresse:</span>
                      <p className="font-medium">{funeralCompany.address}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Statut:</span>
                      <p className="font-medium capitalize">
                        {funeralCompany.status || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <Divider />

                {/* Identity Validation */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">
                        Validation d&apos;identité
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Vérifiez les documents d&apos;identité fournis
                      </p>
                    </div>
                    <Switch
                      isSelected={isValidatingIdentity}
                      onValueChange={setIsValidatingIdentity}
                      color="success"
                    />
                  </div>

                  {funeralCompany.attachment_path && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-900 mb-2">
                        Document d&apos;identité disponible
                      </p>
                      <Link
                        href={funeralCompany.attachment_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ouvrir le document dans un nouvel onglet
                      </Link>
                    </div>
                  )}

                  {!funeralCompany.attachment_path && (
                    <Chip size="sm" color="warning" variant="flat">
                      Aucun document fourni
                    </Chip>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <CancelButton onPress={onClose} isDisabled={isLoading} />
              <SubmitButton onPress={handleSave} isLoading={isLoading} />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
