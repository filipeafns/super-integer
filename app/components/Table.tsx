import React from 'react';
import { Table as ReactTable } from 'react-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table';
import { Filter } from './Filter';
import { Column } from './Column';

interface TableProps {
  columns: any[];
  data: any[];
  filterable?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  filterable = true,
  className,
  style,
}) => {
  const {
    getTableProps,
    getTheadProps,
    getTrProps,
    getThProps,
    getTdProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: 'id',
            desc: true,
          },
        ],
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return (
    <div className={className} style={style}>
      {/* Add the item count here */}
      <p className="mb-2 text-sm text-gray-600">{data.length} items found</p>
      <DndProvider backend={HTML5Backend}>
        <ReactTable
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...getTrProps({ ...headerGroup })}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...getThProps({
                      ...column,
                      style: {
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                      },
                    })}
                  >
                    {column.render('Header')}
                    {column.canFilter && filterable && (
                      <Filter
                        column={column}
                        filterValue={column.filterValue}
                        setFilter={column.setFilter}
                        preFilteredRows={column.preFilteredRows}
                        id={column.id}
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...getTrProps({ ...row })}>
                  {row.cells.map((cell) => (
                    <td {...getTdProps(cell)}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </ReactTable>
      </DndProvider>
      <div className="mt-2 flex justify-between">
        <div className="flex items-center">
          <span className="mr-2">Search:</span>
          <input
            type="search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="input input-sm input-bordered w-64"
          />
        </div>
      </div>
    </div>
  );
};

export default Table;