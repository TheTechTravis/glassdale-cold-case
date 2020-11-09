export const Witness = (witnessObj) => {
    return `
        <div class="witness">
            <h3 class="witness__name"> Witness: ${witnessObj.name} </h3>
            <p class="witness__id"> Statement: ${witnessObj.statements} </p>
        </div>
    `
}