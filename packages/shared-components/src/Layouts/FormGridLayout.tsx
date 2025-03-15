import { Grid } from "@mui/material";
import { Children, type ReactNode } from "react";

type FormGridLayoutProps = {
  children: ReactNode;
  columns?: number;
};

export const FormGridLayout = ({
  children,
  columns = 3,
}: FormGridLayoutProps) => {
  return (
    <Grid container spacing={2}>
      {Children.map(
        children,
        (child, index) =>
          child && (
            // eslint-disable-next-line sonarjs/no-array-index-key
            <Grid item xs={12 / columns} key={index}>
              {child}
            </Grid>
          )
      )}
    </Grid>
  );
};
