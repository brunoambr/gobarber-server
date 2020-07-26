# Recuperação de senha

**RF (Requisitos funcionais)**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF (Requisitos não funcionais)**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN (Regras de negócio)**

- O link enviado por e-mail para resetar a senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, e-mail e senha;

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado por outro usuário;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 08:00h às 18:00h (Primeiro às 8h, Último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços com ele mesmo;


# Testes automatizados

Queremos que a nossa aplicação continue sempre funcional

1. Testes unitários (TDD)

Testam funcionalidades específicas da nossa aplicação (precisam ser funções puras)

JAMAIS: Chamada à uma API e efeito colateral.

2. Testes de integração

Testam uma funcionalidade completa, passando por várias camadas da aplicação.

Route -> Controller -> Serviço -> Repositório -> ...

3. Testes E2E

Testes que simulam a ação do usuário dentro da nossa aplicação (aplicados para interfaces, front-end).

Exemplo:
1. Clique no input de e-mail
2. Preencha diego@rocketseat.com.br
3. Clique no input de senha
4. Preencha 123456
5. Clique no botão "Logar"
6. Espero que a página tenha enviado o usuário para o dashboard

# TDD - Test Driven Development

Criar os testes antes de criar efetivamente as funcionalidades na aplicação

- Quando o usuário se cadastrar na aplicação, ele deve receber um e-mail de boas-vindas
