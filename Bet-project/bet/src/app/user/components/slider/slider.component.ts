import { Component, ViewChild,  } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class Slider {
  
  @ViewChild('nav') slider: NgImageSliderComponent;

  imageObject: Array<object> = [
    {
      thumbImage: 'assets/img/slider/slider-img@2x.png',
    }, 
    {
      thumbImage: 'assets/img/slider/basketball-436088_960_720.png'
    }, 
    {
      thumbImage: 'assets/img/slider/slider-img@2x1.png'
    },
];
  prevImageClick() {
      this.slider.prev();
  }
  
  nextImageClick() {
      this.slider.next();
  }
}
