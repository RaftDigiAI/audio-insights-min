import FormControl from '@mui/material/FormControl';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Criterion } from '../../models/types/criterion';

export interface CriteriaDesignerProps {
  criteria: Criterion[];
  addCriterion: (criteria: Criterion) => void;
}

export const CriteriaDesigner = ({ criteria, addCriterion }: CriteriaDesignerProps) => {
  const [criterion, setCriterion] = useState<string>('');

  const canAddMoreCriteria = criteria.length < 5;

  const add = () => {
    if (!canAddMoreCriteria || !criterion.length) return;
    const nextId = criteria.length + 1;
    addCriterion({ id: nextId, criterion });
    setCriterion('');
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      width: 100,
      editable: false,
      disableColumnMenu: true,
      disableReorder: true,
      sortable: false
    },
    {
      field: 'criterion',
      headerName: 'Критерий',
      minWidth: 500,
      flex: 1,
      editable: false,
      disableColumnMenu: true,
      disableReorder: true,
      sortable: false
    }
  ];

  return (
    <Box sx={{ width: '100%', minHeight: 300 }}>
      <DataGrid
        rows={criteria}
        columns={columns}
        hideFooterSelectedRowCount
        hideFooter
        sx={{
          minHeight: 200
        }}
      />
      <FormControl
        sx={{
          width: '100%',
          height: 100
        }}
      >
        <TextField
          value={criterion}
          required
          placeholder={'Критерий'}
          onChange={e => setCriterion(e.target.value)}
          disabled={!canAddMoreCriteria}
          sx={{ mt: 2, mb: 2 }}
          inputProps={{ maxLength: 256 }}
          label={'Критерий'}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={add}
          disabled={!criterion || !canAddMoreCriteria}
        >
          {'Добавить'}
        </Button>
      </FormControl>
    </Box>
  );
};
