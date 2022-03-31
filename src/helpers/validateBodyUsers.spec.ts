import { AppError } from "@shared/errors/appError"
import { validateBodyCreateUser } from "./validateBodyUsers"

let bodySuccess = {
    name: "User",
    username: "sample_user",
    email: "sampleuser@email.com",
    password: "passwordSample"
}

let bodyFailureName = {
    name: "",
    username: "sample_user",
    email: "sampleuser@email.com",
    password: "passwordSample"
}

let bodyFailureUsername = {
    name: "User",
    username: "",
    email: "sampleuser@email.com",
    password: "passwordSample"
}

let bodyFailureEmail = {
    name: "User",
    username: "sample_user",
    email: "",
    password: "passwordSample"
}

let bodyFailurePassword = {
    name: "User",
    username: "sample_user",
    email: "sampleuser@email.com",
    password: ""
}

describe("ValidateBodyUser function", () => {
    
    it("ValidateBodyUser successfully", () => {

        let test = validateBodyCreateUser(bodySuccess)
        expect(test).toBeTruthy()
    })

    it("ValidateBodyUser failure name", () => {

        try {
            validateBodyCreateUser(bodyFailureName)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })
   
    it("ValidateBodyUser failure username", () => {

        try {
            validateBodyCreateUser(bodyFailureUsername)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })

    it("ValidateBodyUser failure email", () => {

        try {
            validateBodyCreateUser(bodyFailureEmail)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })

    it("ValidateBodyUser failure password", () => {

        try {
            validateBodyCreateUser(bodyFailurePassword)
        } catch (error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })
})