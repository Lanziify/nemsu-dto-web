import React from "react";
import DataTable from "react-data-table-component";

const UserTableList = (props) => {
  const columns = [
    {
      name: "User ID",
      selector: (data) => data.uid.toUpperCase(),
      sortable: true,
      grow: 2,
    },
    {
      name: "Name",
      selector: (data) => data.name,
      sortable: true,
      grow: 1,
    },
    {
      name: "Email",
      selector: (data) => data.email,
      sortable: true,
      center: true,
      hide: "sm",
    },
    {
      name: "Office",
      selector: (data) => data.office,
      sortable: true,
      right: true,
      hide: "md",
    },
    {
      name: "Position",
      selector: (data) => data.position,
      sortable: true,
      right: true,
      hide: "sm",
    },
    // {
    //   name: "Created Date",
    //   selector: (data) => data.createdAt,
    //   sortable: true,
    //   right: true,
    //   hide: "sm",
    // },
  ];

  const tableStyle = {
    title: {
      style: {
        fontWeight: "bold",
      }
    },
    headRow: {
      style: {
        // backgroundColor: "#3b82f6",
        fontWeight: "bold",
        // color: "#FFFF",
        
      },
    },
    noData: {
      style: {
      },
    },
    rows: {
      style: {

      },
    },
    columns: {
      style: {
        
      },
    },
    pagination: {
      style: {
        backgroundColor: "#fff",
      },
    },
  };

  return (
    <DataTable
      columns={columns}
      data={props.data}
      // striped={true}
      pointerOnHover
      highlightOnHover
      customStyles={tableStyle}
      pagination
      responsive={true}
      onRowClicked={props.onRowClicked}
    />
  );
};

export default UserTableList;
