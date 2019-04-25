import { Directive, HostListener, Renderer } from '@angular/core';
import { GameDetailsService } from '../../services/game-details.service';

@Directive({
  selector: '[appSelectedOdd]'
})
export class SelectedOddDirective {

  constructor(private renderer:Renderer, private gameDetails: GameDetailsService) { }

  selectedElem: EventTarget;

  @HostListener('click', ['$event']) onclick() {
    if(event.target['className'] === "overX" || event.target['className'] === "teams_draw") {
      this.gameDetails.selectedBet = event.target;
      this.highLight(event.target, '#5DB057');
    } else if( event.target['parentElement']['className'] === "overX" || event.target['parentElement']['className'] === "teams_draw") {
      this.gameDetails.selectedBet = event.target;['parentElement'];
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
