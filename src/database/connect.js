const mongoose = require("mongoose");

const connectToDatabase = async () => {
  const conexao = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ejntg.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0`
  await mongoose.connect(conexao
    ,
    (error) => {
      if (error) {
        return console.log(
          "Ocorreu um erro ao se conectar com o banco de dados: ",
          error
        );
      }

      return console.log("Conexão ao banco de dados realizada com sucesso!");
    }
  );
};

module.exports = connectToDatabase;
