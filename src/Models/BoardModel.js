// BoardModel.js

const BoardModel = {
    getCoordinates() {
      const coordinates = [];
      for (let linha = 7; linha >= 0; linha--) {
        for (let coluna = 0; coluna < 8; coluna++) {
          const letra = String.fromCharCode('A'.charCodeAt(0) + coluna);
          const numero = 8 - linha;
          coordinates.push(letra + numero);
        }
      }
      coordinates.sort();
      return coordinates;
    },
  };
  
  export default BoardModel;
  