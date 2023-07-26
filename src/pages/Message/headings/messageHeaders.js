export const messageHeadings = [
  {
    name: "№",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "NAME",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "SUBJECT",
    selector: (row) => row.subject,
    sortable: true,
  },
  {
    name: "EMAIL",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "DESCRIPTION",
    selector: (row) => row.description,
    sortable: true,
  },
];
