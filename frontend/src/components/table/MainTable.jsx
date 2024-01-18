import React, { useEffect, useState } from "react";
import { SubTable } from "./SubTable"; // Updated import name

// Function to add a new user to existing data
function addUserToData(existingData, newUser) {
  return [{ ...newUser, clickCount: 0 }, ...existingData];
}

// Function to update an existing user in the data
function updateUserInData(existingData, updatedUser) {
  return existingData.map((user) => {
    if (user.id === updatedUser.id) {
      return updatedUser;
    }
    return user;
  });
}

// Function to delete a user from existing data
function removeUserFromData(existingData, deletedUserId) {
  return existingData.filter((user) => user.id !== deletedUserId);
}

const useManageRowData = () => {
  const [rowData, setRowData] = useState();

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("http://localhost:5000/api/bog/users")
      .then((response) => response.json())
      .then((fetchedData) =>
        setRowData(fetchedData.map((user) => ({ ...user, clickCount: 0 })))
      )
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return {
    rowData,
    addUser: (newUser) => {
      setRowData((existingData) => addUserToData(existingData, newUser));
    },
    updateUser: (updatedUser) => {
      setRowData((existingData) => updateUserInData(existingData, updatedUser));
    },
    deleteUser: (deletedUserId) => {
      setRowData((existingData) =>
        removeUserFromData(existingData, deletedUserId)
      );
    },
  };
};

export const MainTable = ({ isAdmin }) => {
  const manageRowData = useManageRowData();
  return <SubTable isAdmin={isAdmin} manageRowData={manageRowData} />;
};
