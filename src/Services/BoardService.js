// BoardService.js
import BoardModel from "../Models/BoardModel";

const BoardService = {
  getCoordinates() {
    return BoardModel.getCoordinates();
  },
};

export default BoardService;
