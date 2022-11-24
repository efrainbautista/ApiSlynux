import { AppNotification } from "src/shared/application/app.notification";
import { Result } from "typescript-result";

export class CorreoPerson {
  private readonly value: string;
  private static MAX_LENGTH: number = 15;

  private constructor(value: string) {
    this.value = value;
  }

  public getCorreo(): string {
    return this.value;
  }

  public static create(value: string): CorreoPerson
  {
    value = (value ?? "").trim();
    return new CorreoPerson(value);
  }

  public static createResult(value: string): Result<AppNotification, CorreoPerson>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('Se requiere de un correo electronico', null);
    }
    /*if (value.length != this.MAX_LENGTH) {
      notification.addError('El campo dni debe tener ' + Correo.MAX_LENGTH + ' caracteres', null);
    }*/
    const regExp = new RegExp('/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i');
    if (regExp.test(value) === false) {
      notification.addError('El formato del correo no es valido', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new CorreoPerson(value));
  }
}