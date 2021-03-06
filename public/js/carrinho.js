	const qtd_ag = Number(sessionStorage.getItem("Quantidade_agua"));
	const qtd_cv8kg = Number(sessionStorage.getItem("Quantidade_cv8kg"));
	const qtd_cv4kg = Number(sessionStorage.getItem("Quantidade_cv4kg"));
	const qtd_cv2kg = Number(sessionStorage.getItem("Quantidade_cv2kg"));
	const qtd_total = Number(sessionStorage.getItem("Quantidade_total"));
	
var valorAgua;
var valorCarvao8kg;
var valorCarvao4kg;
var valorCarvao2kg;
var valor_total;


function aqui(){
	
	span_qtd_agua.innerHTML =  qtd_ag;
	span_qtd_carvao8kg.innerHTML = qtd_cv8kg;
	span_qtd_carvao4kg.innerHTML = qtd_cv4kg;
	span_qtd_carvao2kg.innerHTML = qtd_cv2kg;
	qtd_total_produtos.innerHTML = qtd_total;

	valorAgua = qtd_ag * 13;
	valorCarvao8kg = qtd_cv8kg * 28.40;
	valorCarvao4kg = qtd_cv4kg * 18.60;
	valorCarvao2kg = qtd_cv2kg * 9.80;
	valor_total = valorAgua + valorCarvao8kg + valorCarvao4kg + valorCarvao2kg;

	valor_agua.innerHTML = `R$ ${valorAgua.toFixed(2)}`
	valor_carvao8kg.innerHTML = `R$ ${valorCarvao8kg.toFixed(2)}`
	valor_carvao4kg.innerHTML = `R$ ${valorCarvao4kg.toFixed(2)}`
	valor_carvao2kg.innerHTML = `R$ ${valorCarvao2kg.toFixed(2)}`
	span_valor_total.innerHTML = `R$ ${valor_total.toFixed(2)}`
	valor_pix.innerHTML = `R$ ${valor_total.toFixed(2)}`


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

window.onload = aqui;
const id_usuario = Number(sessionStorage.getItem("ID_USUARIO"));
function finalizar(){

	var qtd_totalVar = qtd_total
	var id_usuarioVar = id_usuario
	if (qtd_total == 0) {
	alert("Voc?? deve escolher seus produtor para finalizar a compra")
	} else {
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

		var qtdEstoqueAgua = Number(sessionStorage.getItem("QTD_ESTOQUE").split(',')[0]) - qtd_ag
		var qtdEstoqueCv8kg = Number(sessionStorage.getItem("QTD_ESTOQUE").split(',')[1]) - qtd_cv8kg
		var qtdEstoqueCv4kg = Number(sessionStorage.getItem("QTD_ESTOQUE").split(',')[2]) - qtd_cv4kg
		var qtdEstoqueCv2kg = Number(sessionStorage.getItem("QTD_ESTOQUE").split(',')[3]) - qtd_cv2kg

		fetch("/usuarios/venda", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({

				valorAgua: valorAgua,
				valorCarvao8kg: valorCarvao8kg,
				valorCarvao4kg: valorCarvao4kg,
				valorCarvao2kg: valorCarvao2kg,
				qtd_ag: qtd_ag,
				qtd_cv8kg: qtd_cv8kg,
				qtd_cv4kg: qtd_cv4kg,
				qtd_cv2kg: qtd_cv2kg,
				qtd_total: qtd_total,
				valor_total: valor_total,
				id_usuario: id_usuario
	
			})
		}).then(function (resposta) {
		
			console.log("resposta: ", resposta);
	
			if (resposta.ok) {
				console.log("chegou aqui")

				resposta.json().then(json => {
					console.log(json);
					console.log(JSON.stringify(json));

					let idVenda = json[1][0].idVenda;

					carrinho(idVenda)
			});
				setTimeout(() => {
					window.location = "./produto.html";
				}, "5000")
			} else {
				cardErro.style.display = "block"
				setInterval(sumirMensagem, 5000);
				finalizarAguardar();
				throw ("Houve um erro ao tentar realizar o cadastro!");
				return false;
			}
		})

		fetch("/usuarios/atualizacao", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				
				qtdEstoqueAguaServer: qtdEstoqueAgua,
				qtdEstoqueCv8kgServer: qtdEstoqueCv8kg,
				qtdEstoqueCv4kgServer: qtdEstoqueCv4kg,
				qtdEstoqueCv2kgServer: qtdEstoqueCv2kg
			})
			}).then(function (resposta) {
			
				console.log("resposta: ", resposta);
				alert("Compra Realizada com sucesso!")
		})
	
		setTimeout(function () {
			window.location = "./produto.html";
		}, 1000);
	
	}

}

function carrinho(idVenda){
	fetch("/usuarios/carrinho", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({

			idVenda: idVenda,
			valorAgua: valorAgua,
			valorCarvao8kg: valorCarvao8kg,
			valorCarvao4kg: valorCarvao4kg,
			valorCarvao2kg: valorCarvao2kg,
			qtd_ag: qtd_ag,
			qtd_cv8kg: qtd_cv8kg,
			qtd_cv4kg: qtd_cv4kg,
			qtd_cv2kg: qtd_cv2kg,
			id_usuario: id_usuario

		})
	}).then(function (resposta) {
	
		console.log("resposta: ", resposta);

		if (resposta.ok) {
			console.log("deu certo o carrinho")

			resultado.json().then(json => {
				console.log(json);
				console.log(JSON.stringify(json));
		});
			setTimeout(() => {
				window.location = "./produto.html";
			}, "5000")
		} else {
			cardErro.style.display = "block"
			setInterval(sumirMensagem, 5000);
			finalizarAguardar();
			throw ("Houve um erro ao tentar realizar o cadastro!");
			return false;
		}
	})
}




