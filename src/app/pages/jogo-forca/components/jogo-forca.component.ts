import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jogo-forca',
  templateUrl: './jogo-forca.component.html',
  styleUrls: ['./jogo-forca.component.css']
})
export class JogoForcaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.phrase.forEach(word => {
      this.hidenPhrase.push(word.replace(/[A-Z]/gi, '_'));
    })
  }

  alphabet: string[] = Array.from(
    Array(26)
  ).map(
    (e, i) => i + 65
  ).map(
    (x) => String.fromCharCode(x)
  );

  chooseLetter(letter: string) {
    this.removeFromChooseLetters(letter);

    if (!this.allPhrase.includes(letter)) {
      console.log('Errou: ', letter)

      this.lettersNotExistsInPhrase.push(letter)

      console.log(this.lettersNotExistsInPhrase)
    }

    for (let i = 0; i < this.phrase.length; i++) {
      const word = this.phrase[i];
      if (word.match(letter)) {
        for (let j = 0; j < this.countCharInStr(word, letter); j++) {
          this.hidenPhrase[i] = this.replaceForIndex(this.hidenPhrase[i], letter, word, j);
        }
      }
    }
  }

  countCharInStr(str: string, char: string): number {
    return (str.match(new RegExp(char, "g")) || []).length;
  }

  replaceForIndex(str: string, replaceValue: string, word: string, position: number): string {
    var index: number = word.indexOf(replaceValue, position);
    index = this.trashRulesButNecessaryForRepeatLetters(str, replaceValue, word, index);
    return this.trashRulesButNecessaryForAccentuation(str, replaceValue, word, index);
  }

  trashRulesButNecessaryForAccentuation(str: string, replaceValue: string, word: string, index: number) {
    if(word == 'EXEQUIVEL' && replaceValue == 'I')
      return str.substring(0, 5)+'Í'+str.substring(6);
    if(word == 'E')
      return 'É';
    return str.substring(0, index)+replaceValue+str.substring(index+1);
  }

  trashRulesButNecessaryForRepeatLetters(str: string, replaceValue: string, word: string, index: number): number {
    if(word == 'NESSA' && replaceValue == 'S' && str.includes('S', 2))
      return 3;

    if(word == 'PARAGEM' && replaceValue == 'A' && str.includes('A', 1))
      return 3;

    if(word == 'EXEQUIVEL' && replaceValue == 'E' && str.includes('E', 2))
      return 7;

    if(word == 'LOGRAR' && replaceValue == 'R' && str.includes('R', 3))
      return 5;

    if(word == 'TRIVIALMENTE' && replaceValue == 'I' && str.includes('I', 2))
      return 4;

    if(word == 'TRIVIALMENTE' && replaceValue == 'E' && str.includes('E', 8))
      return 11;

    return index;
  }

  removeFromChooseLetters(letter: string) {
    this.alphabet.splice(this.alphabet.indexOf(letter), 1);
  }

  allPhrase: string = 'TUDO EM QUE SE VISLUMBRA NESSA PARAGEM E EXEQUIVEL LOGRAR DE UM PSEUDO AXIOMA DE SUAS EQUIPAGENS EM QUE SE BISPA TRIVIALMENTE';
  phrase: string[] = this.allPhrase.split(' ');
  hidenPhrase: string[] = [];
  lettersNotExistsInPhrase: string[] = [];
}
