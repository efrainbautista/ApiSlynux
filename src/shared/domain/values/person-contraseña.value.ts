
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';


export class PersonContraseña {
  private readonly contraseña: string;
  private static MAX_LENGTH: number = 13;

  private constructor(_contraseña: string) {
    this.contraseña = _contraseña;
  }

  public getContraseña(): string {
    return this.contraseña;
  }


  public static create(_contraseña: string): PersonContraseña {
    _contraseña = (_contraseña ?? "").trim();
    return new PersonContraseña(_contraseña);
  }

  public static createv2(_contraseña: string): Result<AppNotification, PersonContraseña> {
    let notification: AppNotification = new AppNotification();
    _contraseña = (_contraseña ?? "").trim();

    if (_contraseña === "") {
      notification.addError('Inserte una contraseña', null);
    }
    
    if (_contraseña.length > this.MAX_LENGTH) {
      notification.addError('La longitud máxima de la contraseña es' + this.MAX_LENGTH + ' es de caracteres, incluidos los espacios', null);
    }
    
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new PersonContraseña(_contraseña));
  }
}