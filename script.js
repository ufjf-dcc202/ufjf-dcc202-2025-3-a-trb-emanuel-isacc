
const area_grid = document.querySelectorAll(".grid-square");
let alturas = new Array(area_grid.length).fill(0);

const altura1 = [29,38,39,47,48,49,56,57,58,65,66,67,74,75,76];
const altura2 = [59,68,69,77,78,79];
const comida = [12,22,45,54,72];
for(const i of altura1){
    alturas[i] = 1;
}
for(const i of altura2){
    alturas[i] = 2;
}
for (const i of comida){
    area_grid[i].classList.add("comida");
}

/*
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
*/

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
    if(posicao.y > 0){
        const destinoIndex = (posicao.y - 1) * coluna + posicao.x;
        if(alturas[destinoIndex] <= posicao.z){
            posicao.y--;
            posicao.z = alturas[destinoIndex]; // atualiza altura
            andarBoneco();
        }
    }
}

function andarDireita(){
    if(posicao.x < coluna - 1){
        const destinoIndex = posicao.y * coluna + (posicao.x + 1);
        if(alturas[destinoIndex] <= posicao.z){
            posicao.x++;
            posicao.z = alturas[destinoIndex];
            andarBoneco();
        }
    }
}

function andarBaixo(){
    if(posicao.y < linha - 1){
        const destinoIndex = (posicao.y + 1) * coluna + posicao.x;
        if(alturas[destinoIndex] <= posicao.z){
            posicao.y++;
            posicao.z = alturas[destinoIndex];
            andarBoneco();
        }
    }
}

function andarEsquerda(){
    if(posicao.x > 0){
        const destinoIndex = posicao.y * coluna + (posicao.x - 1);
        if(alturas[destinoIndex] <= posicao.z){
            posicao.x--;
            posicao.z = alturas[destinoIndex];
            andarBoneco();
        }
    }
}

function interagir(){
    const pos_atual = posicao.y * coluna + posicao.x;
    if(area_grid[pos_atual].classList.contains("comida")){
        area_grid[pos_atual].classList.remove("comida");

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
        let proxima_casa;

        if(direcao == 0){
            proxima_casa = (posicao.y-1) * coluna + posicao.x;
            if(Math.abs(alturas[proxima_casa] - posicao.z) == 1){ 
            posicao.z = alturas[proxima_casa];
            posicao.y--;
            andarBoneco();
            }
        }
        if(direcao == 1){
            proxima_casa = posicao.y * coluna + (posicao.x +1);
            if(Math.abs(alturas[proxima_casa] - posicao.z) == 1){
            posicao.z = alturas[proxima_casa];
            posicao.x++;
            andarBoneco();
            }
        }
        if(direcao == 2){
            proxima_casa = (posicao.y +1) * coluna + posicao.x;
            if(Math.abs(alturas[proxima_casa] - posicao.z) == 1){
            posicao.z = alturas[proxima_casa];
            posicao.y++;
            andarBoneco();
            }
        }
        if(direcao == 3){
            proxima_casa = posicao.y * coluna + (posicao.x -1);
            if(Math.abs(alturas[proxima_casa] - posicao.z) == 1){
            posicao.z = alturas[proxima_casa];
            posicao.x--;
            andarBoneco();
            }
       }
    }


function colocaImagem(qual, fila, grid_funcao){
    
    const index = fila.length - 1;
    const url_botoes = ["",
        "url('assets/botoes/frente.jpeg')",
        "url('assets/botoes/direita.jpeg')",
        "url('assets/botoes/esquerda.jpeg')",
        "url('assets/botoes/pular.jpeg')",
        "url('assets/botoes/interagir.jpeg')",
        "url('assets/botoes/f1.jpeg')",
        "url('assets/botoes/f2.jpeg')"
    ];
                
    grid_funcao[index].style.backgroundImage = url_botoes[qual];
}


function salvarAcao (comando, fila){
    fila.push(comando);
    console.log("Ação salva:", comando.name);
}

function executarAcao(){
    filadamain.forEach((comando, i)  => {
        setTimeout(() => {comando();}, i*500);
    })
}

function executarF1(){
    filadaf1.forEach((comando, i)  => {
        setTimeout(() => {comando();}, i*500);
    })
}

function executarF2(){
    filadaf2.forEach((comando, i)  => {
        setTimeout(() => {comando();}, i*500);
    })
}

function SalvareColocar(comando, qual){

    console.log(funcao_selecionada);
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

    if(fila.length < grid_funcao.length){
        salvarAcao(comando, fila);
        colocaImagem(qual, fila, grid_funcao);
    } else {
        alert("Limite de ações atingido.");
    }

}