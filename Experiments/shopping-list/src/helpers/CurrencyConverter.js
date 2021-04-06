export function toCurrencyBRL(number) {
    const currencyFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    return currencyFormat.format(number/100);
}

