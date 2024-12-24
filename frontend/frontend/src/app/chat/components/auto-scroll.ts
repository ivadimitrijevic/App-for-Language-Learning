import { Directive, ElementRef, Input, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[autoScroll]',
  standalone: true
})
export class AutoScrollDirective implements AfterViewChecked {
  @Input() items: any[] = [];
  constructor(private el: ElementRef) {}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const element = this.el.nativeElement;
    element.scrollTop = element.scrollHeight;
  }
}
