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


export default function TableHuespedes({ data }) {
  return (
    <div>
      <Card>
        <Title>Listado de huespedes registrados</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nombres</TableHeaderCell>
              <TableHeaderCell>Apellidos</TableHeaderCell>
              <TableHeaderCell>DNI</TableHeaderCell>
              <TableHeaderCell>Teléfono</TableHeaderCell>
              <TableHeaderCell>Mail</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.dni}>
                <TableCell>{item.nombres}</TableCell>
                <TableCell>
                  <Text>{item.apellidos}</Text>
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
