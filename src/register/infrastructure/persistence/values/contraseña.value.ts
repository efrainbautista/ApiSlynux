import { Column} from 'typeorm';

export class ContraseñaValue {
  @Column('varchar', { name: 'contraseña', length: 15, nullable: true })
  contraseña: string;

  private constructor(contraseña: string) {
    this.contraseña = contraseña;
  }

  public static from(contraseña: string): ContraseñaValue {
    return new ContraseñaValue(contraseña);
  }
}