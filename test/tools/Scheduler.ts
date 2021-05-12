export class Scheduler {
  private timer: any = null;

  get isRunning() {
    return Boolean(this.timer);
  }

  constructor(private readonly milliseconds: number, private readonly action: () => void) {}

  start() {
    if (this.isRunning) {
      return;
    }

    this.timer = setTimeout(() => this.run(), this.milliseconds);
  }

  stop() {
    if (!this.isRunning) {
      return;
    }

    clearTimeout(this.timer);
    this.timer = null;
  }

  restart() {
    this.stop();
    this.start();
  }

  run() {
    this.stop();
    this.action();
  }
}
