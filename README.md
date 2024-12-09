# App

Gympass style app.

## RFs (Requisitos funcionais)

    [x] Deve ser possível se cadastrar;
    [x] Deve ser possível se autenticar;
    [ ] Deve ser possível obter o perfil de um usuário logado;
    [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
    [ ] Deve ser possível o usuário obtetr seu histórico de check-ins;
    [ ] Deve ser possível o usuário buscar academias próximas;
    [ ] Deve ser possível o usuário buscar academias pelo nome
    [ ] Deve ser possível o suário realizar check-in em uma academia;
    [ ] Deve ser possível validar o check-in de um usuário;
    [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

    [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
    [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
    [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia
    [ ] O check-in só pode ser validado até 20 minutos após criado;
    [ ] O check-in só pode ser validado por administradores;
    [ ] A academia só pode ser cadastrada por administradores;


## RNFs (Requisitos não-funcionais) - Parte mais técnica da aplicação

    [x] A senha do usuário preisa estar criptografada;
    [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
    [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
    [ ] A aplicação deve ter autenticação com JWT (Json Web Token)