import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridEventListener } from '@mui/x-data-grid';

import { PokemonTableProps } from './types';

function PokemonTable(props: PokemonTableProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const { 
    autoHeight,
    columns,
    loading,
    navigate,
    rows,
    setCurrentPokemonId,
    totalCount,
  } = props

  const handleClick: GridEventListener<'rowClick'> = (params) => {
    const { row: { id } } = params
    setCurrentPokemonId(id)
  }

  return (
    <DataGrid
      autoHeight={autoHeight}
      columns={columns}
      getRowClassName={() => 'pokemon-table-row'}
      loading={loading}
      onPageChange={
        (newPage) => {
          const actualNewPage = newPage + 1
          if (actualNewPage > currentPage) navigate('next') 
          else navigate('previous')
          setCurrentPage(newPage + 1)
        }
      }
      onRowClick={handleClick}
      pageSize={20}
      paginationMode="server"
      rowCount={totalCount}
      rows={rows}
      rowsPerPageOptions={[]}
    />
  );
}

export default PokemonTable