import { Box, InputLabel, Stack, Tooltip, useTheme } from "@mui/material";
import type { DateTimePickerProps as MuiDateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import type { PickerValidDate } from "@mui/x-date-pickers/models";
import { DateTime } from "luxon";
import { type ReactElement, useState } from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
} from "react-hook-form";
import { useController } from "react-hook-form";
import { Skeleton } from "./Skeleton";
import { CalendarAction } from "../../Actions";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export type DateTimePickerProps<P extends FieldValues> = UseControllerProps<P> &
  MuiDateTimePickerProps<PickerValidDate> &
  Partial<{
    label: string;
    required: boolean;
    disabled: boolean;
    format: string;
    error: boolean;
    helperText: string;
    loading: boolean;
    clearable?: boolean;
    helperIcon?: ReactElement;
    toolTipText?: string;

    setError: (
      name: keyof P,
      error: FieldError | { type: string; message?: string }
    ) => void;
  }>;

export const LeftArrowIcon: React.FC = () => {
  const theme = useTheme();

  const { iron } = theme.palette.app.color;

  return (
    <ChevronLeftIcon
      sx={{
        border: `1px solid ${iron[800]}`,
        borderRadius: "5px",
        p: "4px",
      }}
    />
  );
};

export const RightArrowIcon: React.FC = () => {
  const theme = useTheme();

  const { iron } = theme.palette.app.color;

  return (
    <ChevronRightIcon
      sx={{
        border: `1px solid ${iron[800]}`,
        borderRadius: "5px",
        p: "4px",
      }}
    />
  );
};

export function DateTimePicker<P extends FieldValues>({
  control,
  defaultValue,
  disabled = false,
  label,
  readOnly = false,
  name,
  error = false,
  helperText,
  loading = false,
  required = false,
  clearable = true,
  rules,
  format = "dd-MM-yyyy HH:mm",
  helperIcon,
  toolTipText,
  ...restProps
}: DateTimePickerProps<P>) {
  const {
    field: { value, onChange, ...restField },
  } = useController({ name, control, defaultValue, rules });

  const [open, setOpen] = useState(false);

  if (error && value && typeof value === "object") {
    helperText = "Invalid time";
  }

  const theme = useTheme();

  const { iron, butterflyBlue, mirage } = theme.palette.app.color;

  const pickerValue = value
    ? // eslint-disable-next-line sonarjs/no-nested-conditional
      (DateTime.fromISO(value) as PathValue<P, Path<P> & (string | undefined)>)
    : null;

  if (loading) {
    return (
      <Box sx={{ width: "350px" }}>
        <Skeleton label={label} />
      </Box>
    );
  }

  const EmptyIcon = () => null;

  return (
    <Stack gap="10px">
      {label && (
        <Stack alignItems="center" flexDirection="row" gap="5px">
          <InputLabel required={required} disabled={disabled}>
            {label}
          </InputLabel>
          {helperIcon && toolTipText && (
            <Tooltip title={toolTipText} placement="bottom">
              {helperIcon}
            </Tooltip>
          )}
        </Stack>
      )}
      <MuiDateTimePicker<DateTime>
        {...restField}
        {...restProps}
        disabled={disabled}
        readOnly={readOnly}
        open={open}
        ampm={false}
        value={pickerValue}
        format={format}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        slotProps={{
          field: {
            clearable,
            onClear: () => onChange(null),
          },
          textField: {
            disabled,
            helperText,
            error,
            InputProps: {
              endAdornment: <CalendarAction onClick={() => setOpen(true)} />,
              sx: {
                "& .MuiInputAdornment-root": {
                  width: "30px",
                },
              },
            },
          },
          popper: {
            sx: {
              "& .MuiList-padding": {
                padding: "10px",
              },
              "& .MuiMultiSectionDigitalClockSection-item": {
                padding: "4px",
              },
              "& .MuiMultiSectionDigitalClockSection-item.Mui-selected": {
                backgroundColor: butterflyBlue[900],
                borderRadius: "5px",
              },
              "& .MuiMultiSectionDigitalClockSection-item.Mui-selected:hover": {
                backgroundColor: butterflyBlue[900],
                borderRadius: "5px",
              },
              "& .Mui-selected:hover": {
                backgroundColor: butterflyBlue[900],
                borderRadius: "5px",
              },
              "& .MuiMultiSectionDigitalClockSection-item.Mui-selected:focus-visible":
                {
                  backgroundColor: butterflyBlue[900],
                  borderRadius: "5px",
                },
              "& .Mui-selected:focus-visible": {
                backgroundColor: butterflyBlue[900],
                borderRadius: "5px",
              },
            },
          },
          day: {
            sx: {
              "&.MuiPickersDay-root": {
                borderRadius: "5px",
                borderColor: butterflyBlue[900],
                fontWeight: 500,
                color: mirage[900],
              },
              "&.MuiPickersDay-root.Mui-selected": {
                backgroundColor: butterflyBlue[900],
                color: iron[600],
              },
              "&.MuiPickersDay-today": {
                color: butterflyBlue[900],
                backgroundColor: iron[600],
              },
              ":focus": {
                backgroundColor: "transparent",
              },
            },
          },
          calendarHeader: {
            sx: {
              "& .MuiPickersCalendarHeader-label": {
                fontWeight: "bold",
              },
            },
          },
          yearButton: {
            sx: {
              "&.MuiPickersYear-yearButton.Mui-selected": {
                backgroundColor: butterflyBlue[900],
              },
            },
          },
        }}
        slots={{
          leftArrowIcon: LeftArrowIcon,
          rightArrowIcon: RightArrowIcon,
          switchViewIcon: EmptyIcon,
        }}
        shouldDisableTime={() => !pickerValue}
        onChange={(value) => {
          if (value?.isValid) {
            return onChange(value.toUTC().toISO());
          }

          onChange(value);
        }}
      />
    </Stack>
  );
}
