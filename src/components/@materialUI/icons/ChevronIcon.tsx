interface ChevronIconProps {
  fill?: string;
  right?: boolean;
  left?: boolean;
  down?: boolean;
  up?: boolean;
  filled?: boolean;
  size?: number;
  height?: number;
  width?: number;
  label?: string;
}

const ChevronIcon = ({
  fill = "currentColor",
  right,
  left,
  down,
  up,
  filled,
  size,
  height,
  width,
  label,
  ...props
}: ChevronIconProps) => {
  let rotation = 180;

  if (right) {
    rotation = 180;
  } else if (left) {
    rotation = 0;
  } else if (down) {
    rotation = -90;
  } else if (up) {
    rotation = 90;
  }

  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill={filled ? fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform={`rotate(${rotation} 12 12)`}>
        <path
          d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6L14 18Z"
          stroke={fill}
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default ChevronIcon;
