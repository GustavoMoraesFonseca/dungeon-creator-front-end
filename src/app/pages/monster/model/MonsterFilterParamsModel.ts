export interface MonsterFilterRequestModel {

  isRandomMonster: boolean;
  level: number;
	bookId: number;
	biomeId: number;
	monsterTypeId: number;
	playersLevel: number;
	region: 'south'|'north'|'center'|'west'|'east';
}
