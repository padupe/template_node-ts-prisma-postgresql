import { AppError } from "@shared/errors/appError";

export function validateParamString(param: string) {

    const regex = /(?!^ +$)^.+$/g

    const validate = regex.test(param)
   
    if(!validate) {
        throw new AppError("Invalid Parameters", 422)
    }

    return true
}