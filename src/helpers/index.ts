export function formatCurrency(value: number) {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 2
    }).format(value);
}