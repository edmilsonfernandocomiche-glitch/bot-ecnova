export const macdSarRobustStrategy = {
    name: 'MACD + SAR Tendência Forte',
    description: 'Estratégia avançada com confirmação dupla de momentum e filtro de tendência para operações de alta precisão.',
    
    parameters: {
        macdFast: { default: 12, type: 'number', description: 'Período rápido MACD' },
        macdSlow: { default: 26, type: 'number', description: 'Período lento MACD' },
        macdSignal: { default: 9, type: 'number', description: 'Sinal MACD' },
        sarStep: { default: 0.02, type: 'number', description: 'Passo SAR' },
        sarMax: { default: 0.2, type: 'number', description: 'Máximo SAR' },
        minTrendConfirmation: { default: 3, type: 'number', description: 'Número de velas consecutivas de confirmação' }
    },

    evaluateSignal(marketData: { 
        macdLine: number[], 
        signalLine: number[], 
        sarValues: number[], 
        prices: number[] 
    }) {
        const lastIdx = marketData.prices.length - 1;
        if (lastIdx < 5) return { action: null, reason: 'Dados insuficientes para análise segura.' };

        const currentMacd = marketData.macdLine[lastIdx];
        const currentSignal = marketData.signalLine[lastIdx];
        const prevMacd = marketData.macdLine[lastIdx - 1];
        const prevSignal = marketData.signalLine[lastIdx - 1];

        const currentSar = marketData.sarValues[lastIdx];
        const currentPrice = marketData.prices[lastIdx];

        // 1. Cruzamento do MACD
        const crossUp = prevMacd <= prevSignal && currentMacd > currentSignal;
        const crossDown = prevMacd >= prevSignal && currentMacd < currentSignal;

        // 2. Posição do Parabolic SAR (Preço acima ou abaixo)
        const isBullishSar = currentPrice > currentSar;
        const isBearishSar = currentPrice < currentSar;

        // 3. Filtro de Consistência (Garante que o preço está a manter a direção nas últimas velas)
        let bullishTrendCount = 0;
        let bearishTrendCount = 0;

        for (let i = 0; i < 3; i++) {
            const idx = lastIdx - i;
            if (marketData.prices[idx] > marketData.sarValues[idx]) bullishTrendCount++;
            if (marketData.prices[idx] < marketData.sarValues[idx]) bearishTrendCount++;
        }

        // Condição de Compra (Call) Forte
        if (crossUp && isBullishSar && bullishTrendCount >= 3) {
            return {
                action: 'CALL',
                reason: 'Sinal forte de alta: Cruzamento MACD validado por SAR e consistência de preço.'
            };
        }

        // Condição de Venda (Put) Forte
        if (crossDown && isBearishSar && bearishTrendCount >= 3) {
            return {
                action: 'PUT',
                reason: 'Sinal forte de baixa: Cruzamento MACD validado por SAR e consistência de preço.'
            };
        }

        return {
            action: null,
            reason: 'Mercado em zona de ruído ou sem confirmação de tendência.'
        };
    }
};
