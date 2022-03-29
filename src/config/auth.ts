export default {
    secret_key: process.env.SECRET_TOKEN,
    options: {
        algorithm: process.env.ALGORITHM_JWT,
        issuer: process.env.ISSUER_JWT,
        expiresIn: process.env.EXPIRES_IN_TOKEN
    }
}