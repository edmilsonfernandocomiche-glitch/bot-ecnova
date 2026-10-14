export const macdSarRobustConfig = {
    id: 'macd_sar_robust',
    title: 'MACD + SAR Tendência Forte',
    description: 'Estratégia avançada de momentum combinando cruzamento MACD com confirmação de Parabolic SAR e filtro de tendência.',
    type: 'options',
    parameters: [
        {
            type: 'number',
            id: 'macdFast',
            label: 'Período Rápido MACD',
            defaultValue: 12,
        },
        {
            type: 'number',
            id: 'macdSlow',
            label: 'Período Lento MACD',
            defaultValue: 26,
        },
        {
            type: 'number',
            id: 'macdSignal',
            label: 'Sinal MACD',
            defaultValue: 9,
        },
        {
            type: 'number',
            id: 'sarStep',
            label: 'Passo SAR',
            defaultValue: 0.02,
        },
        {
            type: 'number',
            id: 'sarMax',
            label: 'Máximo SAR',
            defaultValue: 0.2,
        }
    ]
};
