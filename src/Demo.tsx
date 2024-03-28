import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import SearchBar from "material-ui-search-bar";
import React, { useState } from "react";

const CustomToolbar = (props) => (
  <div>
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
    <SearchBar {...props} />
  </div>
);
const DATASET = [
  { id: 1, file_id: 134, name: "Joe" },
  { id: 2, file_id: 123, name: "Jane" },
  { id: 3, file_id: 453, name: "James" },
  { id: 4, file_id: 134, name: "Jeniffer" },
  { id: 5, file_id: 999, name: "測試名!!" },
  { id: 6, file_id: 998, name: "坂井 泉水（さかい いずみ）" },
];

export default function Demo() {
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState<any[]>(DATASET);
  const [columns] = useState<any[]>([
    { headerName: "File ID", field: "file_id", width: 120 },
    { headerName: "Name", field: "name", width: 230 },
  ]);

  const requestSearch = (searchValue: string) => {
    searchValue = searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape for regex
    const searchRegex = new RegExp(`.*${searchValue}.*`, "ig");
    const fieldsToSearch = ["name", "file_id"]; //only search these fields
    const filteredRows = DATASET.filter((o: any) => {
      return fieldsToSearch.some((k: any) => {
        return searchRegex.test(o[k].toString());
      });
    });
    setTableData(filteredRows);
  };

  const cancelSearch = () => {
    setSearchText("");
    requestSearch(searchText);
  };

  return (
    <div style={{ height: 500, width: "100%", backgroundColor: "white" }}>
      <DataGrid
        components={{ Toolbar: CustomToolbar }}
        rows={tableData}
        columns={columns}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (searchVal: string) => requestSearch(searchVal),
            onCancelSearch: () => cancelSearch(),
          },
        }}
      />
    </div>
  );
}
