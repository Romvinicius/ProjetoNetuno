var acabou_agua;
var acabou_cv8kg;
var acabou_cv4kg;
var acabou_cv2kg;

function Estoque(){

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

				for(var i = 0; i < json.length; i++) {
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

                console.log(qtdEstoqueAguaProduto,qtdEstoqueCv8kgProduto)

                if (qtdEstoqueAguaProduto <= 0) {
                    span_acabou_agua.style.display = "block";
                    maisQtdAgua.onclick = ""
                  } 
                
                if (qtdEstoqueCv8kgProduto <= 0) {
                    span_acabou_cv8kg.style.display = "block";
                    maisQtdCv8kg.onclick = ""
                  } 
                
                if (qtdEstoqueCv4kgProduto <= 0) {
                    span_acabou_cv4kg.style.display = "block";
                    maisQtdCv4kg.onclick = ""
                  } 
                
                if (qtdEstoqueCv2kgProduto <= 0) {
                    span_acabou_cv2kg.style.display = "block"
                    maisQtdCv2kg.onclick = ""
                  } 
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

window.onload = Estoque;

var qtd_agua = 0
var qtd_carvao8kg = 0
var qtd_carvao4kg = 0
var qtd_carvao2kg = 0

function menos_qtd_agua() {
    esse = Number(span_qtd_agua.innerHTML)
   
    if (qtd_agua > 0) {
        qtd_agua--
        span_qtd_agua.innerHTML = qtd_agua
    } 

    if  (esse <= acabou_agua) {
        span_acabou_agua.style.display = "none";
        
    }
}

function mais_qtd_agua() {
    esse = Number(span_qtd_agua.innerHTML)
    
    if (esse >=  acabou_agua) {
        span_acabou_agua.style.display = "block";
        span_acabou_agua.innerHTML = `Temos apenas ${ acabou_agua} produtos`
        
    }  else {
        span_acabou_agua.style.display = "none";
        qtd_agua++
        span_qtd_agua.innerHTML = qtd_agua
    }
}


function menos_qtd_carvao8kg() {
    esse = Number(span_qtd_carvao8kg.innerHTML)

    if (qtd_carvao8kg > 0) {
        qtd_carvao8kg--
        span_qtd_carvao8kg.innerHTML = qtd_carvao8kg
    }

    if (esse <= acabou_cv8kg) {
        span_acabou_cv8kg.style.display = "none";
    }
}

function mais_qtd_carvao8kg() {
    esse = Number(span_qtd_carvao8kg.innerHTML)
    
    if (esse >= acabou_cv8kg) {
        span_acabou_cv8kg.style.display = "block";
        span_acabou_cv8kg.innerHTML = `Temos apenas ${acabou_cv8kg} produtos`
        console.log(acabou_cv8kg)
    }  else {
        span_acabou_cv8kg.style.display = "none";
        qtd_carvao8kg++
        span_qtd_carvao8kg.innerHTML = qtd_carvao8kg
    }
}

function menos_qtd_carvao4kg() {
    esse = Number(span_qtd_carvao4kg.innerHTML)

    if (qtd_carvao4kg > 0) {
        qtd_carvao4kg--
        span_qtd_carvao4kg.innerHTML = qtd_carvao4kg
    }

    if (esse <= acabou_cv4kg) {
        span_acabou_cv4kg.style.display = "none";
    }
}

function mais_qtd_carvao4kg() {
    esse = Number(span_qtd_carvao4kg.innerHTML)
    
    if (esse >= acabou_cv4kg) {
        span_acabou_cv4kg.style.display = "block";
        span_acabou_cv4kg.innerHTML = `Temos apenas ${acabou_cv4kg} produtos`
        
    }  else {
        span_acabou_cv4kg.style.display = "none";
        qtd_carvao4kg++
        span_qtd_carvao4kg.innerHTML = qtd_carvao4kg
    }
}

function menos_qtd_carvao2kg() {
    esse = Number(span_qtd_carvao2kg.innerHTML)

    if (qtd_carvao2kg > 0) {
        qtd_carvao2kg--
        span_qtd_carvao2kg.innerHTML = qtd_carvao2kg
    }

    if (esse <= acabou_cv2kg) {
        span_acabou_cv2kg.style.display = "none";
    }

}

function mais_qtd_carvao2kg() {
    esse = Number(span_qtd_carvao2kg.innerHTML)
    
    if (esse >= acabou_cv2kg) {
        span_acabou_cv2kg.style.display = "block";
        span_acabou_cv2kg.innerHTML = `Temos apenas ${acabou_cv2kg} produtos`
        
    }  else {
        span_acabou_cv2kg.style.display = "none";
        qtd_carvao2kg++
        span_qtd_carvao2kg.innerHTML = qtd_carvao2kg
    }
}

function adicionar() {
    sessionStorage.setItem("Quantidade_agua", qtd_agua); 
    sessionStorage.setItem("Quantidade_cv8kg", qtd_carvao8kg); 
    sessionStorage.setItem("Quantidade_cv4kg", qtd_carvao4kg); 
    sessionStorage.setItem("Quantidade_cv2kg", qtd_carvao2kg); 
    sessionStorage.setItem("Quantidade_total", qtd_agua + qtd_carvao8kg + qtd_carvao4kg + qtd_carvao2kg); 
    location.assign('carrinho.html')

    
}