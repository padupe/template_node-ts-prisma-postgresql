import { AppError } from "@shared/errors/appError"
import { validateParamString } from "./validateParam"

let validParam = "teste"
console.log(validParam)
let failureParam = ""

describe("ValidateParam function", () => {

    it("ValidateParam successfully", async () => {

        let test = validateParamString(validParam)
        expect(test).toBeTruthy()
    })

    it("ValidateParam failure by blank", async () => {

        try {
            validateParamString(" ")
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })

    it("ValidateParam failure by invald param", async () => {

        try {
            validateParamString(failureParam)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })
})