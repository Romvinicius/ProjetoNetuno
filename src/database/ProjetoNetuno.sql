create database ProjetoNetuno;
use ProjetoNetuno;

create table usuario (
idUsuario int primary key auto_increment ,
nome varchar(45),
email varchar(45) unique,
senha varchar(45),
cep char (8),
bairro varchar(45),
rua varchar(45),
numero int,
complemento varchar(45)
);

select * from usuario;

create table Venda (
idVenda int auto_increment,
totalProdutos varchar(45),
ValorTotal decimal(10,2),
dtVenda datetime default(current_timestamp),
fkUsuario int, foreign key (fkUsuario) references usuario (idUsuario),
primary key (idVenda, fkUsuario)
);

INSERT INTO Venda (totalProdutos, ValorTotal, fkUsuario) VALUES ('2', '100.22' , 1);

select * from Venda;

create table Produto (
idProduto int primary key auto_increment,
nome varchar(45),
descricao varchar(45),
valorProduto varchar(45)
);



insert into Produto values 
(null , 'Galão 20L' , 'Bioleve' , '13,00'),
(null , 'Carvão 8Kg' , 'Brazica' , '28,40'),
(null , 'Carvão 4Kg' , 'Brazica' , '18,60'),
(null , 'Carvão 2Kg' , 'Brazica' , '9,80');

select * from Produto;

create table Estoque (
fkProduto int primary key auto_increment,
qtdEstoque int
);

insert into Estoque values 
(1 , '10'),
(2 , '10'),
(3 , '10'),
(4 , '10');

select * from Estoque;

drop table Estoque;

create table Carrinho (
fkVenda int, foreign key (fkVenda) references Venda (idVenda),
fkUsuario int, foreign key (fkUsuario) references usuario (idUsuario),
fkProduto int, foreign key (fkProduto) references Produto (idProduto),
valorDesconto varchar(45),
qtdProduto varchar(45),
primary key (fkVenda, fkUsuario, fkProduto)
);






