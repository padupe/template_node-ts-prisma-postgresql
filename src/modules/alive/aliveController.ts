import { Request, Response } from "express"

export class AliveController {

    handle(request: Request, response: Response) {
        return response.json({message: "I'm alive!"})
    }
}