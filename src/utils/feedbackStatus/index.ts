import FeedBackStatusInterface from "@/interfaces/feedbackStatus";
import { STATUS } from "../types/feedback";

class PreFeedBack {

  static success(description: string, title?: string): FeedBackStatusInterface {
    return {
      title: title || 'Sucesso!',
      description,
      status: STATUS.SUCCESS

    }
  }

  static error(description: string, title?: string): FeedBackStatusInterface {
    return {
      title: title || 'ERRO!',
      description,
      status: STATUS.ERROR,
    }
  }

}

export default PreFeedBack;