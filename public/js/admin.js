window.onload = iniciarPagina(),receberProdutos(),maisVendidos()

const labels = []

var acabou_agua;
var acabou_cv8kg;
var acabou_cv4kg;
var acabou_cv2kg;
var maiorEstoque;

function iniciarPagina() {
  totalVenda()
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
      
          if(qtdEstoques[i] > maiorEstoque){
            maiorEstoque = qtdEstoques[i]
            
          }
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

function enviar() {
  var quantidade = Number(input_valor.value)

  if (select_produto.value == 1) {
    var agua_para_estoque = Number(acabou_agua) + quantidade

  } else {
    var agua_para_estoque = Number(acabou_agua)
  }

  if (select_produto.value == 2) {
    var cv8kg_para_estoque = Number(acabou_cv8kg) + quantidade

  } else {
    var cv8kg_para_estoque = Number(acabou_cv8kg)
  }

  if (select_produto.value == 3) {
    var cv4kg_para_estoque = Number(acabou_cv4kg) + quantidade
  } else {
    var cv4kg_para_estoque = Number(acabou_cv4kg)
  }

  if (select_produto.value == 4) {
    var cv2kg_para_estoque = Number(acabou_cv2kg) + quantidade
  } else {
    var cv2kg_para_estoque = Number(acabou_cv2kg)
  }
  console.log(cv8kg_para_estoque)

  fetch("/usuarios/reajusteEstoque", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({

      novaQtdAguaServer: agua_para_estoque,
      novaQtdCv8kgServer: cv8kg_para_estoque,
      novaQtdCv4kgServer: cv4kg_para_estoque,
      novaQtdCv2kgServer: cv2kg_para_estoque,
    })
  }).then(function (resposta) {

    console.log("resposta: ", resposta);
    alert("Reajuste no Estoque Realizada com sucesso!")
    
  })

  setTimeout(function () {
    window.location = "./admin.html";
  }, 1000);
  
}

function receberProdutos() {

  fetch("/usuarios/receberProdutos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },

  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO receberProdutos()!")

    if (resposta.ok) {
      console.log(resposta);

      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));

        for (var i = 0; i < json.length; i++) {

          var recebimento = json[i]
          select_produto.innerHTML += `<option value="${recebimento.idProduto}">${recebimento.nome}</option>`
          labels.push(recebimento.nome)
        }

        const data = {
          labels: labels,
          datasets: [{
            label: 'Produtos em estoque',
            backgroundColor: 'rgb(9, 31, 71)',
            borderColor: 'black',
            data: [acabou_agua, acabou_cv8kg, acabou_cv4kg, acabou_cv2kg],
            fill: true,
          }]
        };

        const config = {
          type: 'bar',
          data: data,
          options: {

            plugins: {
              legend:{
                labels:{
                color:'black'
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: maiorEstoque,
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

      console.log("Houve um erro ao tentar realizar o receberProdutos!");

      resposta.text().then(texto => {
        console.error(texto);

      });
    }
  }).catch(function (erro) {
    console.log(erro);
  })

}


var valorCarrinho = [];

function totalVenda(){

  fetch("/usuarios/receberCarrinho", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },

  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO recebercarrinho()!")

    if (resposta.ok) {
      console.log(resposta);

      resposta.json().then(resposta => {
        console.log(resposta);
        console.log(JSON.stringify(resposta));

        for (var i = 0; i < resposta.length; i++) {
          var recebimento = resposta[i].valor
          valorCarrinho.push(recebimento)
          
        }
       renderizarGrafico()
      });

    } else {

      console.log("Houve um erro ao tentar realizar o receberProdutos!");

      resposta.text().then(texto => {
        console.error(texto);

      });
    }
  }).catch(function (erro) {
    console.log(erro);
  })
  
}

function renderizarGrafico(){

  const data2 = {
    labels: [
      'Galão 20L',
      'Carvão 8KG',
      'Carvão 4KG',
      'Carvão 2KG'
    ],
    datasets: [{
      label: 'Grafico de Valores',
      data: 
       valorCarrinho
      ,
      backgroundColor: [
        'Blue',
        'Red',
        'Orange',
        'Gray'
      ],
      hoverOffset: 4
    }]
  };

  const config2 = {
    type: 'pie',
    data: data2,
  };

  const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config2
  );

}

var qtdProdutos = []
var nomeProdutos = []

var resposta1 = []

function maisVendidos(){

  fetch("/usuarios/somaQtd", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },

  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO somaQtd()!")

    if (resposta.ok) {
      console.log(resposta);

      resposta.json().then(resposta => {
        console.log(resposta);
        console.log(JSON.stringify(resposta));
        resposta1 = resposta
       
        ranking()
        
      });

    } else {

      console.log("Houve um erro ao tentar realizar o somaQtd!");

      resposta.text().then(texto => {
        console.error(texto);

      });
    }
  }).catch(function (erro) {
    console.log(erro);
  })
}

function ranking(){
  resposta1.sort(function (x, y){
    return x.resultado - y.resultado
  })

  span_qtd_primeiro.innerHTML = resposta1[3].resultado
  span_primeiro.innerHTML = resposta1[3].nome

  span_qtd_segundo.innerHTML = resposta1[2].resultado
  span_segundo.innerHTML = resposta1[2].nome

  span_qtd_terceiro.innerHTML = resposta1[1].resultado
  span_terceiro.innerHTML = resposta1[1].nome

  span_qtd_quarto.innerHTML = resposta1[0].resultado
  span_quarto.innerHTML = resposta1[0].nome

}





