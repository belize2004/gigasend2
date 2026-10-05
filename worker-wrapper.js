export { default } from "./dist/_worker.js/index.js";
export * from "./dist/_worker.js/index.js";

export class WalletBalanceCoordinator {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }
}
