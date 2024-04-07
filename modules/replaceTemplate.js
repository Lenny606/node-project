function replaceTemplate(template, card){
    // let output = template.replace(/{% CARDS %}/g, card.name)
    let output = template.replace(/{%NAME%}/g, card.name)
    output = output.replace(/{%TYPE%}/g, card.type)
    output = output.replace(/{%description%}/g, card.description)
    output = output.replace(/{%population%}/g, card.population)
    output = output.replace(/{%id%}/g, card.id)

    return output;
}

//exporting module, can be exported directly
module.exports = replaceTemplate;