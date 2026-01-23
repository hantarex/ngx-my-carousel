import {Directive, ElementRef, HostListener, input, output} from '@angular/core';

@Directive({
  selector: '[appSwipe]',
  standalone: true,
})
export class SwipeDirective {
  public minSwipeDistance = input(30);
  public isDebug = input(false);
  public swipeLeft = output<number>();
  public swipeRight = output<number>();
  public swipeUp = output<number>();
  public swipeDown = output<number>();
  public onMove = output<{x: number, y: number}>();

  private touchStartX = 0;
  private touchStartY = 0;
  private touchEndX = 0;
  private touchEndY = 0;

  constructor(private el: ElementRef) {
    console.log('init swipe')
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if(this.isDebug()) {
      console.log('onTouchStart')
    }
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if(this.isDebug()) {
      console.log('onTouchEnd')
    }
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;
    this.handleSwipe();
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;
    this.handleMove();
  }

  private handleMove(): void {
    if(this.isDebug()) {
      console.log('handleMove')
    }
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    this.onMove.emit({x: deltaX, y: deltaY});
  }

  private handleSwipe() {
    if(this.isDebug()) {
      console.log('handleSwipe')
    }
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (absDeltaX < this.minSwipeDistance() && absDeltaY < this.minSwipeDistance()) {
      if(this.isDebug()) {
        console.log('minSwipeDistance skip', absDeltaX, this.minSwipeDistance(), absDeltaY, this.minSwipeDistance())
      }
      return;
    }

    if (absDeltaX > absDeltaY) {
      if (deltaX > 0) {
        if(this.isDebug()) {
          console.log('emit swipeRight', deltaX)
        }
        this.swipeRight.emit(deltaX);
      } else {
        if(this.isDebug()) {
          console.log('emit swipeLeft', deltaX)
        }
        this.swipeLeft.emit(deltaX);
      }
    } else {
      if (deltaY > 0) {
        if(this.isDebug()) {
          console.log('emit swipeDown', deltaY)
        }
        this.swipeDown.emit(deltaY);
      } else {
        if(this.isDebug()) {
          console.log('emit swipeUp', deltaY)
        }
        this.swipeUp.emit(deltaY);
      }
    }
  }
}
