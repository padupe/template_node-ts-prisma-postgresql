import { AppError } from "@shared/errors/appError"
import { validateBodyPosts } from "./validateBodyPosts"

let bodySuccess = {
    title: "Title Success",
    author_id: "789-asd6-45cv7"
}

let bodyFailure = {
    title: "",
    author_id: ""
}

let bodyFailureTitle = {
    title: "Title Failure",
    author_id: "789-asd6-45cv7"
}

let bodyFailureAuthorID = {
    title: "Title Failure",
    author_id: ""
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

    it("ValidateBodyPost failure Title", () => {

        try {
            validateBodyPosts(bodyFailureTitle)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })

    it("ValidateBodyPost failure Author ID", () => {

        try {
            validateBodyPosts(bodyFailureAuthorID)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })
})