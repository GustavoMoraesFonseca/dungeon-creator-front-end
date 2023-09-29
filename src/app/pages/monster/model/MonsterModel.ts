export interface MonsterModel {
  id: number;
  name: string;
  level: number;
  page: number;
  biomeId: number;
  bookId: number;
  monsterTypeId: number;
  existsSouth: boolean;
  existsNorth: boolean;
  existsCenter: boolean;
  existsWest: boolean;
  existsEast: boolean;
}
