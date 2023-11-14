import { Box, Typography } from "@mui/material";

export interface TranscriptionViewerProps {
  transcription: string;
}

export const TranscriptionViewer = ({
  transcription,
}: TranscriptionViewerProps) => {
  if (!transcription) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Расшифровка
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          maxHeight: 300,
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: 1,
        }}
      >
        {transcription.split("\n").map((line, index) => (
          <Typography key={index} variant="body2">
            {line}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
