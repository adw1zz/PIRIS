const getDTOs = (DtoClass, models) => {
    const dtos = models.map((model) => { return new DtoClass(model) });
    return dtos;
}

module.exports = getDTOs;