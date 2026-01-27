
const area_grid = document.querySelectorAll(".grid-square");
const boneco = document.getElementById("boneco");
const grid_main = document.querySelectorAll(".comando-main");
const grid_f1 = document.querySelectorAll(".comando-f1");
const grid_f2 = document.querySelectorAll(".comando-f2");

let posicao;
let direcao;
let pipocas = 0;

// LEVEL DESIGN
let alturas = new Array(area_grid.length).fill(0);

const altura1 = [29,38,39,47,48,49,56,57,58,65,66,67,74,75,76];
const altura2 = [1,2,3,59,60,61,68,69,70,71,77,78,79];
const comida = [12,22,45,54,72];

for(const i of altura1){
    alturas[i] = 1;
    area_grid[i].classList.add("altura1");
}
for(const i of altura2){
    alturas[i] = 2;
    area_grid[i].classList.add("altura2");
}

function posicionaComida(){
    for (const i of comida){
        area_grid[i].classList.add("comida");
    }
}
function posicionaBoneco(){
    posicao = {
        x : 3,
        y : 2,
        z : 0
    };
    direcao = 0;
    const pos_atual = posicao.y * coluna + posicao.x;
    area_grid[pos_atual].appendChild(boneco);
    verDirecao();
}


let estado_jogo = 0;
//0 -> parado
//1 -> executando
//2 -> executando, mas deve parar




const coluna = 10;
const linha = 8;

filadamain = [];
filadaf1 = [];
filadaf2 = [];

const fmain = document.getElementById("fmain");
const f1 = document.getElementById("f1");
const f2 = document.getElementById("f2");

let funcao_selecionada = 0;

window.onload = () => {
    posicionaBoneco();
    posicionaComida();
    andarBoneco();
    selecionaFuncao(0);
}

// SELECIONA FUNÇÃO - FUNCIONA O TEMPO TODO
fmain.addEventListener("click", () => selecionaFuncao(0));
f1.addEventListener("click", () => selecionaFuncao(1));
f2.addEventListener("click", () => selecionaFuncao(2));

grid_main.forEach(quadrado => {
    quadrado.addEventListener("click", () => removeComando(filadamain, grid_main, quadrado))
})
grid_f1.forEach(quadrado => {
    quadrado.addEventListener("click", () => removeComando(filadaf1, grid_f1, quadrado))
})
grid_f2.forEach(quadrado => {
    quadrado.addEventListener("click", () => removeComando(filadaf2, grid_f2, quadrado))
})

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


function verDirecao(){
    const url_direcao = [
        "url('../assets/placeholder/cima.png')",
        "url('../assets/placeholder/direita.png')",
        "url('../assets/placeholder/baixo.png')",
        "url('../assets/placeholder/esquerda.png')"
    ];
    boneco.style.backgroundImage = url_direcao[direcao];
}


// COMANDOS

async function andarDirecao(){
    if(direcao == 0) andarCima();
    if(direcao == 1) andarDireita();
    if(direcao == 2) andarBaixo();
    if(direcao == 3) andarEsquerda();
    await sleep(500);
}

    async function virarDireita(){
        direcao++;
        direcao = direcao%4;
        verDirecao();
        await sleep(500);
    }
    async function virarEsquerda(){
        direcao--;
        direcao = direcao%4;
        if(direcao < 0) direcao +=4;
        verDirecao();
        await sleep(500);
    }   
    async function pular(){
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
       await sleep(500);
    }

async function interagir(){
    const pos_atual = posicao.y * coluna + posicao.x;
    if(area_grid[pos_atual].classList.contains("comida")){
        area_grid[pos_atual].classList.remove("comida");
        pipocas++;
        console.log("Pipocas coletadas:", pipocas);
        verificaVitoria();
    }
    await sleep(500);
}


function colocaImagem(qual, fila, grid_funcao){
    
    const index = fila.length - 1;
    const url_botoes = ["",
        "url('../assets/botoes/frente.jpeg')",
        "url('../assets/botoes/direita.jpeg')",
        "url('../assets/botoes/esquerda.jpeg')",
        "url('../assets/botoes/pular.jpeg')",
        "url('../assets/botoes/interagir.jpeg')",
        "url('../assets/botoes/f1.jpeg')",
        "url('../assets/botoes/f2.jpeg')"
    ];
                
    grid_funcao[index].style.backgroundImage = url_botoes[qual];
}

function removeComando(fila, grid_funcao, quadrado){
    const index = fila.length - 1;
    let grid_array = Array.from(grid_funcao);

    if (grid_array.indexOf(quadrado) == index){
        grid_array[index].style.backgroundImage = "none";
        fila.pop();
    }
}


function salvarAcao (comando, fila){
    fila.push(comando);
    console.log("Ação salva:", comando.name);
}


// EXECUÇÃO DOS COMANDOS

function verificaVitoria(){
    if(pipocas == comida.length){
        alert("Parabéns! Você coletou todas as pipocas!");
    }
}

function sleep(tempo){
    return new Promise(resolve => setTimeout(resolve, tempo));
}

async function go(){
    if (estado_jogo == 0) { // inicia execução
        estado_jogo = 1;
        await executarAcao();
        await sleep(1000);
        console.log("Execução encerrada.")
        posicionaBoneco();
        posicionaComida();
        estado_jogo = 0;
    } else if (estado_jogo == 1) { // encerra execução
        estado_jogo = 2;
    }
}

async function executarAcao(){
    for (let i = 0; i < filadamain.length; i++) {
        if (estado_jogo == 2) return;
        await filadamain[i]();
    }
}

async function executarF1(){
    for (let i = 0; i < filadaf1.length; i++) {
        if (estado_jogo == 2) return;
        await filadaf1[i]();
    }
}

async function executarF2(){
    for (let i = 0; i < filadaf2.length; i++) {
        if (estado_jogo == 2) return;
        await filadaf2[i]();
    }
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