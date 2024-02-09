import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";

const data = [
  {
    nombre: "Viola Amherd",
    apellido: "Federal Councillor",
    dni: "98798798",
    telefono: 123123123,
    mail: "juan@juan.com",
  },
];

export default function TableHuespedes() {
  return (
    <div>
      <Card>
        <Title>List of Swiss Federal Councillours</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Apellido</TableHeaderCell>
              <TableHeaderCell>DNI</TableHeaderCell>
              <TableHeaderCell>Teléfono</TableHeaderCell>
              <TableHeaderCell>Mail</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.dni}>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>
                  <Text>{item.apellido}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.dni}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.telefono}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.mail}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
