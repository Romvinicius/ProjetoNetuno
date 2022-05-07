create database ProjetoNetuno;
use ProjetoNetuno;

create table usuario (
idUsuario int primary key auto_increment ,
nome varchar(45),
email varchar(45),
senha varchar(45),
cep char (8),
bairro varchar(45),
rua varchar(45),
numero int,
complemento varchar(45)
);

create table Venda (
idVenda int auto_increment,
total varchar(45),
dtVenda date,
fkUsuario int, foreign key (fkUsuario) references usuario (idUsuario),
primary key (idVenda, fkUsuario)
);

create table Produto (
idProduto int primary key auto_increment,
nome varchar(45),
descricao varchar(45),
valorProduto varchar(45)
);

create table Estoque (
fkProduto int primary key auto_increment,
qtdEstoque int
);

create table Carrinho (
fkVenda int, foreign key (fkVenda) references Venda (idVenda),
fkUsuario int, foreign key (fkUsuario) references usuario (idUsuario),
fkProduto int, foreign key (fkProduto) references Produto (idProduto),
valorDesconto varchar(45),
qtdProduto varchar(45),
primary key (fkVenda, fkUsuario, fkProduto)
);

select * from usuario;


