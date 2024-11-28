CREATE TABLE cadastros (
    cpf VARCHAR(11),
    rg VARCHAR(9),
    nome varchar(255),
    endereco varchar(255),
    data_nascimento DATE,
    placa_carro varchar(7),
    PRIMARY KEY (cpf, rg, placa_carro)
)