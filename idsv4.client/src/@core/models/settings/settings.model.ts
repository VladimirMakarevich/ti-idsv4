import { ModelBase } from '../model.base';

export class SettingsModel extends ModelBase {
  public siteTitle: string;
  public version: string;
  public defaultAppUrl: string;
  public cdnUrl: string;
}
