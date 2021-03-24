// import from package with absolute path and test
import {WORD} from '@bingsjs/word'

describe("package test",()=>{
    it("should be able to import from package with absolute path", ()=>{
        expect(typeof WORD).toEqual("string");
    })
})