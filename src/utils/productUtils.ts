export const formattedPrice = (value: number) => {
    return `$ ${((Math.round(value) * 100) / 100).toFixed(2)}`;
};