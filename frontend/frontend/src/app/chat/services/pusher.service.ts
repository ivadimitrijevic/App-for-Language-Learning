import { Injectable } from '@angular/core';

import Pusher from 'pusher-js';

/**
 * Pusher service
 */
@Injectable({
  providedIn: 'root',
})
export class PusherService {
  /**
   * Pusher
   * @type { Pusher }
   * @private
   */
  private pusher: Pusher;

  /**
   * Constructor of pusher service
   */
  constructor() {
    this.pusher = new Pusher('d1b4591513c59b1ae3b8', {
      cluster: 'eu',
    });
  }

  /**
   * Method for subscribing
   * @param { string } channelName
   */
  subscribeToChannel(channelName: string) {
    return this.pusher.subscribe(channelName);
  }

  /**
   * Method for unsubscribing
   * @param { string } channelName
   */
  unsubscribeFromChannel(channelName: string) {
    this.pusher.unsubscribe(channelName);
  }
}
