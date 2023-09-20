const express = require('express');
const app     = express();
const path    = require('path');

const port = process.env.PORT || 3001;  // Porta que desejar

  // Configure o Express para servir arquivos estáticos da pasta 'build'
app.use(express.static(path.join(__dirname, 'build')));

  // Rota para servir o aplicativo React
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});