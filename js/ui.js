/**
 * Exibe os resultados do cálculo de emissão na interface do usuário.
 * @param {number} emissaoKg - O valor da emissão em quilogramas de CO₂.
 */
export function exibirResultados(emissaoKg) {
    const resultadosDiv = document.getElementById('resultados-conteudo');
    const resultadosSection = document.getElementById('resultados');

    if (!resultadosDiv || !resultadosSection) {
        console.error('Elementos de resultado não encontrados no DOM.');
        return;
    }

    // Formata o número para ter no máximo 2 casas decimais
    const emissaoFormatada = emissaoKg.toFixed(2);

    resultadosDiv.innerHTML = `
        <h2 class="resultados__titulo">Resultado da Emissão</h2>
        <p class="resultados__texto">
            Sua viagem emitirá aproximadamente <strong>${emissaoFormatada} kg de CO₂</strong>.
        </p>
    `;

    // Torna a seção de resultados visível
    resultadosSection.classList.remove('oculto');
}

/**
 * Esconde as seções de resultado, comparação e créditos de carbono.
 */
export function limparResultados() {
    document.getElementById('resultados').classList.add('oculto');
}