// Este arquivo simula um banco de dados de rotas e cidades.
// Em uma aplicação real, isso viria de uma API.

let routes = []; // Cache para as rotas

/**
 * Carrega as rotas do arquivo JSON.
 */
async function loadRoutes() {
    if (routes.length === 0) {
        try {
            const response = await fetch('./routes.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            routes = await response.json();
        } catch (error) {
            console.error("Não foi possível carregar o arquivo de rotas:", error);
            // Em um aplicativo real, você pode querer tratar esse erro de forma mais robusta
        }
    }
}

export const RoutesDB = {
    /**
     * Obtém todos os nomes de cidades únicos do banco de dados de rotas.
     * @returns {Promise<Array<string>>} Uma matriz ordenada de nomes de cidades únicos.
     */
    async getAllCities() {
        await loadRoutes();
        const citiesSet = new Set();
        routes.forEach(route => {
            citiesSet.add(route.origin);
            citiesSet.add(route.destination);
        });
        return Array.from(citiesSet).sort();
    },

    /**
     * Encontra a distância entre duas cidades.
     * A busca é bidirecional.
     * @param {string} origin - O nome da cidade de origem.
     * @param {string} destination - O nome da cidade de destino.
     * @returns {Promise<number|null>} A distância em km se a rota for encontrada, caso contrário, nulo.
     */
    async findDistance(origin, destination) {
        await loadRoutes();
        const normalizedOrigin = origin.trim().toLowerCase();
        const normalizedDestination = destination.trim().toLowerCase();

        const route = routes.find(r => {
            const routeOrigin = r.origin.toLowerCase();
            const routeDestination = r.destination.toLowerCase();
            return (
                (routeOrigin === normalizedOrigin && routeDestination === normalizedDestination) ||
                (routeOrigin === normalizedDestination && routeDestination === normalizedOrigin)
            );
        });

        return route ? route.distanceKm : null;
    },

    /**
     * Limpa o cache de rotas (para testes).
     */
    clearCache() {
        routes = [];
    }
};

