const getInitializedArray = (
    baseLength : number,
    variation : number
) : void[] => {
    return Array.apply(null, Array(Math.floor(Math.random() * variation) + baseLength)).map(function () {})
}

export default getInitializedArray;