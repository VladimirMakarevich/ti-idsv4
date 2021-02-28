export class HomeRouter {
  private static home = 'home';

  public static homeUrl(): Array<any> {
    return [
      '/',
      HomeRouter.home
    ]
  }

}
