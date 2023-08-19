
// ngrx tutorials
// https://blog.bitsrc.io/how-i-have-set-up-ngrx-in-angular-16-with-standalone-components-163499804fbb

// Barrel imports
// https://blog.bitsrc.io/how-ive-cleaned-up-my-application-with-barrel-exports-and-path-aliases-in-angular-16-27a216f46e29

import { RackState } from './rack/rack.state';

export interface AppState {
  rack?: RackState;
}