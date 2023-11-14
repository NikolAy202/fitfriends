import { RequestStatus } from "./request-status.enum";
import { RequestType } from "./request-type.interface";


export interface RequestTraining {
  _id?: string;
  authorId: string;
  userId: string;
  status: RequestStatus;
  type: RequestType;
  dateUpd?: Date;
}
