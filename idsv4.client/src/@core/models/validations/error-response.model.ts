import { ModelBase } from '../model.base';
import { ErrorInfoModel } from './error-info.model';

export class ErrorResponseModel extends ModelBase {

  public constructor(
    public errors: ErrorInfoModel[]
  ) {
    super();
  }

}
