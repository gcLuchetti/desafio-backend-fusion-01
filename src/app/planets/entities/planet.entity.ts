import { Character } from 'src/app/character/entities/character.entity';
import { StarSystem } from 'src/app/star-systems/entities/star-system.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('planets')
export class Planet {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  climate: string;

  @Column({ nullable: false })
  terrain: string;

  @Column({ nullable: false })
  population: number;

  @ManyToOne(() => StarSystem, (starSystem) => starSystem.planets, {
    nullable: true, onDelete: 'SET NULL'
  })
  starSystem: StarSystem;

  @OneToMany(() => Character, (character) => character.homePlanet, {
    nullable: true,
  })
  characters: Character[];

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;

  @BeforeInsert()
  nameCapitalize() {
    const splitStr: Array<string> = this.name.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++)
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);

    this.name = splitStr.join(' ');
  }
}
