import { Column } from 'typeorm';

export class DniValue {
  @Column('varchar', { name: 'dni', length: 8, nullable: true })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): DniValue {
    return new DniValue(value);
  }
}