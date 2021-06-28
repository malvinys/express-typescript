const removeCharFromString = (text: string, char: string [])  => {
    let textFormatted: string = text;

    char.map((item) => {
        if(item === ' ') {
            textFormatted = textFormatted.replace(/\s/g, '');
        }
    })

    return textFormatted.trim();
}

export {
    removeCharFromString
}
