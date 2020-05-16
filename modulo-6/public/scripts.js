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
};

const PhotosUpload = {
    uploadLimit : 6,
    handleFileInput(event) {
        const { files: fileList } = event.target;
        const { uploadLimit } = PhotosUpload;

        if (fileList.length > uploadLimit){
            alert(`Envie no máximo ${uploadLimit} fotos`);
            event.preventDefault();
            return;
        }

        Array.from(fileList).forEach((file) =>{
            const reader = new FileReader();

            reader.onload = () => {
                const image = new Image();
                image.src = String(reader.result);

                const div = document.createElement('div');

                div.classList.add('photo');
                div.onclick = () => alert('click');
                div.appendChild(image);

                document.querySelector('#photos-preview').appendChild(div);
            };

            reader.readAsDataURL(file);
        })
    }
};