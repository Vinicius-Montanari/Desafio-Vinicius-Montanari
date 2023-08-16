class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: 3.00 ,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };

        this.formasDePagamento = {
            dinheiro: 0.05,
            debito: 0,
            credito: 0.03, 
        };
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let valorTotal = 0;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!this.cardapio.hasOwnProperty(codigo)) {
                return 'Item inválido!';
            }
            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            if (codigo === 'queijo' && !itens.some(i => i.includes('sanduiche'))) {
                return 'Item extra não pode ser pedido sem o principal';
            }

            if (codigo === 'chantily' && !itens.some(i => i.includes('cafe'))) {
                return 'Item extra não pode ser pedido sem o principal';
            }

            valorTotal += this.cardapio[codigo] * parseInt(quantidade);
        }

        if (metodoDePagamento !== 'dinheiro' && metodoDePagamento !== 'debito' && metodoDePagamento !== 'credito') {
            return 'Forma de pagamento inválida!';
        }

        if (metodoDePagamento === 'credito') {
            valorTotal = valorTotal + valorTotal * this.formasDePagamento[metodoDePagamento];
        } else {
            valorTotal = valorTotal - valorTotal * this.formasDePagamento[metodoDePagamento];
        }

        return 'R$ ' + valorTotal.toFixed(2).replace('.', ',');
    }
}

export { CaixaDaLanchonete };
