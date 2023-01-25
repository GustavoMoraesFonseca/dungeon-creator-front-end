import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'monsterLevel'})
export class MonsterLevelPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0.12:
        return '1/8';
      case 0.25:
        return '1/4';
      case 0.5:
        return '1/2';
    }
    return value.toString();
  }
}
