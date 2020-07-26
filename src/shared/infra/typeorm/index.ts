import { createConnections } from 'typeorm';

// Automaticamente procura o arquivo ormconfig.json e tenta conectar utilizando as credenciais e configurações salvas lá
// Fazemos isso para que a CLI do typeorm consiga acessar o banco de dados (ele utiliza o ormconfig.json)
createConnections();
