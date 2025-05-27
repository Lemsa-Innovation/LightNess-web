import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

type IconProps = {
  className?: string;
};
const CallIcon: React.FC<IconProps> = ({ className }) => (
  <Icon icon="mdi:phone" className={className} />
);
const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <Icon icon="mdi:plus" className={className} />
);

const TrashIcon: React.FC<IconProps> = ({ className }) => (
  <Icon icon="solar:trash-bin-2-bold-duotone" className={className} />
);

const EditIcon: React.FC<IconProps> = ({ className }) => (
  <Icon icon="mdi:pencil-outline" className={className} />
);

const MinusIcon: React.FC<IconProps> = ({ className }) => (
  <Icon icon="mdi:minus" className={className} />
);

const BrandIcon: React.FC<IconProps> = ({ className }) => (
  <Icon icon="lets-icons:group-share" className={className} />
);

const AlertCircleIcon: React.FC<IconProps> = ({ className }) => (
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
