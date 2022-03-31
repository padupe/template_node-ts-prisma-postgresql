import { AppError } from "@shared/errors/appError"
import { hashPassword, verifyPassword } from "./bcrypt"

let passwordTest = "passTestBcrypt"
let passwordFail = "fail"

describe("Bcrypt Test", () => {

    it("Hash and Compare with successfully", async () => {

        let password = await hashPassword(passwordTest)
        expect(verifyPassword(passwordTest, password)).toBeTruthy()
    })

    it("Hash and Compare with failure password", async () => {

        try {
            let password = await hashPassword(passwordTest)
            await verifyPassword(passwordFail, password)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })
})