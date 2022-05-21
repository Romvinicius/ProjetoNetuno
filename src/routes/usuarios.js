var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/listar_Estoque", function (req, res) {
    usuarioController.listar_Estoque(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.put("/atualizacao", function (req, res) {
    usuarioController.atualizacao(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/venda", function (req, res) {
    usuarioController.venda(req, res);
})

router.put("/atualizar/produto", function (req, res) {
    usuarioController.atualizarProduto(req, res);
})

router.get("/buscarQuantidade", function (req, res) {
    console.log("buscarQuantidade ROTA");
    usuarioController.buscarQuantidade(req, res);
})



module.exports = router;