import { MonsterModel } from "./MonsterModel";

export interface MonsterFilterResponseModel extends MonsterModel {

  monstersQtd: number;
	bookName: string;
	biomeName: string;
	monsterTypeName: string;
}
