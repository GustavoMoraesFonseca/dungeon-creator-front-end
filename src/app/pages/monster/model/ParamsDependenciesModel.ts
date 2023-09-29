import { BiomeModel } from "./BiomeModel";
import { BookModel } from "./BookModel";
import { MonsterModel } from "./MonsterModel";
import { MonsterTypeModel } from "./MonsterTypeModel";

export interface ParamsDependenciesModel {
  monster: MonsterModel;
  biomes: BiomeModel[];
  books: BookModel[];
  monsterTypes: MonsterTypeModel[];
}
