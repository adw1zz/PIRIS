const getDTOs = (DtoClass, models) => {
    if (!Array.isArray(models)) {
        return new DtoClass(models);
    }
    const dtos = models.map((model) => { return new DtoClass(model) });
    return dtos;
}

module.exports = getDTOs;