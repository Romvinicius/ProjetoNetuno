
function aqui(){
	const qtd_agua = sessionStorage.getItem("Quantidade_agua");
	const qtd_cv8kg = sessionStorage.getItem("Quantidade_cv8kg");
	const qtd_cv4kg = sessionStorage.getItem("Quantidade_cv4kg");
	const qtd_cv2kg = sessionStorage.getItem("Quantidade_cv2kg");
	const qtd_total = sessionStorage.getItem("Quantidade_total");
	span_qtd_agua.innerHTML =  qtd_agua;
	span_qtd_carvao8kg.innerHTML = qtd_cv8kg;
	span_qtd_carvao4kg.innerHTML = qtd_cv4kg;
	span_qtd_carvao2kg.innerHTML = qtd_cv2kg;
	qtd_total_produtos.innerHTML = qtd_total;

	var valorAgua = qtd_agua * 13;
	var valorCarvao8kg = qtd_cv8kg * 28.40;
	var valorCarvao4kg = qtd_cv4kg * 18.60;
	var valorCarvao2kg = qtd_cv2kg * 9.80;
	var valor_total = valorAgua + valorCarvao8kg + valorCarvao4kg + valorCarvao2kg;
	var pix = valor_total * 0.95

	valor_agua.innerHTML = `R$ ${valorAgua}`
	valor_carvao8kg.innerHTML = `R$ ${valorCarvao8kg}`
	valor_carvao4kg.innerHTML = `R$ ${valorCarvao4kg}`
	valor_carvao2kg.innerHTML = `R$ ${valorCarvao2kg}`
	span_valor_total.innerHTML = `R$ ${valor_total.toFixed(2)}`

	if (valor_total >= 100) {
		valor_pix.innerHTML = `R$ ${pix}`
	} else {
		valor_pix.innerHTML = `R$ ${valor_total.toFixed(2)}`
	}

}



window.onload = aqui;


