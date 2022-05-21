window.onload = iniciarPagina;

var acabou_agua;
var acabou_cv8kg;
var acabou_cv4kg;
var acabou_cv2kg;

function iniciarPagina() {
  fetch("/usuarios/listar_Estoque", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },

  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO listar_Estoque()!")

    if (resposta.ok) {
      console.log(resposta);

      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));

        var fkProdutos = [];
        var qtdEstoques = [];

        for (var i = 0; i < json.length; i++) {
          fkProdutos.push(json[i].fkProduto)
          qtdEstoques.push(json[i].qtdEstoque)
        }



        sessionStorage.FK_PRODUTOS = fkProdutos;
        sessionStorage.QTD_ESTOQUE = qtdEstoques;



        var qtdEstoqueAguaProduto = Number(sessionStorage.getItem("QTD_ESTOQUE").split(',')[0])
        var qtdEstoqueCv8kgProduto = Number(sessionStorage.getItem("QTD_ESTOQUE").split(',')[1])
        var qtdEstoqueCv4kgProduto = Number(sessionStorage.getItem("QTD_ESTOQUE").split(',')[2])
        var qtdEstoqueCv2kgProduto = Number(sessionStorage.getItem("QTD_ESTOQUE").split(',')[3])

        sessionStorage.setItem("Qtd_Estoque_AguaProduto", qtdEstoqueAguaProduto);
        sessionStorage.setItem("Qtd_Estoque_Cv8kgProduto", qtdEstoqueCv8kgProduto);
        sessionStorage.setItem("Qtd_Estoque_Cv4kgProduto", qtdEstoqueCv4kgProduto);
        sessionStorage.setItem("Qtd_Estoque_Cv2kgProduto", qtdEstoqueCv2kgProduto);

        acabou_agua = sessionStorage.getItem("Qtd_Estoque_AguaProduto")
        acabou_cv8kg = sessionStorage.getItem("Qtd_Estoque_Cv8kgProduto")
        acabou_cv4kg = sessionStorage.getItem("Qtd_Estoque_Cv4kgProduto")
        acabou_cv2kg = sessionStorage.getItem("Qtd_Estoque_Cv2kgProduto")

        console.log(acabou_agua)
        const labels = [
          'Galão 20L',
          'Carvão 8Kg',
          'Carvão 4Kg',
          'Carvão 3Kg'
        ];

        const data = {
          labels: labels,
          datasets: [{
            label: 'Produtos em estoque',
            backgroundColor: 'rgb(9, 31, 71)',
            borderColor: 'black',
            data: [acabou_agua, acabou_cv8kg, acabou_cv4kg, acabou_cv2kg],
            fill: true,
          }

          ]

        };

        const config = {
          type: 'bar',
          data: data,
          options: {

            scales: {

              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  color: 'black'
                },
                grid: {
                  color: 'black'
                },

              },
              x: {
                grid: {
                  color: 'black'
                },

              },

            },
            elements: {
              line: {
                borderWidth: 10,
              }
            }
          },

        };
        const myChart = new Chart(
          document.getElementById('myChart'),
          config
        );

      });

    } else {

      console.log("Houve um erro ao tentar realizar o login!");

      resposta.text().then(texto => {
        console.error(texto);

      });
    }

  }).catch(function (erro) {
    console.log(erro);
  })



}

function atualizarProduto(id_produto, quantidade) {
  fetch("/usuarios/atualizar/produto", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idProduto: id_produto,
      quantidade: quantidade
    })
  }).then(function (resposta) {

    console.log("resposta: ", resposta);
    alert("Atualização Realizada com sucesso!")

  })

  setTimeout(function () {
    // window.location = "./admin.html";
  }, 1000);
}

function buscarQuantidade(id_produto) {
  fetch("/usuarios/buscarQuantidade", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idProduto: id_produto
    })
  }).then(function (resposta) {
    resposta.json().then(json => {
      JSON.stringify(json);
      console.log("LOGANDO JSON " + json);
      json[0].quantidade;
    })
  })
}
