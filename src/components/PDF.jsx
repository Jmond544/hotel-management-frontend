import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { getReservationByIdRequest } from "../api/reservation.api";
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingVertical: 30,
    paddingHorizontal: 50,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "Oswald",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Oswald",
  },
  text: {
    fontSize: 12,
    fontFamily: "Times-Roman",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default function PDF({
  id,
}) {
  const [reservation, setReservation] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await getReservationByIdRequest({ id });
			setReservation(result[0]);
    };
		fetchData();
  }, [id]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>~ Dolphin Hotel ~</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Boleta de Reserva</Text>
          <Text style={styles.text}>Clientes: {reservation.huespedes}</Text>
          <Text style={styles.text}>Teléfono: {reservation.telefono_pago}</Text>
          <Text style={styles.text}>Email: {reservation.mail_pago}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Detalles boleta</Text>

          <View style={styles.item}>
            <Text style={styles.text}>
              Habitaciones: {reservation.habitaciones}
            </Text>
            <Text style={styles.text}>
              ${reservation.monto_pago - reservation.precio_tipo_servicio}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>
              Tipo de servicio: {reservation.tipo_servicio}
            </Text>
            <Text style={styles.text}>${reservation.precio_tipo_servicio}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Total a Pagar</Text>
          <Text style={styles.text}>${reservation.monto_pago}</Text>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
