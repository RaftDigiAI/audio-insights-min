import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import CriteriaDesigner from "./components/CriteriaDesigner";
import { Criterion } from "./models/types/criterion";
import { useFilePicker } from "use-file-picker";
import { LoadingIndicator } from "./components/LoadingIndicator/LoadingIndicator";
import apiService from "./services/apiService";
import { AnalyzeAudioResponse } from "./models/responses/analyzeAudioResponse";
import ResultsTable from "./components/ResultsTable";
import TranscriptionViewer from "./components/TranscriptionViewer";

function App() {
  const appTheme = useMemo(() => createTheme(), []);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const addCriterion = (criterion: Criterion) =>
    setCriteria([...criteria, criterion]);
  const [running, setRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeAudioResponse | null>(null);

  const [openFileSelector, { loading, plainFiles }] = useFilePicker({
    accept: [".mp3", ".txt"],
    multiple: false,
  });

  const selectedFile = plainFiles[0];

  const startAnalysis = async () => {
    setError(null);
    setRunning(true);

    try {
      const result = await apiService.analyze(
        {
          criteria,
        },
        selectedFile as File
      );
      console.log(result);
      setResult(result);
    } catch (e) {
      setError("Ошибка при анализе");
    } finally {
      setRunning(false);
    }
  };

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Container
        maxWidth={false}
        disableGutters
        sx={{ display: "flex", flexDirection: "column" }}
      >
        {running && <LoadingIndicator />}
        {!running && (
          <Stack direction="column" sx={{ p: 5, width: "100%" }}>
            <Button
              variant="outlined"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 3,
                width: "50%",
              }}
              onClick={() => openFileSelector()}
            >
              {selectedFile?.name ?? "Выбрать mp3 или txt файл"}
            </Button>
            <Box
              sx={{
                mb: 3,
              }}
            >
              <CriteriaDesigner
                criteria={criteria}
                addCriterion={addCriterion}
              />
            </Box>
            <Button
              variant="contained"
              disabled={!selectedFile || !criteria.length}
              sx={{
                mt: 3,
                mb: 3,
                width: "100%",
              }}
              onClick={startAnalysis}
            >
              {"Запустить анализ"}
            </Button>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <Stack direction="row" sx={{ gap: 2 }}>
              <Box sx={{ width: "50%" }}>
                <ResultsTable result={result} />
              </Box>
              <Box sx={{ width: "50%" }}>
                <TranscriptionViewer
                  transcription={result?.data.transcription ?? ""}
                />
              </Box>
            </Stack>
          </Stack>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
