import IBaseItem from './BaseItem';

export default class Player implements IBaseItem {
  static count = 0;

  id: number;
  name: string;
  colorClass: string;
  order: number;

  constructor(dto: Partial<Omit<Player, 'id'>> = {}) {
    this.id = ++Player.count;
    this.name = dto.name ?? `Player ${this.id}`;
    this.colorClass = dto.colorClass ?? '';
    this.order = this.id;
  }
}
