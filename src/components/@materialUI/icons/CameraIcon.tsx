import React from 'react';

interface IconProps {
  fill ?: string;
  className?: string;
  size :number
}

const CameraIcon: React.FC<IconProps> = ({ fill,className,size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    className={className}
    height={size}
    width={size}
    viewBox="0 0 24 24"
  >
    <g fill={fill || "currentColor"} fillRule="evenodd" clipRule="evenodd">
      <path d="M12 10.25a.75.75 0 0 1 .75.75v1.25H14a.75.75 0 0 1 0 1.5h-1.25V15a.75.75 0 0 1-1.5 0v-1.25H10a.75.75 0 0 1 0-1.5h1.25V11a.75.75 0 0 1 .75-.75Z" />
      <path d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.408 4.408 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697c0-3.065 0-4.597-.749-5.697a4.407 4.407 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702c-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636c-.129.635-.696 1.125-1.355 1.125c-1.38.06-2.282.23-3.003.702A4.405 4.405 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364c0 3.064 0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21ZM16 13a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm2-3.75a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5h-1Z" />
    </g>
  </svg>
);

export default CameraIcon;
