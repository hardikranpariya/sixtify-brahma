import type { ReactNode } from "react";
import type { PieChartProps as MuiPieChartProps } from "@mui/x-charts/PieChart";
import { PieChart as MuiPieChart } from "@mui/x-charts/PieChart";
import type { PieSeriesType, PieValueType } from "@mui/x-charts";
import type { MakeOptional } from "@mui/x-charts/internals";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

type PieChartProps = Omit<MuiPieChartProps, "series"> & {
  series: MakeOptional<PieSeriesType<MakeOptional<PieValueType, "id">>, "type">;
  label?: string;
};

type PieCenterLabelProps = {
  children: ReactNode;
};

export const PieChart = ({
  height = 235,
  skipAnimation = false,
  tooltip,
  label,
  series,
  ...rest
}: PieChartProps) => {
  const valueFormatter = (item: MakeOptional<PieValueType, "id">) =>
    `${item.value}%`;

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 20,
  }));

  // eslint-disable-next-line sonarjs/no-unstable-nested-components
  const PieCenterLabel = ({ children }: PieCenterLabelProps) => {
    const { width, height, left, top } = useDrawingArea();

    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  };

  return (
    <MuiPieChart
      height={height}
      sx={{
        transform: "translate(50px, 0px)",
        overflow: "visible",
      }}
      series={[
        {
          arcLabel: (params) => params.label ?? "",
          arcLabelMinAngle: 20,
          valueFormatter,
          ...series,
        },
      ]}
      {...rest}
      tooltip={tooltip}
      skipAnimation={skipAnimation}
    >
      <PieCenterLabel>{label}</PieCenterLabel>
    </MuiPieChart>
  );
};
