import DataTable from "react-data-table-component";
import { customStyles } from "../constants/dataTables";

const DataTables = ({ data, columns, conditionalRowStyles, onRowClick }) => {

  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={customStyles("light")}
      highlightOnHover={true}
      pagination={true}
      striped={true}
      onRowClicked={onRowClick}
      conditionalRowStyles={conditionalRowStyles}
    />
  );
};

export default DataTables; 