import { AppNotification } from "src/shared/application/app.notification";
import { Result } from "typescript-result";

export class Dni {
  private readonly value: string;
  private static MAX_LENGTH: number = 8;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Dni
  {
    value = (value ?? "").trim();
    return new Dni(value);
  }

  public static createResult(value: string): Result<AppNotification, Dni>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('Se requiere de un DNI', null);
    }
    if (value.length != this.MAX_LENGTH) {
      notification.addError('El campo dni debe tener ' + Dni.MAX_LENGTH + ' caracteres', null);
    }
    const regExp = new RegExp('^[0-9]+$');
    if (regExp.test(value) === false) {
      notification.addError('El formato dni no es válido', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Dni(value));
  }
}