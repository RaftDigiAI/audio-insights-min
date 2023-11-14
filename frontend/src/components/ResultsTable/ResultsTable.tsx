import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { AnalyzeAudioResponse } from "../../models/responses/analyzeAudioResponse";

export interface ResultsTableProps {
  result: AnalyzeAudioResponse | null;
}

export const ResultsTable = ({ result }: ResultsTableProps) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 100,
      editable: false,
      disableColumnMenu: true,
      disableReorder: true,
      sortable: false,
    },
    {
      field: "criterion",
      headerName: "Критерий",
      minWidth: 400,
      flex: 1,
      editable: false,
      disableColumnMenu: true,
      disableReorder: true,
      sortable: false,
    },
    {
      field: "answer",
      headerName: "Ответ",
      width: 150,
      editable: false,
      disableColumnMenu: true,
      disableReorder: true,
      sortable: false,
      valueFormatter(params) {
        return params.value ? "Да" : "Нет";
      },
    },
  ];

  if (!result) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", minHeight: 300 }}>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Результаты
      </Typography>
      <DataGrid
        rows={result.data.results}
        columns={columns}
        hideFooterSelectedRowCount
        hideFooter
        sx={{
          minHeight: 200,
        }}
      />
    </Box>
  );
};
