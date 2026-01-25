
const area_grid = document.querySelectorAll(".grid-square");
let alturas = new Array(area_grid.length).fill(0);
alturas[29] = 1;
alturas[38] = 1;
alturas[39] = 1;
alturas[47] = 1;
alturas[48] = 1;
alturas[49] = 1;
alturas[56] = 1;
alturas[57] = 1;
alturas[58] = 1;
alturas[65] = 1;
alturas[66] = 1;
alturas[67] = 1;
alturas[74] = 1;
alturas[75] = 1;
alturas[76] = 1;
alturas[59] = 2;
alturas[68] = 2;
alturas[69] = 2;
alturas[77] = 2;
alturas[78] = 2;
alturas[79] = 2;

alturas.forEach((valor,index) => {
    if(valor == 1){
        area_grid[index].classList.add("ativo1");
    }
    else if(valor == 2){
        area_grid[index].classList.add("ativo2");
    }
});

const coluna = 10;
const linha = 8;


posicao = {
    x : 3,
    y : 2,
    z : 0
};
direcao = 0;
filadamain = [];
filadaf1 = [];
filadaf2= [];

const fmain = document.getElementById("fmain");
const f1 = document.getElementById("f1");
const f2 = document.getElementById("f2");

let funcao_selecionada = 0;

window.onload = () => { 
    andarBoneco();
    selecionaFuncao(0);
}

// SELECIONA FUNÇÃO - FUNCIONA O TEMPO TODO
fmain.addEventListener("click", () => selecionaFuncao(0));
f1.addEventListener("click", () => selecionaFuncao(1));
f2.addEventListener("click", () => selecionaFuncao(2));

function selecionaFuncao(nome_funcao){
    fmain.style.backgroundColor = "";
    f1.style.backgroundColor = "";
    f2.style.backgroundColor = "";

    if (nome_funcao == 0){
        fmain.style.backgroundColor = "lightgreen";
    }else if(nome_funcao == 1){
        f1.style.backgroundColor = "lightgreen";
    }else if(nome_funcao == 2){
        f2.style.backgroundColor = "lightgreen";
    }

    funcao_selecionada = nome_funcao;
}



function andarBoneco(){
const pos_atual = posicao.y * coluna + posicao.x;
    if(posicao.y < linha && posicao.x < coluna ){
    const boneco = document.getElementById("boneco");
        area_grid[pos_atual].appendChild(boneco);
    }
}

function andarCima(){
    const direcao = alturas[(posicao.y-1) * coluna + posicao.x];
    if(posicao.y > 0 && posicao.z == direcao){
        posicao.y--;
        andarBoneco();
    }
}
function andarDireita(){
    const direcao = alturas[posicao.y * coluna + (posicao.x +1)];
    if(posicao.x < coluna -1  && posicao.z == direcao){
        posicao.x++;
        andarBoneco();
    }
}
function andarBaixo(){
    const direcao = alturas[(posicao.y +1) * coluna + posicao.x];
    if(posicao.y < linha -1  && posicao.z == direcao){
        posicao.y++;
        andarBoneco();
    }
}
function andarEsquerda(){
    const direcao = alturas[posicao.y * coluna + (posicao.x -1)];
    if(posicao.x > 0  && posicao.z == direcao){
        posicao.x--;
        andarBoneco();
    }
}

function verDirecao(){
    const boneco = document.getElementById("boneco");

    if(direcao == 0){
        boneco.style.backgroundImage = "url('assets/placeholder/cima.png')";
    }
    if(direcao == 1){
        boneco.style.backgroundImage = "url('assets/placeholder/direita.png')";
    }
    if(direcao == 2){
        boneco.style.backgroundImage = "url('assets/placeholder/baixo.png')";
    }
    if(direcao == 3){
        boneco.style.backgroundImage = "url('assets/placeholder/esquerda.png')";
    }
}

function andarDirecao(){

    if(direcao == 0){
        andarCima();
    }
    if(direcao == 1){
        andarDireita();
    }
    if(direcao == 2){
        andarBaixo();
    }
    if(direcao == 3){
        andarEsquerda();
    }
}

    function virarDireita(){
        direcao++;
        direcao = direcao%4;
        verDirecao();
        
    }
    function virarEsquerda(){
        direcao--;
        direcao = direcao%4;
        if(direcao < 0) direcao +=4;
        verDirecao();
    }   
    function pular(){

    }


function colocaImagem(qual, fila, grid_funcao){
    
    const index = fila.length - 1;
                
    if (index >= 0 && index < grid_funcao.length) {
        if(qual == 1){
            grid_funcao[index].style.backgroundImage = "url('assets/botoes/frente.jpeg')";
        }
        else if(qual == 2){
            grid_funcao[index].style.backgroundImage = "url('assets/botoes/direita.jpeg')";
        }
        else if(qual == 3){
            grid_funcao[index].style.backgroundImage = "url('assets/botoes/esquerda.jpeg')";
        }

    } else {
        console.warn("Índice inválido:", index);
    }
}


function salvarAcao (comando, fila){
    if(fila.length >= 12){
        alert("Limite de 12 ações atingido manin");
        return;
        
    }

    fila.push(comando);
    console.log("Ação salva:", comando.name);


}
function executarAcao(){
    
    filadamain.forEach((comando, i)  => {
        setTimeout(() => {
            comando();
        }, i*500);
        })
    filadamain = [];
}

function SalvareColocar(comando, qual){
    console.log(funcao_selecionada);
    console.log(typeof funcao_selecionada);
    let fila;
    let grid_funcao;
    if (funcao_selecionada == 0){ 
        fila = filadamain;
        grid_funcao = document.querySelectorAll(".comando-main");
    } else if (funcao_selecionada == 1){
        fila = filadaf1;
        grid_funcao = document.querySelectorAll(".comando-f1");
    } else if (funcao_selecionada == 2){
        fila = filadaf2;
        grid_funcao = document.querySelectorAll(".comando-f2");
    }
    salvarAcao(comando, fila);
    colocaImagem(qual, fila, grid_funcao);
}