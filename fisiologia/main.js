"use strict"
const backup = {
    saveGridInputs() {
        const inputsCelulares = document.querySelectorAll("[data-total], .input-celular--focus");
        for (let i = 0; i < inputsCelulares.length; i++) {   
            inputsCelulares[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, inputsCelulares[i].value);
            });
            inputsCelulares[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
    },
    saveExtraInputs() {
        const inputsNaoCelulares = document.querySelectorAll(".input-nao-celular");
        const campoDeObs = document.querySelector(".obs__input");
        inputsNaoCelulares.forEach( inputTarget => {
            inputTarget.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${inputTarget.id}`, inputTarget.value));
            inputTarget.value = localStorage.getItem(`${keyPrefix}-${inputTarget.id}`);
        });
        campoDeObs.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-input-obs`, campoDeObs.textContent));
        campoDeObs.textContent = localStorage.getItem(`${keyPrefix}-input-obs`);
    }
}
const totalizador = {
    filtrarEtotalizarCelulas(inputTarget) {
        if(inputTarget.dataset.total) {
            let classNameDosOperandos = inputTarget.dataset.total;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            let operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            let celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaloutput}`);
            celulaDeSaida.value = this.somar(operandos);
        }
        if(inputTarget.dataset.stockdisponivel) {
            let classNameDosOperandos = inputTarget.dataset.stockdisponivel;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            let operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            let celulaDeSaida = document.querySelector(`.${inputTarget.dataset.stockdisponiveloutput}`);
            let classNameDeProdutoGasto = classNameDosOperandos.split("-menos-")[1];
            let produtoGasto = document.querySelector(`.${classNameDeProdutoGasto}`);
            let stockDisponivel = this.somar(operandos) - (produtoGasto.value * 2)
            celulaDeSaida.value = stockDisponivel;
        }
    },
    somar(operandos) {
        let soma = 0;
        for(const o of operandos) {
            soma += Number(o.value);
        }
        return soma;
    }
}
function escutarEventos() {
    const inputsCelulares = document.querySelectorAll("[data-total], .input-celular--focus");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("input", () => {
            totalizador.filtrarEtotalizarCelulas(inputCelular);
        });
        inputCelular.value !== "" && totalizador.filtrarEtotalizarCelulas(inputCelular);
    });
}
window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




