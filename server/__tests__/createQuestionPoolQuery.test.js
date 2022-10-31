const createQuestionPoolQuery = require('../helpers/createQuestionPoolQuery')

describe('Question pool query should be formed correctly when', ()=>{

    test('no notebook or word type specified', ()=>{
        let params = {notebooks: [], wordTypes: []}
        let query = createQuestionPoolQuery(1, params)

        expect(query).toBe('SELECT * FROM Word WHERE CreatorID = 1')
    })
    //
    test('only word type is specified', ()=>{
        let params = {notebooks: [], wordTypes: [1,2]}
        let query = createQuestionPoolQuery(1, params)

        expect(query).toBe('SELECT * FROM Word WHERE CreatorID = 1 AND WordType IN (1,2)')
    })
    test('only notebook is specified', ()=>{
        let params = {notebooks: [1,2], wordTypes: []}
        let query = createQuestionPoolQuery(1, params)

        expect(query).toBe('SELECT * FROM Word WHERE CreatorID = 1 AND NotebookID IN (1,2)')
    })
    test('both notebook and word type are specified', ()=>{
        let params = {notebooks: [1,2], wordTypes: [3,4]}
        let query = createQuestionPoolQuery(1, params)

        expect(query).toBe('SELECT * FROM Word WHERE CreatorID = 1 AND NotebookID IN (1,2) AND WordType IN (3,4)')
    })

})