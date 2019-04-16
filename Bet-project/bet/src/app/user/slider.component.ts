import { NgImageSliderComponent } from 'ng-image-slider';
import { Component, ViewChild,  } from '@angular/core';
 
@Component({
    selector: 'slider',
        template:`
         <ng-image-slider [images]="imageObject" [imageSize]="{ width: 1920 ,height: 400}" #nav>
        </ng-image-slider> `,
        styles: ['#nav { margin-left: 0;width: 100% }']
})
export class Slider {
    @ViewChild('nav') slider: NgImageSliderComponent;
    imageObject: Array<object> = [{
        thumbImage: 'assets/img/slider/2_min.jpg'
    }, {
        thumbImage: 'assets/img/slider/10.jpg'
    }, {
        thumbImage: 'assets/img/slider/2.jpg'
    }, {
        thumbImage: 'assets/img/slider/3_min.jpg'
    },
];
    prevImageClick() {
        this.slider.prev();
    }
    
    nextImageClick() {
        this.slider.next();
    }
}