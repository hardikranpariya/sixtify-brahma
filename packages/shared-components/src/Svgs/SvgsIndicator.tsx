import { getColorByVariant, type WorkDayType } from "../utils/colorVariant";

type SvgsIndicatorIconProps = {
  variant: WorkDayType;
};
export const SvgsIndicator = ({ variant }: SvgsIndicatorIconProps) => {
  const color = getColorByVariant(variant);

  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5" cy="5" r="5" fill={color} />
    </svg>
  );
};
