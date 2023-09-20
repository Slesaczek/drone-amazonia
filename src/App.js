import React, { useState, useEffect } from "react";
import axios from "axios";
import CalculateRoute from "./utils/CalculateRoute";
import BoardService from "./Services/BoardService";
import DeliveryHistoryService from "./Services/DeliveryHistoryService";
import DeliveryHistory from "./Components/DeliveryHistory";

function App() {
  const [state, setState] = useState({
    droneStart: "",
    objectPickup: "",
    result: null,
    boardCoordinates: [],
    showErrorPopup: false,
    deliveries: [],
  });

  useEffect(() => {
    const boardCoordinates = BoardService.getCoordinates();
    setState((prevState) => ({ ...prevState, boardCoordinates }));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateCoordinates = (
    droneStart,
    objectPickup,
    deliveryDestination
  ) => {
    if (!droneStart || !objectPickup || !deliveryDestination) {
      alert("Please fill in all the fields.");
      return false;
    }

    if (droneStart === objectPickup) {
      alert("Drone Start cannot be the same as Object Pickup.");
      return false;
    }

    if (objectPickup === deliveryDestination) {
      alert("Object Pickup cannot be the same as Delivery Destination.");
      return false;
    }

    return true;
  };

  const getAPIAndCalculate = async () => {
    const { droneStart, objectPickup, deliveryDestination } = state;
    const apiUrl = "https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f";

    if (!validateCoordinates(droneStart, objectPickup, deliveryDestination)) {
      return;
    }

    try {
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        const dados = response.data;

        if (dados) {
          const [path, time] = CalculateRoute.calculatePaths(dados, {
            DroneStart: droneStart,
            ObjectPickup: objectPickup,
            DeliveryDestination: deliveryDestination,
          });

          const deliveryMessage = (
            <>
              <span>
                The delivery will be route {path}.<br></br>
                It will take {time.toFixed(2)} to be delivered as quickly as
                possible.
              </span>
            </>
          );

          // Atualize o estado com o resultado e adicione a entrega ao histórico
          setState((prevState) => ({
            ...prevState,
            result: deliveryMessage,
          }));

          // Crie o objeto de entrega
          const delivery = {
            origin: droneStart,
            destination: deliveryDestination,
            deliveryTime: time,
          };

          // Atualize o localStorage com as entregas
          DeliveryHistoryService.addDelivery(delivery);
        } else {
          console.log("Dados da API são nulos.");
        }
      } else {
        console.log(
          `A chamada à API falhou com código de status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Ocorreu um erro ao chamar a API:", error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen min-w-full flex justify-center items-center">
      <div className="p-10 bg-gray-900 text-white font-sans rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 xl:h-1/2">
        <h1 className="text-3xl md:text-2xl font-bold mb-4">
          Input the coordinates:
        </h1>
        <form>
          <div className="mb-2">
            <label className="text-lg" htmlFor="droneStart">
              Drone Start:
            </label>
            <select
              className="block w-full p-2 bg-gray-800 text-gray-300 border border-gray-700 rounded"
              id="droneStart"
              name="droneStart"
              value={state.droneStart}
              onChange={handleInputChange}
            >
              <option value="">Select a coordinate</option>
              {state.boardCoordinates.map((coordinate) => (
                <option key={coordinate} value={coordinate}>
                  {coordinate}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="text-lg" htmlFor="objectPickup">
              Object Pickup:
            </label>
            <select
              className="block w-full p-2 bg-gray-800 text-gray-300 border border-gray-700 rounded"
              id="objectPickup"
              name="objectPickup"
              value={state.objectPickup}
              onChange={handleInputChange}
            >
              <option value="">Select a coordinate</option>
              {state.boardCoordinates.map((coordinate) => (
                <option key={coordinate} value={coordinate}>
                  {coordinate}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="text-lg" htmlFor="deliveryDestination">
              Delivery Destination:
            </label>
            <select
              className="block w-full p-2 bg-gray-800 text-gray-300 border border-gray-700 rounded"
              id="deliveryDestination"
              name="deliveryDestination"
              value={state.deliveryDestination}
              onChange={handleInputChange}
            >
              <option value="">Select a coordinate</option>
              {state.boardCoordinates.map((coordinate) => (
                <option key={coordinate} value={coordinate}>
                  {coordinate}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>
              Example: The set delivery will have the route A1-B1+B1-C1+
              C1-C2+[...]+D4-F4+[...]+B7-B8 , and will take 1342 seconds to be
              delivered as fast as possible.
            </span>
          </div>
          <button
            className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600 mt-4"
            type="button"
            onClick={getAPIAndCalculate}
          >
            Calculate route
          </button>
        </form>
        {state.result && (
          <div className="mt-4">
            <h2 className="text-xl md:text-2xl font-semibold">Resultado:</h2>
            <p className="text-white">{state.result} </p>
          </div>
        )}
        <DeliveryHistory />
      </div>
    </div>
  );
}

export default App;
