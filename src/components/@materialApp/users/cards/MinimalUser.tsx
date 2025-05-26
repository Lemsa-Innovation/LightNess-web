import { DisplayAvatar } from "@/components/@materialUI";
import { getUserFullName, User } from "@/firebase/firestore";
import { useUserQuery } from "@/firebase/firestore/collections/users/hooks";
import { isNew } from "@/utils/fDate";
import { Badge, Skeleton } from "@heroui/react";

type Props =
  | {
      fetch: true;
      uid: string;
    }
  | {
      fetch: false;
      user: User;
    };
function MinimalUser(props: Props) {
  const { fetch } = props;
  const { data } = useUserQuery({
    uid: fetch ? props.uid : undefined,
  });

  const user = fetch ? data : props.user;

  const isNewUser = user && isNew({ createdAt: user.createdAt });
  const userImage = user?.avatarImage || user?.photoUrl;
  return (
    <div className="flex flex-row space-x-4 items-center">
      {userImage && (
        <Badge content="new" isInvisible={!isNewUser} color="danger" size="sm">
          <div className="size-12">
            <DisplayAvatar src={userImage} />
          </div>
        </Badge>
      )}
      <div className="flex flex-col">
        <Skeleton isLoaded={!!user}>
          <p className="text-bold text-small capitalize">
            {getUserFullName({
              firstName: user?.firstName,
              lastName: user?.lastName,
            })}
          </p>
        </Skeleton>
        <p className="text-foreground-700 font-light text-sm">{user?.email}</p>
      </div>
    </div>
  );
}

export { MinimalUser };
