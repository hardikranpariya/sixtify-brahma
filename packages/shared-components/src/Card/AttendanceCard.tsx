import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { PadBox } from "../PadBox";
import { SvgsIndicator } from "../Svgs/SvgsIndicator";
import { getColorByVariant, type WorkDayType } from "../utils/colorVariant";

type AttendanceCardProps = {
  variant: WorkDayType;
  label: string;
  value: string;
  isLoading: boolean;
};
export const AttendanceCard = ({
  variant,
  label,
  value,
  isLoading = false,
}: AttendanceCardProps) => {
  return (
    <Box
      sx={{
        width: "223px",
        height: "93px",
        borderRadius: "8px",
        border: `1px solid ${getColorByVariant(variant)}`,
        backgroundColor: `${getColorByVariant(variant, "light")}`,
        position: "relative",
      }}
    >
      <PadBox padding={{ padding: "15px" }}>
        <Stack gap="15px">
          <Typography>{label}</Typography>
          {isLoading ? (
            <Skeleton
              width={80}
              height={25}
              sx={{
                transform: "scale(1)",
                borderRadius: "4px",
              }}
            />
          ) : (
            <Typography variant="h6">{value}</Typography>
          )}
        </Stack>
        <Box sx={{ position: "absolute", top: "0px", right: "5px" }}>
          <SvgsIndicator variant={variant} />
        </Box>
      </PadBox>
    </Box>
  );
};
