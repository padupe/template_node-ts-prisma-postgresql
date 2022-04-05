import { signJWT, verifyJWT } from "./jsonWebToken"

const authConfigTest = {
    secret_key: "PopCorn",
    options: {
        algorithm: "HS256",
        issuer: "John Travolta",
        expiresIn: "15m"
    }
}

const secretFake = "Pizza"

const payloadTest = {
    email: "emailuser@test.com"
}

describe("JWT Test", () => {

    it("Should be able to create e validate an JWT", () => {

        let testJWT = signJWT({payloadTest}, authConfigTest.secret_key, authConfigTest.options)
        expect(verifyJWT(testJWT, authConfigTest.secret_key, authConfigTest.options)).toBeTruthy()
    })

    it("Should not be able to validate a fake JWT", () => {

        let fakeJWT = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0ODc2ODMwNCwiaWF0IjoxNjQ4NzY4MzA0fQ.qnsjkXMh1t6fGZ2axV-mOxV_i1yLXoULbXPFYNsDrO4"
        expect(verifyJWT(fakeJWT, authConfigTest.secret_key, authConfigTest.options)).toBeFalsy()
    })

    it("Should not be able to validate a JWT modified", () => {

        let testJWT = signJWT({payloadTest}, secretFake, authConfigTest.options)
        expect(verifyJWT(testJWT, authConfigTest.secret_key, authConfigTest.options)).toBeFalsy()
        
    })
})