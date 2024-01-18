import React, { useState, useRef, useMemo, useCallback } from "react";
import actionsRenderer from "../cells/actionCell.jsx";
import avatarRenderer from "../cells/avatarCell.jsx";
import statusRenderer from "../cells/statusCell.jsx";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Custom hook for managing commitRow state
const useCommitRow = () => {
  const [commitRow, setCommitRow] = useState(false);
  return { commitRow, setCommitRow };
};

// Renamed component and modified imports
export const SubTable = ({ isAdmin, manageRowData }) => {
  const { rowData, addUser, updateUser, deleteUser } = manageRowData;
  const { commitRow, setCommitRow } = useCommitRow();
  const navigate = useNavigate();
  const gridRef = useRef();

  // Updated column definitions with modified renderer names
  const [columnDefs] = useState([
    { field: "name", flex: 15 },
    {
      field: "avatar",
      cellRenderer: avatarRenderer,
      autoHeight: true,
      flex: 10,
    },
    { field: "phone", flex: 15 },
    { field: "email", flex: 20 },
    { field: "rating", flex: 5 },
    { field: "status", cellRenderer: statusRenderer, flex: 6 },
    {
      headerName: "Hero Project",
      field: "hero_project",
      flex: 10,
      filter: "agMultiColumnFilter",
      sortable: true,
    },
    { field: "clickCount", name: "Times Row Clicked", flex: 6 },
    {
      field: "actions",
      cellRenderer: actionsRenderer,
      editable: false,
      width: 150,
    },
  ]);

  // Memoized default column definition
  const defaultColDef = useMemo(() => ({
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    editable: true,
  }));

  // Handler for row editing start
  const onRowEditingStarted = (params) => {
    params.api.refreshCells({
      columns: ["actions"],
      rowNodes: [params.node],
      force: true,
    });
  };

  // Handler for row editing stop
  const onRowEditingStopped = (params) => {
    params.api.refreshCells({
      columns: ["actions"],
      rowNodes: [params.node],
      force: true,
    });
  };

  // Revert values function
  const revertValues = (api) => {
    while (api.getCurrentUndoSize()) {
      api.undoCellEditing();
    }
  };

  // Callback to get row ID
  const getRowId = useCallback(function (params) {
    return params.data.id;
  }, []);

  // Handler to update click count
  const updateClickCount = (params) => {
    updateUser({ ...params.data, clickCount: params.data.clickCount + 1 });
    params.api.refreshCells({
      columns: ["clickCount"],
      rowNodes: [params.node],
      force: true,
    });
  };

  // Function to add a new user
  const addNewUser = () => {
    const newUser = {
      name: 'Press "Edit" to fill information',
      avatar:
        "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg",
      phone: "",
      email: "",
      rating: "",
      status: false,
      hero_project: "",
    };
    addUser(newUser);
  };

  // Function to navigate to admin page
  const enterAdmin = () => {
    navigate(`/admin/`);
  };

  // Function to exit admin mode
  const exitAdmin = () => {
    navigate(`/`);
  };

  // Render based on admin status
  if (isAdmin) {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>HaHa Heroes Volunteer Database</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={addNewUser}>Add User</button>
          <button onClick={exitAdmin}>Exit Admin Mode</button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>Click on the columns to toggle ascending/descending sort</span>
        </div>
        <AgGridReact
          onRowEditingStopped={onRowEditingStopped}
          onRowEditingStarted={onRowEditingStarted}
          suppressChangeDetection={true}
          undoRedoCellEditing={true}
          undo
          editType="fullRow"
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          suppressClickEdit={true}
          onRowClicked={updateClickCount}
          context={{
            isAdmin,
            deleteUser,
            updateUser,
            setCommitRow,
          }}
          onRowValueChanged={(event) => {
            console.log("row changed", commitRow, event);

            if (commitRow) {
              updateUser(event.data);
            }

            revertValues(gridRef.current.api);
            setCommitRow(false);
          }}
          getRowId={getRowId}
        />
      </div>
    );
  } else {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>HaHa Heroes Volunteer Database</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={enterAdmin}>Enter Admin Mode</button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>Click on the columns to toggle ascending/descending sort</span>
        </div>
        <AgGridReact
          onRowEditingStopped={onRowEditingStopped}
          onRowEditingStarted={onRowEditingStarted}
          suppressChangeDetection={true}
          undoRedoCellEditing={true}
          undo
          editType="fullRow"
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          suppressClickEdit={true}
          onRowClicked={updateClickCount}
          context={{
            isAdmin,
            deleteUser,
            updateUser,
            setCommitRow,
          }}
          onRowValueChanged={(event) => {
            console.log("row changed", commitRow, event);

            if (commitRow) {
              updateUser(event.data);
            }

            revertValues(gridRef.current.api);
            setCommitRow(false);
          }}
          getRowId={getRowId}
        />
      </div>
    );
  }
};
