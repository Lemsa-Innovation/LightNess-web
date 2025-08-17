"use client";

import {
  RejectDeadModal,
  ValidateDeathModal,
  MinimalUser,
} from "@/components/@materialApp/deathDeclarations";
import { DateChip, StatusChip } from "@/components/@materialUI";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { useSupabaseDeathDeclarations } from "@/hooks/useSupabaseDeathDeclarations";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { Fragment, useMemo } from "react";

function Page() {
  const { languageData } = useLanguage();
  const deathDeclarations = languageData?.inputs.deathDeclarations;
  const {
    deathDeclarations: data,
    isLoading,
    error,
    refetch,
  } = useSupabaseDeathDeclarations();

  const validateModalProps = useDisclosure();
  const rejectModalProps = useDisclosure();

  const deathsDeclarations = useMemo(() => {
    if (!data) return {};

    return data.reduce(
      (acc, { uid, matched_uid, declared_by, created_at, status }) => {
        if (acc[matched_uid]) {
          acc[matched_uid].declaredBy.push({
            uid,
            declared_by,
            created_at,
            status,
          });
        } else {
          acc[matched_uid] = {
            declaredBy: [
              {
                uid,
                declared_by,
                created_at,
                status,
              },
            ],
          };
        }
        return acc;
      },
      {} as Record<
        string,
        {
          declaredBy: {
            uid: string;
            declared_by: string;
            created_at: string;
            status: string;
          }[];
        }
      >
    );
  }, [data]);

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold">{deathDeclarations?.labels.title}</p>
        <Card className="w-full max-w-md">
          <CardHeader>
            <h3 className="text-lg font-semibold text-red-600">Error</h3>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-gray-600">
              Error loading death declarations: {error.message}
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold">{deathDeclarations?.labels.title}</p>
      {isLoading ? (
        <Card className="w-full max-w-md">
          <CardHeader>
            <h3 className="text-lg font-semibold">Loading...</h3>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-gray-600">
              Loading death declarations...
            </p>
          </CardBody>
        </Card>
      ) : data.length === 0 ? (
        <p className="text-sm font-light">{deathDeclarations?.labels.empty}</p>
      ) : (
        <div className="flex flex-row gap-4 flex-wrap">
          {Object.entries(deathsDeclarations).map(
            ([matchedUid, { declaredBy }]) => {
              const matchedUser = data.find(
                (d) => d.matched_uid === matchedUid
              )?.matched_user;
              const declaredByUsers = declaredBy.map((declaration) => {
                const user = data.find(
                  (d) => d.uid === declaration.uid
                )?.declared_by_user;
                return { ...declaration, user };
              });

              // Check if all declarations are pending to show action buttons
              const allPending = declaredBy.every(
                ({ status }) => status === "pending"
              );
              const hasPending = declaredBy.some(
                ({ status }) => status === "pending"
              );

              return (
                <Fragment key={matchedUid}>
                  {hasPending && (
                    <>
                      <ValidateDeathModal
                        matchedUid={matchedUid}
                        declarationUids={declaredBy
                          .filter(({ status }) => status === "pending")
                          .map(({ uid }) => uid)}
                        disclosureProps={validateModalProps}
                        onSuccess={refetch}
                      />
                      <RejectDeadModal
                        matchedUid={matchedUid}
                        declarationUids={declaredBy
                          .filter(({ status }) => status === "pending")
                          .map(({ uid }) => uid)}
                        disclosureProps={rejectModalProps}
                        onSuccess={refetch}
                      />
                    </>
                  )}
                  <Card key={matchedUid} className="w-fit h-fit text-black">
                    <CardHeader className="flex flex-row justify-between items-start">
                      <div>
                        {matchedUser && <MinimalUser user={matchedUser} />}
                      </div>
                      <div className="flex flex-col gap-1">
                        {declaredByUsers.map(({ status }) => (
                          <StatusChip
                            key={status}
                            statusKey={
                              status === "approved"
                                ? "active"
                                : status === "rejected"
                                ? "inactive"
                                : "pending"
                            }
                          />
                        ))}
                      </div>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-3">
                      <p className="text-xl">
                        {deathDeclarations?.labels.declaredBy}
                      </p>
                      <div className="flex flex-row gap-2">
                        {declaredByUsers.map(
                          ({ declared_by, created_at, user }) => (
                            <div
                              key={declared_by}
                              className="flex flex-col gap-2 border-2 p-2 rounded-xl w-fit"
                            >
                              {user && <MinimalUser user={user} />}
                              <DateChip timestamp={created_at} withTime />
                            </div>
                          )
                        )}
                      </div>
                    </CardBody>
                    {hasPending && (
                      <CardFooter className="flex flex-row gap-2">
                        <Button
                          color="danger"
                          onPress={rejectModalProps.onOpen}
                        >
                          {deathDeclarations?.actions.rejectDeclaration.label}
                        </Button>
                        <Button
                          color="primary"
                          onPress={validateModalProps.onOpen}
                        >
                          {deathDeclarations?.actions.validateDeclaration.label}
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </Fragment>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default Page;
