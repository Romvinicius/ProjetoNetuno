  
var  qtd_agua = 0
var  qtd_carvao8kg = 0
var  qtd_carvao4kg = 0
var  qtd_carvao2kg = 0
var  total_produtos = qtd_agua + qtd_carvao8kg + qtd_carvao4kg + qtd_carvao2kg


      
    function menos_qtd_agua() {
    
        if (qtd_agua > 0) {
            qtd_agua --
            span_qtd_agua.innerHTML = qtd_agua
        }
    }

    function mais_qtd_agua() {

        qtd_agua ++
        span_qtd_agua.innerHTML = qtd_agua
        
    }

    function menos_qtd_carvao8kg() {
        
        if (qtd_carvao8kg > 0) {

            qtd_carvao8kg --
            span_qtd_carvao8kg.innerHTML = qtd_carvao8kg
        }

    }

    function mais_qtd_carvao8kg() {
        qtd_carvao8kg ++

        span_qtd_carvao8kg.innerHTML = qtd_carvao8kg
        
    }

    function menos_qtd_carvao4kg() {

        if (qtd_carvao4kg > 0) {

            qtd_carvao4kg --
            span_qtd_carvao4kg.innerHTML = qtd_carvao4kg
        }

    }

    function mais_qtd_carvao4kg() {

        qtd_carvao4kg ++
        span_qtd_carvao4kg.innerHTML = qtd_carvao4kg
    }

    function menos_qtd_carvao2kg() {

    if (qtd_carvao2kg > 0) {

        qtd_carvao2kg --
        span_qtd_carvao2kg.innerHTML = qtd_carvao2kg
    }

    }

    function mais_qtd_carvao2kg() {

    qtd_carvao2kg ++
    span_qtd_carvao2kg.innerHTML = qtd_carvao2kg
    }

    sessionStorage.setItem("Quantidade_agua", qtd_agua);

    const esse = sessionStorage.getItem("Quantidade_agua");

   export default oi = console.log("foi pau no cu")
   

