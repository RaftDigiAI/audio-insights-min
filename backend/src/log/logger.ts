export class Logger {
  public static Info(message: string, args?: Record<string, any>) {
    console.info(message, args ?? "");
  }

  public static Error(message: string, args?: Record<string, any>) {
    console.error(message, args ?? "");
  }

  public static Warn(message: string, args?: Record<string, any>) {
    console.warn(message, args ?? "");
  }
}
