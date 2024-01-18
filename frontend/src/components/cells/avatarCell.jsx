import React from "react";

// Renderer for the avatar cells
const AvatarCellRenderer = ({ value }) => {
  return (
    <img src={value} alt="Avatar" style={{ width: "100%", height: "100%" }} />
  );
};

export default AvatarCellRenderer;
