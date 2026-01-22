const FATORES_EMISSAO = {
    car: 0.2,     // Fator de emissão para carros (ex: 0.2 kg de CO₂ por km)
    bus: 0.1,     // Fator de emissão para ônibus
    truck: 0.5,   // Fator de emissão para caminhões
    bicycle: 0,   // Bicicletas não emitem CO₂
};

/**
 * Calcula a emissão de CO₂ com base na distância e no meio de transporte.
 * @param {number} distancia - A distância da viagem em quilômetros.
 * @param {string} tipoTransporte - O tipo de transporte (ex: 'car', 'bus').
 * @returns {number|null} A emissão total de CO₂ em kg, ou null se o transporte for inválido.
 */
export function calcularEmissao(distancia, tipoTransporte) {
    const fator = FATORES_EMISSAO[tipoTransporte];

    if (fator === undefined) {
        console.error(`Tipo de transporte inválido: ${tipoTransporte}`);
        return null;
    }

    const emissao = distancia * fator;
    return emissao;
}
