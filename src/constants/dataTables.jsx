export const customStyles = (theme) => {
  const styles = {
    rows: {
      style: {
        color: theme === "light" ? "black" : "white",
        borderColor: "rgb(229 229 229)",
        backgroundColor: theme === "light" ? "rgb(255 255 255)" : "#2b343b",
      },
      highlightOnHoverStyle: {
        cursor: "pointer",
        backgroundColor: theme === "light" ? "rgb(229 229 229)" : "#2b343bf2",
        color: theme === "light" ? "black" : "white",
      },
    },
    headCells: {
      style: {
        color: "rgb(163 163 163)",
        borderColor: "rgb(229 229 229)",
        backgroundColor: theme === "light" ? "rgb(255 255 255)" : "#2b343b",
        fontWeight: "bold",
        fontSize: "12px",
      },
    },
    headRow: {
      style: {
        backgroundColor: theme === "light" ? "rgb(255 255 255)" : "#2b343b",
      },
    },
    table: {
      style: {
        backgroundColor: theme === "light" ? "rgb(255 255 255)" : "#2b343b",
      },
    },
    tableWrapper: {
      style: {
        backgroundColor: theme === "light" ? "rgb(255 255 255)" : "#2b343b",
      },
    },
    noData: {
      style: {
        background: theme === "light" ? "rgb(255 255 255)" : "#2b343b",
        color: theme === "light" ? "black" : "white",
      },
    },
    pagination: {
      style: {
        color: "rgb(163 163 163)",
        borderColor: "rgb(229 229 229)",
        backgroundColor: theme === "light" ? "rgb(255 255 255)" : "#2b343b",
        fontWeight: "bold",
      },
    },
  };

  return styles;
};