import { AppError } from "@shared/errors/appError"
import { validateBodyPosts } from "./validateBodyPosts"

let bodySuccess = {
    title: "Title Success",
}

let bodyFailure = {
    title: ""
}

describe("ValidateBodyPost function", () => {
    
    it("ValidateBodyPost successfully", () => {

        let test = validateBodyPosts(bodySuccess)
        expect(test).toBeTruthy()
    })

    it("ValidateBodyPost failure All", () => {

        try {
            validateBodyPosts(bodyFailure)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })
})