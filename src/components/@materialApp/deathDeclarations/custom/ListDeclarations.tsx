import {getDeclarationsRef} from "@/firebase/firestore/collections/deathDeclarations/helpers";
import {DeathDeclaration} from "@/firebase/firestore/collections/deathDeclarations/model";
import {useCollectionQuery} from "@/firebase/firestore/modules/queryHooks";
import {Button, Card, CardBody, CardFooter, CardHeader, useDisclosure} from "@nextui-org/react";
import {Fragment, useMemo} from "react";
import {MinimalUser} from "../../users/cards";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {DateChip} from "@/components/@materialUI/chips";
import {RejectDeadModal, ValidateDeathModal} from "../modals";

function ListDeclarations() {
  const {languageData} = useLanguage()
  const deathDeclarations = languageData?.inputs.deathDeclarations
  const {data} = useCollectionQuery<DeathDeclaration>({
    queryKey: ["deathDeclarations"],
    dataRef: getDeclarationsRef()
  });

  const validateModalProps = useDisclosure();
  const rejectModalProps = useDisclosure();

  const deathsDeclarations = useMemo(() => {
    return data.filter(({status}) => status === "pending").reduce((acc, {matchedUid, ref, declaredBy, dateOfDeath, createdAt, placeOfDeath}) => {
      if (acc[matchedUid]) {
        acc[matchedUid].declaredBy.push({
          ref, declaredBy, dateOfDeath, createdAt, placeOfDeath
        })
      }
      else {
        acc[matchedUid] = {
          declaredBy: [{
            ref, declaredBy, dateOfDeath, createdAt, placeOfDeath
          }]
        }
      }
      return acc
    }, {} as Record<string, {
      declaredBy: Pick<DeathDeclaration, "ref" | "dateOfDeath" | "declaredBy" | "placeOfDeath" | "createdAt">[]
    }>)
  }, [data])

  return (
    <div>
      {Object.entries(deathsDeclarations).map(([matchedUid, {declaredBy}]) =>
        <Fragment
          key={matchedUid}
        >
          <ValidateDeathModal
            matchedUid={matchedUid}
            docPaths={declaredBy.map(({ref}) => ref.path)}
            disclosureProps={validateModalProps}
          />
          <RejectDeadModal
            matchedUid={matchedUid}
            docPaths={declaredBy.map(({ref}) => ref.path)}
            disclosureProps={rejectModalProps}
          />
          <Card
            key={matchedUid}
            className="w-fit"
          >
            <CardHeader>
              <MinimalUser
                uid={matchedUid}
                fetch
              />
            </CardHeader>
            <CardBody className="flex flex-col gap-3">
              <p className="text-xl">{deathDeclarations?.labels.declaredBy}</p>
              <div>
                {declaredBy.map(({declaredBy, createdAt, dateOfDeath, placeOfDeath}) =>
                  <div
                    key={declaredBy}
                    className="flex flex-col gap-2 border-2 p-2 rounded-xl w-fit"
                  >
                    <MinimalUser
                      uid={declaredBy}
                      fetch
                    />
                    {placeOfDeath && <div className="flex flex-row gap-2">
                      <p>{deathDeclarations?.labels.placeOfDeath}:</p>
                      <p>{placeOfDeath}</p>
                    </div>}
                    {dateOfDeath && <div className="flex flex-row gap-2">
                      <p>{deathDeclarations?.labels.dateOfDeath}:</p>
                      <p>{dateOfDeath}</p>
                    </div>}
                    <DateChip timestamp={createdAt} withTime />
                  </div>
                )}
              </div>
            </CardBody>
            <CardFooter className="flex flex-row gap-2">
              <Button
                color="danger"
                onPress={rejectModalProps.onOpen}              >
                {deathDeclarations?.actions.rejectDeclaration.label}
              </Button>
              <Button
                color="primary"
                onPress={validateModalProps.onOpen}
              >
                {deathDeclarations?.actions.validateDeclaration.label}
              </Button>
            </CardFooter>
          </Card>
        </Fragment>
      )}
    </div>
  )
}

export default ListDeclarations;