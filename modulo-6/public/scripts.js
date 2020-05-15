const Mask = {
    apply (input, func){
        let execution = setTimeout(() => {
            input.value = Mask[func](input.value);

            clearTimeout(execution);
        }, 1);
    },
    formatBRL(value) {
        value = value.replace(/\D/g, "");

        value = new Intl.NumberFormat('pt-BR',{
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100);
    
        return value;    
    }
}