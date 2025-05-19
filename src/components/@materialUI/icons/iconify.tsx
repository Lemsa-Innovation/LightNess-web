import { Icon } from "@iconify/react/dist/iconify.js";
const CallIcon = ({ className }: { className?: string }) => (
  <Icon icon="mdi:phone" className={className} />
);
const PlusIcon = ({ className }: { className?: string }) => (
  <Icon icon="mdi:plus" className={className} />
);
const TrashIcon = ({ className }: { className?: string }) => (
  <Icon icon="solar:trash-bin-2-bold-duotone" className={className} />
);
const EditIcon = () => <Icon icon="mdi:pencil-outline" />;
const MinusIcon = () => <Icon icon="mdi:minus" />;
const BrandIcon = ({ className }: { className?: string }) => (
  <Icon icon="lets-icons:group-share" className={className} />
);
const AlertCircleIcon = ({ className }: { className?: string }) => (
  <Icon icon="mdi:alert-circle" className={className} />
);
export {
  PlusIcon,
  TrashIcon,
  EditIcon,
  CallIcon,
  MinusIcon,
  BrandIcon,
  AlertCircleIcon,
};
