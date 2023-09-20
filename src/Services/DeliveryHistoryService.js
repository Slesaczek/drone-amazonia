import DeliveryHistoryModel from "../Models/DeliveryHistoryModel";

const DeliveryHistoryService = {
  getDeliveries() {
    return DeliveryHistoryModel.getDeliveries();
  },

  addDelivery(delivery) {
    DeliveryHistoryModel.addDelivery(delivery);
  },
};

export default DeliveryHistoryService;
