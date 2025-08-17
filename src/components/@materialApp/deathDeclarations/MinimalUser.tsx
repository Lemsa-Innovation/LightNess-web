import { DisplayAvatar } from "@/components/@materialUI";
import { Badge, Skeleton } from "@heroui/react";

interface SupabaseUser {
  id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  avatar_image?: string;
  photo_url?: string;
}

type Props = {
  user: SupabaseUser;
};

function MinimalUser(props: Props) {
  const { user } = props;

  const userImage = user?.avatar_image || user?.photo_url;
  const fullName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : user?.first_name || user?.last_name || user?.email || "Unknown User";

  return (
    <div className="flex flex-row space-x-4 items-center">
      {userImage && (
        <Badge content="user" color="primary" size="sm">
          <div className="size-12">
            <DisplayAvatar src={userImage} />
          </div>
        </Badge>
      )}
      <div className="flex flex-col">
        <Skeleton isLoaded={!!user}>
          <p className="text-bold text-small capitalize">{fullName}</p>
        </Skeleton>
        <p className="text-foreground-700 font-light text-sm">{user?.email}</p>
      </div>
    </div>
  );
}

export { MinimalUser };
