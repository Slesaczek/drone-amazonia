const DeliveryHistoryModel = {
  getDeliveries() {
    const storedDeliveries = JSON.parse(localStorage.getItem("deliveries")) || [];
    return storedDeliveries;
  },

  addDelivery(delivery) {
    const storedDeliveries = this.getDeliveries();
    const updatedDeliveries = [delivery, ...storedDeliveries].slice(0, 10);
    localStorage.setItem("deliveries", JSON.stringify(updatedDeliveries));
  },
};

export default DeliveryHistoryModel;
