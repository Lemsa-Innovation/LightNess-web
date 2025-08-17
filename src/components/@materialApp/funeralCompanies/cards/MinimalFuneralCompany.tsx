import { DisplayAvatar } from "@/components/@materialUI";
import { Badge, Skeleton } from "@heroui/react";
import { SupabaseFuneralCompany } from "@/hooks/useSupabaseFuneralCompanies";

type Props = {
  funeralCompany: SupabaseFuneralCompany;
};

function MinimalFuneralCompany(props: Props) {
  const { funeralCompany } = props;

  const userImage =
    funeralCompany?.user?.avatar_image ||
    funeralCompany?.user?.photo_url ||
    funeralCompany?.image;
  const companyName = funeralCompany?.company_name || "Unknown Company";
  const userEmail = funeralCompany?.user?.email || funeralCompany?.email;

  return (
    <div className="flex flex-row space-x-4 items-center">
      {userImage && (
        <Badge content="company" color="primary" size="sm">
          <div className="size-12">
            <DisplayAvatar src={userImage} />
          </div>
        </Badge>
      )}
      <div className="flex flex-col">
        <Skeleton isLoaded={!!funeralCompany}>
          <p className="text-bold text-small capitalize">{companyName}</p>
        </Skeleton>
        <p className="text-foreground-700 font-light text-sm">{userEmail}</p>
      </div>
    </div>
  );
}

export { MinimalFuneralCompany };
