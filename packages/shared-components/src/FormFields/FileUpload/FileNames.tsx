import { AttachFile } from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IconButton, Stack, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

type FileNamesProps = {
  names: string[];
  onDelete: (index: number) => void;
};

export const FileNames = ({ names, onDelete }: FileNamesProps) => {
  return names.map((name: string, index: number) => {
    return (
      <Stack
        key={uuidv4()}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" gap="8x">
          <AttachFile />

          <Typography>{name}</Typography>
        </Stack>

        <IconButton onClick={() => onDelete(index)}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Stack>
    );
  });
};
