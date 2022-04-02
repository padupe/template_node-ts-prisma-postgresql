import { AppError } from "@shared/errors/appError"
import { validateBodyAuth } from "./validateBodyAuth"

let bodySuccess = {
    username: "username_test",
    password: "password"
}

let bodyFailure = {
    username: "",
    password: ""
}

let bodyFailureUsername = {
    username: "",
    password: "fail"
}

let bodyFailurePassword = {
    username: "fail_username",
    password: ""
}

describe("ValidateBodyAuthUser function", () => {

    it("ValidateBodyAuthUser Successfully", () => {

        let test = validateBodyAuth(bodySuccess.username, bodySuccess.password)
        expect(test).toBeTruthy()
    })

    it("ValidateBodyAuthUser failure All", () => {

        try {
            validateBodyAuth(bodyFailure.username, bodyFailure.password)
        } catch(error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })

    it("ValidateBodyAuthUser failure username", () => {

        try {
            validateBodyAuth(bodyFailureUsername.username, bodyFailureUsername.password)
        } catch(error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })

    it("ValidateBodyAuthUser failure password", () => {

        try {
            validateBodyAuth(bodyFailurePassword.username, bodyFailurePassword.password)
        } catch(error) {
            expect(error).toBeInstanceOf(AppError)
        }
    })
})