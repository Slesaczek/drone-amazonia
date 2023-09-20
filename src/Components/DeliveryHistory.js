import React, { useState, useEffect } from "react";
import DeliveryHistoryService from "../Services/DeliveryHistoryService";

function DeliveryHistory() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    // Carregar as entregas do serviço quando o componente for montado
    setDeliveries(DeliveryHistoryService.getDeliveries());

    // Defina um intervalo para atualizar as entregas a cada 30 segundos (ou outro intervalo desejado)
    const interval = setInterval(() => {
      setDeliveries(DeliveryHistoryService.getDeliveries());
    }, 1000); // 30 segundos em milissegundos

    // Lembre-se de remover o intervalo quando o componente for desmontado
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white pt-4 shadow-lg border-t-4 mt-4">
      <h2 className="text-3xl md:text-2xl font-bold mb-4">Last deliverieas:</h2>
      <ul className="list-inside list-disc">
        {deliveries.length > 0 ? (
          deliveries.slice(0, 10).map((delivery, index) => (
            <li key={index} className="mb-0 list-none">
              <span className="font-semibold p-0 m-0">
                - From {delivery.origin}, picking-up at {delivery.pickup} to{" "}
                {delivery.destination} in{" "}
              </span>
              <span className="text-blue-500">
                {delivery.deliveryTime.toFixed(2)} seconds
              </span>
            </li>
          ))
        ) : (
          <li>Nenhuma entrega encontrada.</li>
        )}
      </ul>
    </div>
  );
}

export default DeliveryHistory;
