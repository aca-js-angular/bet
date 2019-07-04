import { Directive, HostListener, Renderer } from '@angular/core';
import { GameDetailsService } from '../services/game-details.service';

@Directive({
  selector: '[appSelectedOdd]'
})
export class SelectedOddDirective {

  constructor(private renderer:Renderer, private gameDetails: GameDetailsService) { }

  selectedElem: EventTarget;

  @HostListener('click', ['$event']) onclick() {
    if(event.target['className'] === "overX") {
      this.gameDetails.selectedBet = event.target;
      this.gameDetails.selectedOdd = +event.target['lastElementChild'].textContent;
      this.gameDetails.selectedTeam = event.target['lastElementChild'].getAttribute('name');
      this.highLight(event.target, '#5DB057');
    } else if( event.target['parentElement']['className'] === "overX") {
      this.gameDetails.selectedBet = event.target['parentElement'];
      if(event.target['className'] === 'odd') {
        this.gameDetails.selectedOdd = +event.target['textContent'];
        this.gameDetails.selectedTeam = event.target['getAttribute']('name');
      } else {
        this.gameDetails.selectedOdd = +event.target['nextElementSibling'].textContent;
        this.gameDetails.selectedTeam = event.target['nextElementSibling'].getAttribute('name');
      }
      this.highLight(event.target['parentElement'], '#5DB057');
    }
  }

  highLight(el: EventTarget, color) {
      if(this.selectedElem) {
        this.renderer.setElementStyle(this.selectedElem, 'backgroundColor', '#7A7B9B');
      }
      this.selectedElem = el;
      this.renderer.setElementStyle(this.selectedElem, 'backgroundColor', color);
  }

}
