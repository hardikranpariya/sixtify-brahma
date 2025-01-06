import { Stack } from "@mui/material";
import { SvgsIndicator } from "../Svgs/SvgsIndicator";
import { type WorkDayType } from "../utils/colorVariant";

type IndicatorProps = {
  label?: string;
  variant: WorkDayType;
};

export const Indicator = ({ label, variant }: IndicatorProps) => {
  return (
    <Stack gap="10px" direction="row" alignItems="center">
      <SvgsIndicator variant={variant} />
      {label}
    </Stack>
  );
};
