var database = require("../database/config")

function listar() {
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_Estoque() {
    var instrucao = `
        SELECT * FROM Estoque;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



function entrar(email, senha) {
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, cep, bairro, rua, numero) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, cep, bairro, rua, numero) VALUES ('${nome}', '${email}', '${senha}' , '${cep}' 
        , '${bairro}' , '${rua}' , '${numero}');
    `;
    console.log("usuario inserindo")
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizacao(EstoqueAgua,EstoqueCv8kg, EstoqueCv4kg, EstoqueCv2kg) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var atualizar = `
    UPDATE Estoque SET qtdEstoque = '${EstoqueAgua}' WHERE fkProduto = 1; 
    UPDATE Estoque SET qtdEstoque = '${EstoqueCv8kg}' WHERE fkProduto = 2;
    UPDATE Estoque SET qtdEstoque = '${EstoqueCv4kg}' WHERE fkProduto = 3;
    UPDATE Estoque SET qtdEstoque = '${EstoqueCv2kg}' WHERE fkProduto = 4;
    `;
    console.log("update acontecendo")
    console.log("Executando a instrução SQL: \n" + atualizar);
    return database.executar(atualizar);
}

function reajusteEstoque(novaQtdAgua, novaQtdCv8kg, novaQtdCv4kg, novaQtdCv2kg) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var reajuste = `
    UPDATE Estoque SET qtdEstoque = '${novaQtdAgua}' WHERE fkProduto = 1; 
    UPDATE Estoque SET qtdEstoque = '${novaQtdCv8kg}' WHERE fkProduto = 2;
    UPDATE Estoque SET qtdEstoque = '${novaQtdCv4kg}' WHERE fkProduto = 3;
    UPDATE Estoque SET qtdEstoque = '${novaQtdCv2kg}' WHERE fkProduto = 4;
    `;
    return database.executar(reajuste);
}

function venda(valorAgua,valorCarvao8kg,valorCarvao4kg,valorCarvao2kg,qtd_ag,qtd_cv8kg,qtd_cv4kg,qtd_cv2kg,qtd_total, valor_total, id_usuario) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var vendas = `
        INSERT INTO Venda (totalProdutos, ValorTotal, fkUsuario) VALUES ('${qtd_total}', '${valor_total}' , ${id_usuario});
        SELECT * FROM venda ORDER BY idVenda DESC LIMIT 1;
    `;
    console.log("usuario inserindo")
    console.log("Executando a instrução SQL: \n" + vendas);
    return database.executar(vendas);
}

function carrinho(idVenda, valorAgua,valorCarvao8kg,valorCarvao4kg,valorCarvao2kg,qtd_ag,qtd_cv8kg,qtd_cv4kg,qtd_cv2kg,id_usuario) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var vendas = `
        INSERT INTO Carrinho (fkVenda, fkUsuario, fkProduto, qtdProduto, valorTotalProduto) VALUES ('${idVenda}' , '${id_usuario}' , 1 , '${qtd_ag}' , '${valorAgua}');
        INSERT INTO Carrinho (fkVenda, fkUsuario, fkProduto, qtdProduto, valorTotalProduto) VALUES (${idVenda}' , '${id_usuario}' , 2 , '${qtd_cv8kg}' , '${valorCarvao8kg}');
        INSERT INTO Carrinho (fkVenda, fkUsuario, fkProduto, qtdProduto, valorTotalProduto) VALUES (${idVenda}' , '${id_usuario}' , 3 , '${qtd_cv4kg}' , '${valorCarvao4kg}');
        INSERT INTO Carrinho (fkVenda, fkUsuario, fkProduto, qtdProduto, valorTotalProduto) VALUES (${idVenda}' , '${id_usuario}' , 4 , '${qtd_cv2kg}' , '${valorCarvao2kg}');
    `;
    console.log("usuario inserindo")
    console.log("Executando a instrução SQL: \n" + vendas);
    return database.executar(vendas);
}

function receberProdutos() {
    var instrucao = `
        SELECT * FROM Produto;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    entrar,
    cadastrar,
    listar,
    listar_Estoque,
    atualizacao,
    venda,
    reajusteEstoque,
    receberProdutos,
    
};