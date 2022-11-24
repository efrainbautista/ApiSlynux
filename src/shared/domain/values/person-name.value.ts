import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';


export class PersonName {
  private readonly firstName: string;
  private readonly lastName: string;
  private static MAX_LENGTH: number = 15;

  private constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public static create(firstName: string, lastName: string): PersonName {
    firstName = (firstName ?? "").trim();
    lastName = (lastName ?? "").trim();
    return new PersonName(firstName, lastName);
  }

  public static createv2(firstName: string, lastName: string): Result<AppNotification, PersonName> {
    let notification: AppNotification = new AppNotification();
    firstName = (firstName ?? "").trim();
    lastName = (lastName ?? "").trim();
    if (firstName === "") {
      notification.addError('Inserte un nombre', null);
    }
    if (lastName === "") {
      notification.addError('Inserte un apellido', null);
    }
    if (firstName.length > this.MAX_LENGTH) {
      notification.addError('La longitud máxima de un firstName es' + this.MAX_LENGTH + ' es de caracteres, incluidos los espacios', null);
    }
    if (lastName.length > this.MAX_LENGTH) {
      notification.addError('La longitud máxima de un firstName es' + this.MAX_LENGTH + ' es de caracteres, incluidos los espacios', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new PersonName(firstName, lastName));
  }
}