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

function atualizacao(EstoqueAgua, EstoqueCv8kg, EstoqueCv4kg, EstoqueCv2kg) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var ximbica = `
    UPDATE Estoque SET qtdEstoque = '${EstoqueAgua}' WHERE fkProduto = 1; 
    UPDATE Estoque SET qtdEstoque = '${EstoqueCv8kg}' WHERE fkProduto = 2;
    UPDATE Estoque SET qtdEstoque = '${EstoqueCv4kg}' WHERE fkProduto = 3;
    UPDATE Estoque SET qtdEstoque = '${EstoqueCv2kg}' WHERE fkProduto = 4;
    `;
    console.log("update acontecendo")
    console.log("Executando a instrução SQL: \n" + ximbica);
    return database.executar(ximbica);
}

function atualizarProduto(id_produto, quantidade) {
    var sql = `update Estoque set qtdEstoque = ${quantidade} where fkProduto = ${id_produto};`;
    return database.executar(sql);
}

function venda(qtd_total, pix, id_usuario) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var vendas = `
        INSERT INTO Venda (total, ValorTotalPix, fkUsuario) VALUES ('${qtd_total}', '${pix}' , ${id_usuario});
    `;
    console.log("usuario inserindo")
    console.log("Executando a instrução SQL: \n" + vendas);
    return database.executar(vendas);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    listar_Estoque,
    atualizacao,
    venda,

};