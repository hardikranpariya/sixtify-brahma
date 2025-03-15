import { InputLabel, Stack, Typography, useTheme } from "@mui/material";
import { isFunction } from "lodash";
import { useRef } from "react";
import type {
  FieldValues,
  UseControllerProps,
  UseFormSetError,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PadBox } from "../../PadBox";
import { SvgsDrop } from "../../Svgs";
import { isFileSizeValid, isFileTypeValid } from "../../utils";
import { FileInput, FileUploadContainer } from "./FileUpload.styled";
import { Skeleton } from "./Skeleton";

export type FileUploadProps<P extends FieldValues> = UseControllerProps<P> & {
  multiple?: boolean;
  loading?: boolean;
  isDisabled?: boolean;
  onChange: (file: File[]) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  size?: number; //Note:- Size in MB
  accept?: string;
  fileNames: JSX.Element;
  acceptTitle?: string;
  setError?: UseFormSetError<FieldValues>;
};

export function FileUpload<P extends FieldValues>({
  loading = false,
  onChange,
  isDisabled,
  multiple = false,
  error,
  helperText,
  label,
  fileNames,
  size = 10,
  setError,
  accept = ".png,.jpg,.jpeg,.doc,.docx,.pdf",
  acceptTitle = "Only JPG, PNG, PDF files are accepted.",
  ...restProps
}: FileUploadProps<P>) {
  const theme = useTheme();

  const { red } = theme.palette.app.color;

  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      const uploadFiles: File[] = [];

      const inValidFiles: string[] = [];

      let isShowError: boolean = false;

      for (const element of files) {
        if (!isFileSizeValid(element, size)) {
          isShowError = true;

          inValidFiles.push(
            t("fileUpload.fileSize.error.message", {
              fileName: element.name,
              fileSize: size,
            })
          );
        } else if (!isFileTypeValid(element)) {
          isShowError = true;

          inValidFiles.push(
            t("fileUpload.fileType.error.message", {
              fileName: element.name,
            })
          );
        } else {
          uploadFiles.push(element);
        }
      }

      if (isShowError) {
        if (isFunction(setError)) {
          setError("document_url", {
            type: "custom",
            message: inValidFiles.join("\n"),
          });
        }

        return;
      }

      if (uploadFiles?.length > 0) {
        onChange(uploadFiles);

        event.target.value = "";
      }
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Stack gap="10px">
      <InputLabel required>{label}</InputLabel>

      <FileUploadContainer
        onClick={() => inputRef.current?.click()}
        error={error}
        {...restProps}
      >
        <PadBox padding={{ padding: "20px" }}>
          <Stack gap="4px" alignItems="center" justifyContent="center">
            <FileInput
              disabled={isDisabled}
              type="file"
              accept={accept}
              ref={inputRef}
              onChange={handleFileChange}
              multiple={multiple}
            />

            <SvgsDrop />

            <Typography>Drag & drop files or Browse</Typography>

            <Typography variant="caption">{acceptTitle}</Typography>
          </Stack>
        </PadBox>
      </FileUploadContainer>

      {error && (
        <Typography
          variant="caption"
          sx={{
            color: `${red[900]}`,
            whiteSpace: "pre",
            textWrap: "wrap",
          }}
        >
          {helperText}
        </Typography>
      )}
      {fileNames}
    </Stack>
  );
}
