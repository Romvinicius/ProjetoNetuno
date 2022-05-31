var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listar_Estoque(req, res) {
    usuarioModel.listar_Estoque()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function usuario(req, res) {
    usuarioModel.usuario()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    console.log(req.body.idUsuario)
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var cep = req.body.cep;
    var bairro = req.body.bairro;
    var rua = req.body.rua;
    var numero = req.body.numero;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (rua == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu número está undefined!");
    } else {
        
        usuarioModel.cadastrar(nome, email, senha, cep, bairro, rua, numero)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizacao(req, res) {
    var EstoqueAgua = req.body.qtdEstoqueAguaServer;
    var EstoqueCv8kg = req.body.qtdEstoqueCv8kgServer;
    var EstoqueCv4kg = req.body.qtdEstoqueCv4kgServer;
    var EstoqueCv2kg = req.body.qtdEstoqueCv2kgServer;
    console.log(EstoqueAgua,EstoqueCv8kg,EstoqueCv4kg,EstoqueCv2kg)

    if (EstoqueAgua == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (EstoqueCv8kg == undefined) {
        res.status(400).send("Seu email está undefined!");
    }else if (EstoqueCv4kg == undefined) {
        res.status(400).send("Seu email está undefined!");
    }else if (EstoqueCv2kg == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        
        usuarioModel.atualizacao(EstoqueAgua,EstoqueCv8kg, EstoqueCv4kg, EstoqueCv2kg)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualização! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function reajusteEstoque(req, res) {
    var novaQtdAgua = req.body.novaQtdAguaServer;
    var novaQtdCv8kg = req.body.novaQtdCv8kgServer;
    var novaQtdCv4kg = req.body.novaQtdCv4kgServer;
    var novaQtdCv2kg = req.body.novaQtdCv2kgServer;
   
    console.log(novaQtdAgua, novaQtdCv8kg, novaQtdCv4kg, novaQtdCv2kg)

    if (novaQtdAgua == undefined) {
        res.status(400).send("Sua qtdAgua está undefined!");
    } else if (novaQtdCv8kg == undefined) {
        res.status(400).send("Sua qtd cv8kg está undefined!");
    }else if (novaQtdCv4kg == undefined) {
        res.status(400).send("Sua qtd cv4kg está undefined!");
    }else if (novaQtdCv2kg == undefined) {
        res.status(400).send("Sua qtd cv2kg está undefined!");
    }else {
        
        usuarioModel.reajusteEstoque(novaQtdAgua, novaQtdCv8kg, novaQtdCv4kg, novaQtdCv2kg)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a reajusteEstoque! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function venda(req, res) {
    var qtd_total = req.body.qtd_total;
    var pix = req.body.pix;
    var id_usuario = req.body.id_usuario;

    if (qtd_total == undefined) {
        res.status(400).send("Sua Quantidade total está undefined!");
    } else if (pix == undefined) {
        res.status(400).send("Seu valor em Pix está undefined!")
    } else if (id_usuario == undefined) {
        res.status(400).send("Seu id_usuario está undefined!")
    } else {
        
        usuarioModel.venda(qtd_total, pix, id_usuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                    console.log("chegou aqui")
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function receberProdutos(req, res) {
    usuarioModel.receberProdutos()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


module.exports = {
    entrar,
    cadastrar,
    listar,
    testar,
    listar_Estoque,
    atualizacao,
    venda,
    reajusteEstoque,
    receberProdutos,
    
  
}