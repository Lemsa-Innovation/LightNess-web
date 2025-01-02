import {useLanguage} from "@/contexts/language/LanguageContext";
import {useSuggestionQuery} from "@/firebase/firestore/collections/suggestions/hooks";
import {Button, Checkbox, Chip} from "@nextui-org/react";
import {Trash} from "iconsax-react";
import {DeleteCommentModal} from "../modals";
import {LoadingScreen} from "@/components/@materialUI/loading";
import {Questions} from "@/language/structure/inputs/suggestions";

function SuggestionView({docId}: {
  docId: string
}) {
  const {languageData} = useLanguage()
  const choice = languageData?.inputs.commons.choice
  const suggestions = languageData?.inputs.suggestions
  const {data} = useSuggestionQuery(docId)
  const comments = Object.entries(data?.comments || {})
  if (data) {
    if (comments.length)
      return (
        <div className="flex flex-col gap-4">
          {comments.map(([commentId, {createdAt, fullName, message, questions, trustLevel}]) =>
            <div
              key={commentId}
              className="rounded-xl flex flex-row gap-2 justify-between bg-foreground-100 p-2"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-semibold">{fullName}</p>
                  {trustLevel && <div
                    className="bg-primary size-8 rounded-full text-center items-center justify-center"
                  >
                    <p className="text-white font-semibold">{trustLevel}</p>
                  </div>}

                </div>
                <p>{message}</p>
                <div className="flex flex-col gap-2 flex-wrap">{Object.entries(questions || {}).map(([questionId, value]) =>
                  <div
                    key={questionId}
                    className="flex flex-row gap-2 items-center"
                  >
                    <p className="text-black">{suggestions?.questions[questionId as keyof Questions] ?? questionId}</p>
                    <Chip
                      color={value ? "primary" : "danger"}
                    >
                      {value ? choice?.yes : choice?.no}
                    </Chip>
                  </div>
                )}</div>
              </div>
              <div className="flex items-center">
                <DeleteCommentModal
                  commentId={commentId}
                  suggestionPath={data.ref.path}
                />
              </div>
            </div>
          )}
        </div>
      );
    return (
      <div>
        <p>{suggestions?.labels.emptyComment}</p>
      </div>
    )
  }
  return <LoadingScreen />
}

export default SuggestionView;