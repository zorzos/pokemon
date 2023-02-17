import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid/models';
import { GridEventListener } from '@mui/x-data-grid';


interface PokemonTableProps {
  totalCount: number;
  loading: boolean;
  rows: GridRowsProp[],
  autoHeight: boolean;
  columnWidth: number;
  navigate(direction: string): void;
  setCurrentPokemonId(id: number): void;
}

function PokemonTable(props: PokemonTableProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const { 
    rows, 
    autoHeight,
    columnWidth,
    loading,
    totalCount,
    navigate,
    setCurrentPokemonId
  } = props

  const handleClick: GridEventListener<'rowClick'> = (params) => {
    const { row: { id } } = params
    setCurrentPokemonId(id)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Pokemon #', width: columnWidth / 7 },
    { field: 'name', headerName: 'Name', width: columnWidth / 3 },
    { field: 'url', headerName: 'URL', width: columnWidth / 3 },
  ]

  return (
    <DataGrid
      onRowClick={handleClick}
      pageSize={20}
      rowCount={totalCount}
      paginationMode="server"
      loading={loading}
      autoHeight={autoHeight}
      rows={rows}
      columns={columns}
      rowsPerPageOptions={[]}
      getRowClassName={() => 'pokemon-table-row'}
      onPageChange={
        (newPage) => {
          const actualNewPage = newPage + 1
          if (actualNewPage > currentPage) navigate('next') 
          else navigate('previous')
          setCurrentPage(newPage + 1)
        }
      }
    />
  );
}

export default PokemonTable