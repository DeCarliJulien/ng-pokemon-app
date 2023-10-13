import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]' //! Crochets [] pour une directive, sinon c'est un composant
})
export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultHeight: number = 180;

  constructor(private el: ElementRef) { 
    this.setHeight(this.defaultHeight);
    this.setBorder('#f5f5f5');
  }

  @Input('pkmnBorderCard') borderColor!: string; // alias
  // @Input() pkmnBorderCard!: string; // sans alias


  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor || '#f5f5f5');
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
  }

  private setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }
}
