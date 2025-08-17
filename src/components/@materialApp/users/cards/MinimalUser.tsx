import { DisplayAvatar } from "@/components/@materialUI";
import { isNew } from "@/utils/fDate";
import { Badge, Skeleton } from "@heroui/react";
import { SupabaseUser } from "@/hooks/useSupabaseUsers";

type Props = {
  user: SupabaseUser;
};

function MinimalUser(props: Props) {
  const { user } = props;

  const isNewUser =
    user && isNew({ createdAt: new Date(user.created_at).getTime() });
  const userImage = user?.avatar_image || user?.photo_url;
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
            {`${user?.first_name || ""} ${user?.last_name || ""}`.trim()}
          </p>
        </Skeleton>
        <p className="text-foreground-700 font-light text-sm">{user?.email}</p>
      </div>
    </div>
  );
}

export { MinimalUser };
