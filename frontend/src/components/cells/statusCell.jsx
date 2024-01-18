import React from "react";

// Renderer for the status cells
export default (props) => {
  const statusText = props ? "Active" : "Inactive";
  return <span>{statusText}</span>;
};
