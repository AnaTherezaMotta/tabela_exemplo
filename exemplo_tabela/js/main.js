// var variavel global
// let variavel local
// const variavel 

const tableConteiner =  document.querySelector('#tabela-produtos')

const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');

const CABECALHO_TABELA = ["ID","Nome","Preco","Categoria"];

const totalRegistro = document.querySelector('#total-produtos');
const selectCategoria = document.querySelector('#categoria-produtos');

let produtos=[];
let categoriaDosProdutos = [];


window.addEventListener('load',function(){

    criarTabela();
    fomatarCabecalho();
    carregarDados()


});

selectCategoria.addEventListener('change', function(){

    if (this.selectedIndex == 0) {
        totalRegistro.textContent = produtos.length;
        tbody.childNodes.forEach(function(d) { return d.style.display = ''; })
    } else {
        filtrarLinhas(this.value)    
    }
    
});

function criarTabela(){
    thead.setAttribute('id','cabecalho-tabela');
    tbody.setAttribute('id','corpo-tabela');

    table.appendChild(thead);
    table.appendChild(tbody);

    tableConteiner.appendChild(table);

};

function fomatarCabecalho(){

    let linha = thead.insertRow(0);

    for(let celula = 0; celula < CABECALHO_TABELA.length; celula++){
        let th = document.createElement('th');
        th.textContent = CABECALHO_TABELA[celula];
        linha.appendChild(th);
    };

};

function carregarDados(){
    fetch('data/produtos.json')
        .then(function(resposta){return resposta.json();})
        .then(function(dados){
            console.log(dados);
            adicionarLinhas(dados);
            atualizarBarraDeFerramentas(dados);
        }).catch(function(error){ 
            console.error("Não foi possivel carregar os dados!");
        });

};

function adicionarLinhas(dados){
    for(let i = 0; i<dados.length; i++){
        let linha = tbody.insertRow();
        linha.setAttribute('id','produto-' +dados[i].id);
        produtos.push(dados[i]);

        if(!categoriaDosProdutos.includes(dados[i].category)){
            categoriaDosProdutos.push(dados[i].category);
        };

        let registro = [
            dados[i].id.toString().padStart(2,0),
            dados[i].title,
            dados[i].price.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}),
            dados[i].category
        ]

        for(let j = 0;j < registro.length; j++){
            let celula = linha.insertCell();
            celula.innerText = registro[j];
            celula.setAttribute('title',registro[j]);

            if(j==1){
                celula.addEventListener('click',function(){
                    let id = +this.parentElement.id.split('-')[1];
                    let produto = produtos.find(function(d){return d.id == id});

                    sessionStorage.clear();
                    sessionStorage.setItem("id",produto.id);
                    sessionStorage.setItem("nome",produto.title);
                    sessionStorage.setItem("preco",produto.price);
                    sessionStorage.setItem("categoria",produto.category);

                    window.open("exibir.html","_self");
                });
            };
        };
    };

};

function atualizarBarraDeFerramentas(dados){
    totalRegistro.textContent = dados.length;

    for (let i = 0; i < categoriaDosProdutos.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', categoriaDosProdutos[i]);
        option.textContent = categoriaDosProdutos[i];
        selectCategoria.appendChild(option);
    };
};

function filtrarLinhas(categoria){
    let totalItensFiltrados = 0;

    tbody.childNodes.forEach(function(linha){
        let id = linha.childNodes[3];

        if(id.textContent == categoria){
            linha.style.display = '';
            totalItensFiltrados++;

        }else{
            linha.style.display = 'none';
        }
    })

    totalRegistro.textContent = totalItensFiltrados;
}
