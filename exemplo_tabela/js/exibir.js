let produto ={};

const nomeProduto = document.querySelector("#nome-produto");

window.addEventListener('load',function(){
    produto = carregarProduto();
    nomeProduto.textContent = produto.nome;
});

function carregarProduto(){
    return{
        id:sessionStorage.getItem("id"),
        nome:sessionStorage.getItem("nome"),
        preco:sessionStorage.getItem("preco"),
        categoria:sessionStorage.getItem("categoria")
    }
}