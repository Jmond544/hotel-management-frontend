import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ModifyReservationByID() {
  const [idParam, setIdParam] = useState("");
  const { id } = useParams();
  useEffect(() => {
    setIdParam(id);
  }, [id]);

  return <div>{idParam}</div>;
}
