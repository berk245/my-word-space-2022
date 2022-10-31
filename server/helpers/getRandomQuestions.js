module.exports = function(wordPool, amount){ 

    if(wordPool.length < amount){
        return({error: 'Not enough words'})
    }

    let uniqueIndexes = getUniqueIndexes(wordPool, amount)

    let result = []

    uniqueIndexes.map(idx => {
        result.push(wordPool[idx])
    })

    return result
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function getUniqueIndexes(wordPool, amount){
    let uniqueIndexes = new Set()

    while(uniqueIndexes.size < amount){
        let randomIndex = getRandomInt(wordPool.length-1)
        uniqueIndexes.add(randomIndex)
    }

    return Array.from(uniqueIndexes)
}