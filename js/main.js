// variaveis controle de interfaces
const seuVotoPara = document.querySelector('.d-1-1 span');
const cargo = document.querySelector('.d-1-2 span');
const descricao = document.querySelector('.d-1-4');
const aviso = document.querySelector('.d-2');
const lateral = document.querySelector('.d-1-right');
const numeros = document.querySelector('.d-1-3');
let tela = document.querySelector('.tela');
const d1 = document.querySelector('.d-1');
const d2 = document.querySelector('.d-2');
const divTela = document.createElement('div');

//
// variaveis controle de ambiente

let etapaAtual = 0;
let numero = '';
let votoBranco = true;
let votos = [];
let fim = false;
const confirma = false;

function comecarEtapa() {
    if (fim) {
        d1.style.display = '';
        d2.style.display = '';
        divTela.remove();
    }

    const etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i += 1) {
        if (i === 0) {
            numeroHtml += `<div class="numero pisca"></div>`;
        } else {
            numeroHtml += `<div class="numero "></div>`;
        }
    }

    seuVotoPara.style.display = 'none';
    seuVotoPara.innerHTML = cargo.innerHTML.toUpperCase();
    cargo.innerHTML = etapa.titulo.toUpperCase();
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function telaFim() {
    tela = document.querySelector('.tela');

    d1.style.display = 'none';
    d2.style.display = 'none';
    tela.appendChild(divTela);
    divTela.innerHTML = '<div class="aviso--gigante pisca nulo">FIM</div>`';
}
function atualizaInterface() {
    const etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((v) => {
        if (v.numero === numero) {
            return true;
        }
        return false;
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}<br>`;

        let fotosHtml = '';

        for (const i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `
            <div class="d-1-image small">
                <img src="img/${candidato.fotos[i].url}" alt="" />
                ${candidato.fotos[i].legenda}
            </div>`;
            } else {
                fotosHtml += `
            <div class="d-1-image">
                <img src="img/${candidato.fotos[i].url}" alt="" />
                ${candidato.fotos[i].legenda}
            </div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`;
    }
}
function clicou(n) {
    const numeroPisca = document.querySelector('.numero.pisca');
    if (numeroPisca !== null) {
        numeroPisca.innerHTML = n;
        numero = `${numero}${n}`;
        numeroPisca.classList.remove('pisca');
        if (numeroPisca.nextElementSibling !== null) {
            numeroPisca.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function btnBranco() {
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso--grande pisca nulo">VOTO EM BRANCO</div>`;
    } else {
        alert('Para votar em BRANCO, nao pode ter digitado em nenhum numero');
    }

    if (fim) {
        comecarEtapa();
        fim = false;
    }
}
function btnCorrige() {
    comecarEtapa();
    if (fim) {
        comecarEtapa();
        fim = false;
    }
}
function btnConfirma() {
    const etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco === true) {
        alert('VOTO BRANCO COMFIRMADO');
        votos.push({ etapa: etapas[etapaAtual].titulo, voto: 'branco' });
        votoConfirmado = true;
    } else if (numero.length === etapa.numeros) {
        alert('VOTO COMFIRMADO');
        votos.push({ etapa: etapas[etapaAtual].titulo, voto: numero });
        votoConfirmado = true;
    }
    if (votoConfirmado === false && fim) {
        etapaAtual = 0;

        comecarEtapa();
    } else {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            telaFim();

            votos.forEach((v, i) => {
                alert(`${i + 1} - SELECAO\nCARGO: ${v.etapa}\nVOTO: ${v.voto}`);
            });

            fim = true;

            etapaAtual = 0;
            votos = [];
            votoBranco = false;
        }
    }
}

comecarEtapa();
