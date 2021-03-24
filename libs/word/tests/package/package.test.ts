// import from package with absolute path and test
import {ONE} from '@bingsjs/ts-proj-template'

describe("package test",()=>{
    it("should be able to import from package with absolute path", ()=>{
        expect(ONE).toEqual(1);
    })
})