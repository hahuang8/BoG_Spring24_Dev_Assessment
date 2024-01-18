import React from "react";
import { useNavigate } from "react-router-dom";

// Updated functional component with modified variable names
const UserActions = (props) => {
  // Function to invoke the delete method
  const handleDelete = () => {
    props.context.deleteUser(props.data.id);
  };

  // Hook for navigation
  const navigate = useNavigate();

  // Function to navigate to volunteer notes with user data
  const viewNotes = () => {
    navigate(`/volunteernotes/${props.data.id}`, {
      state: { name: props.data.name, avatar: props.data.avatar },
    });
  };

  // Fetch editing cells and check if the current row is being edited
  const editingCells = props.api.getEditingCells();
  const isCurrentRowEditing = editingCells.some((cell) => {
    return cell.rowIndex === props.node.rowIndex;
  });

  // Render different buttons based on user's admin status
  if (props.context.isAdmin) {
    return (
      <span>
        <div>
          {/* Conditionally render Edit or Update button */}
          {!isCurrentRowEditing ? (
            <button
              onClick={(e) => {
                props.api.startEditingCell({
                  rowIndex: props.node.rowIndex,
                  colKey: props.columnApi.getDisplayedCenterColumns()[0].colId,
                });
              }}
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => {
                props.context.setCommitRow(true);
                props.api.stopEditing(false);
              }}
            >
              Update
            </button>
          )}
          {/* Render Cancel button if the row is being edited */}
          {isCurrentRowEditing && (
            <button
              onClick={() => {
                props.api.stopEditing(true);
              }}
            >
              Cancel
            </button>
          )}
          {/* Render Delete button */}
          <button onClick={handleDelete}>Delete</button>
        </div>
        <div>
          {/* Render View Notes button */}
          <button onClick={viewNotes}>View Notes</button>
        </div>
      </span>
    );
  } else {
    // Render View Notes button for non-admin users
    return (
      <div>
        <button onClick={viewNotes}>View Notes</button>
      </div>
    );
  }
};

export default UserActions;
