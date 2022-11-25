import { Column} from 'typeorm';

export class CorreoValue {
  @Column('varchar', { name: 'correo', length: 15, nullable: true })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): CorreoValue {
    return new CorreoValue(value);
  }
}