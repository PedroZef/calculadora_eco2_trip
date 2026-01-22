import { calcularEmissao } from './calculator.js';
import { exibirResultados, limparResultados } from './ui.js';
import { RoutesDB } from './routes-data.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Seleciona os elementos do DOM
    const form = document.getElementById('formulario-calculadora');
    const distanceInput = document.getElementById('distancia');
    const manualDistanceCheckbox = document.getElementById('distancia-manual');
    const origemInput = document.getElementById('origem');
    const destinoInput = document.getElementById('destino');
    const listaCidades = document.getElementById('lista-cidades');

    // Popula o datalist com as cidades
    const cidades = await RoutesDB.getAllCities();
    const citiesSet = new Set(cidades.map(c => c.toLowerCase()));
    cidades.forEach(cidade => {
        const option = document.createElement('option');
        option.value = cidade;
        listaCidades.appendChild(option);
    });

    // Função para atualizar a distância
    const atualizarDistancia = async () => {
        const origem = origemInput.value;
        const destino = destinoInput.value;

        if (citiesSet.has(origem.toLowerCase()) && citiesSet.has(destino.toLowerCase())) {
            const distancia = await RoutesDB.findDistance(origem, destino);
            if (distancia) {
                distanceInput.value = distancia;
            } else {
                distanceInput.value = '';
            }
        } else {
            distanceInput.value = '';
        }
    };

    // Adiciona "escutadores" para os campos de origem and destino
    origemInput.addEventListener('input', atualizarDistancia);
    destinoInput.addEventListener('input', atualizarDistancia);
    origemInput.addEventListener('change', atualizarDistancia);
    destinoInput.addEventListener('change', atualizarDistancia);

    // Limpa os resultados ao carregar a página
    limparResultados();

    // Adiciona um "escutador" para o envio do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página
        
        const transport = form.querySelector('input[name="transport"]:checked').value;
        const distance = parseFloat(distanceInput.value);

        if (isNaN(distance) || distance <= 0) {
            alert('Por favor, insira uma distância válida.');
            return;
        }

        // Calcula a emissão
        const emissao = calcularEmissao(distance, transport);

        if (emissao !== null) {
            // Exibe os resultados na UI
            exibirResultados(emissao);
        }
    });

    // Lógica para habilitar/desabilitar a distância manual
    manualDistanceCheckbox.addEventListener('change', () => {
        const isManual = manualDistanceCheckbox.checked;
        distanceInput.readOnly = !isManual;
        
        if (isManual) {
            distanceInput.focus();
        }
        else {
            // Limpa o campo se voltar ao modo automático
            atualizarDistancia();
        }
    });

    // Limpa os resultados se o usuário alterar qualquer entrada do formulário
    form.addEventListener('input', () => {
        limparResultados();
    });
});