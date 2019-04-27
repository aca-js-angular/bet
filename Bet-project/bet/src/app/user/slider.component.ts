import { NgImageSliderComponent } from 'ng-image-slider';
import { Component, ViewChild,  } from '@angular/core';
 
@Component({
    selector: 'slider',
        template:`
         <ng-image-slider [images]="imageObject" [imageSize]="{ width: 1366 ,height: 400}" [infinite]=true [autoSlide]=2 #nav>
        </ng-image-slider> `,
        styles: ['#nav { margin-left: 0;width: 100% }']
})
export class Slider {
    @ViewChild('nav') slider: NgImageSliderComponent;
    imageObject: Array<object> = [{
        thumbImage: 'assets/img/slider/slider-img@2x.png',
    }, {
        thumbImage: 'assets/img/slider/basketball-436088_960_720.png'
    }, {
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