import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export abstract class SandboxBase implements OnDestroy {

  public subscriptions: Subscription[] = [];

  protected constructor() {
  }

  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(
        subscription => {
          subscription.unsubscribe();
          subscription = null;
        }
      );
    }
  }
}

