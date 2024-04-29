// Fake data for lab manager information
const labManagerInfo = [ 
    {id: 1, section: "NUR330L", date: "2023-12-05", instructor: "Dr. Jane Smith"},
    {id: 2, section: "NUR301L", date: "2023-12-05", instructor: "Prof. Alan Brown"},
    {id: 3, section: "NUR332L", date: "2023-12-05", instructor: "Dr. Maya Patel"},
    {id: 4, section: "NUR333L", date: "2023-12-05", instructor: "Dr. Raj Singh"},
    {id: 5, section: "NUR334L", date: "2023-12-05", instructor: "Dr. Kevin Wong"},
    {id: 6, section: "NUR335L", date: "2023-12-05", instructor: "Prof. Sarah Lee"}
];

export function getLabManagerInfo() {
  return labManagerInfo;
}