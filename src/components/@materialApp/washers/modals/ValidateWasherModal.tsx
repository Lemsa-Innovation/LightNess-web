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
import { SupabaseWasher } from "@/hooks/useSupabaseWashers";
import { Eye, ExternalLink } from "lucide-react";

interface ValidateWasherModalProps {
  isOpen: boolean;
  onClose: () => void;
  washer: SupabaseWasher;
  onRefresh?: () => void;
}

interface Witness {
  name: string;
  phoneNumber: string;
}

export function ValidateWasherModal({
  isOpen,
  onClose,
  washer,
  onRefresh,
}: ValidateWasherModalProps) {
  const [isValidatingIdentity, setIsValidatingIdentity] = useState(
    washer.is_validated_identity || false
  );
  const [isValidatingCertification, setIsValidatingCertification] = useState(
    washer.is_validated_certification || false
  );
  const [isLoading, setIsLoading] = useState(false);

  // Update local state when washer prop changes
  useEffect(() => {
    setIsValidatingIdentity(washer.is_validated_identity || false);
    setIsValidatingCertification(washer.is_validated_certification || false);
  }, [washer]);

  const witnesses: Witness[] = washer.witnesses
    ? Array.isArray(washer.witnesses)
      ? (washer.witnesses as unknown as Witness[])
      : []
    : [];

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const { error } = await (supabase as any).rpc(
        "update_validation_status",
        {
          entity_type: "washer",
          target_uid: washer.uid,
          new_is_validated_identity: isValidatingIdentity,
          new_is_validated_certification: isValidatingCertification,
        }
      );

      if (error) {
        throw error;
      }

      toast.success("Washer validation updated successfully");
      onRefresh?.();
      onClose();
    } catch (error: any) {
      console.error("Error updating washer validation:", error);
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
                Valider la laveuse / le laveur
              </h2>
              <p className="text-sm text-gray-500 font-normal">
                Vérifier l&apos;identité et la certification de{" "}
                {washer.fullname}
              </p>
            </ModalHeader>
            <ModalBody>
              {/* Washer Info Section */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-sm mb-2">
                    Informations du laveur
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Nom complet:</span>
                      <p className="font-medium">{washer.fullname}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Téléphone:</span>
                      <p className="font-medium">{washer.phone_number}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p className="font-medium">{washer.email || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Genre:</span>
                      <p className="font-medium capitalize">
                        {washer.gender === "women" ? "Femme" : "Homme"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Adresse:</span>
                      <p className="font-medium">{washer.address}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Région:</span>
                      <p className="font-medium">{washer.region}</p>
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

                  {washer.attachment_path && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-900 mb-2">
                        Document d&apos;identité disponible
                      </p>
                      <Link
                        href={washer.attachment_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ouvrir le document dans un nouvel onglet
                      </Link>
                    </div>
                  )}

                  {!washer.attachment_path && (
                    <Chip size="sm" color="warning" variant="flat">
                      Aucun document fourni
                    </Chip>
                  )}
                </div>

                <Divider />

                {/* Certification Validation */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">
                        Validation de certification
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Vérifiez les témoins de certification
                      </p>
                    </div>
                    <Switch
                      isSelected={isValidatingCertification}
                      onValueChange={setIsValidatingCertification}
                      color="success"
                    />
                  </div>

                  {witnesses.length > 0 ? (
                    <div className="space-y-2">
                      {witnesses.map((witness, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {witness.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {witness.phoneNumber}
                              </p>
                            </div>
                            <Eye className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                      <p className="text-xs text-gray-500 mt-2">
                        {witnesses.length} témoin(s) au total
                      </p>
                    </div>
                  ) : (
                    <Chip size="sm" color="warning" variant="flat">
                      Aucun témoin fourni
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
