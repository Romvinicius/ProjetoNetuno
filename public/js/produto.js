function Estoque(){
  const acabou_agua = sessionStorage.getItem("Qtd_Estoque_Agua")
  const acabou_cv8kg = sessionStorage.getItem("Qtd_Estoque_Cv8kg")
  const acabou_cv4kg = sessionStorage.getItem("Qtd_Estoque_Cv4kg")
  const acabou_cv2kg = sessionStorage.getItem("Qtd_Estoque_Cv2kg")

  console.log(acabou_agua)

  if (acabou_agua <= 0) {
    span_acabou_agua.style.display = "block"
  } 

  if (acabou_cv8kg <= 0) {
    span_acabou_cv8kg.style.display = "block"
  } 

  if (acabou_cv4kg <= 0) {
    span_acabou_cv4kg.style.display = "block"
  } 

  if (acabou_cv2kg <= 0) {
    span_acabou_cv2kg.style.display = "block"
  } 

}

window.onload = Estoque;


var qtd_agua = 0
var qtd_carvao8kg = 0
var qtd_carvao4kg = 0
var qtd_carvao2kg = 0




function menos_qtd_agua() {


    if (qtd_agua > 0) {
        qtd_agua--
        span_qtd_agua.innerHTML = qtd_agua
    }
}

function mais_qtd_agua() {
    qtd_agua++
    span_qtd_agua.innerHTML = qtd_agua
}

function menos_qtd_carvao8kg() {

    if (qtd_carvao8kg > 0) {

        qtd_carvao8kg--
        span_qtd_carvao8kg.innerHTML = qtd_carvao8kg
    }

}

function mais_qtd_carvao8kg() {
    qtd_carvao8kg++

    span_qtd_carvao8kg.innerHTML = qtd_carvao8kg

}

function menos_qtd_carvao4kg() {

    if (qtd_carvao4kg > 0) {

        qtd_carvao4kg--
        span_qtd_carvao4kg.innerHTML = qtd_carvao4kg
    }

}

function mais_qtd_carvao4kg() {

    qtd_carvao4kg++
    span_qtd_carvao4kg.innerHTML = qtd_carvao4kg
}

function menos_qtd_carvao2kg() {

    if (qtd_carvao2kg > 0) {

        qtd_carvao2kg--
        span_qtd_carvao2kg.innerHTML = qtd_carvao2kg
    }

}

function mais_qtd_carvao2kg() {

    qtd_carvao2kg++
    span_qtd_carvao2kg.innerHTML = qtd_carvao2kg
}

function adicionar() {
    sessionStorage.setItem("Quantidade_agua", qtd_agua); 
    sessionStorage.setItem("Quantidade_cv8kg", qtd_carvao8kg); 
    sessionStorage.setItem("Quantidade_cv4kg", qtd_carvao4kg); 
    sessionStorage.setItem("Quantidade_cv2kg", qtd_carvao2kg); 
    sessionStorage.setItem("Quantidade_total", qtd_agua + qtd_carvao8kg + qtd_carvao4kg + qtd_carvao2kg); 
    location.assign('carrinho.html')

    
}