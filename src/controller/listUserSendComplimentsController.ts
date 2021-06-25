import { Request, Response } from "express";

import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";

class ListUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserSendComplimentsService = new ListUserSendComplimentsService();

    const compliments = await (
      await listUserSendComplimentsService.execute(user_id)
    ).created_at;

    return response.json(compliments);
  }
}

export { ListUserSendComplimentsController };
