import { Planet } from 'src/app/planets/entities/planet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('characters')
export class Character {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  race: string;

  @Column({ nullable: false })
  affiliation: string;

  @ManyToOne(() => Planet, (planet) => planet.characters, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  homePlanet: Planet;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;
}
