import {Component, Injectable, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ListKeyManagerOption} from "@angular/cdk/a11y";
import {MatCarouselSlide} from "./carousel-slide";
import {
  DomSanitizer,
  SafeStyle
} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'ngx-carousel-slide',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './carousel-slide.component.html',
  styleUrl: './carousel-slide.component.scss'
})
export class CarouselSlideComponent implements ListKeyManagerOption, MatCarouselSlide, OnInit {
  @Input({required: true}) public image!: SafeStyle;
  @Input() public overlayColor = '#00000040';
  @Input() public hideOverlay = false;
  @Input() public ariaLabel = '';
  @Input() public disabled = false; // implements ListKeyManagerOption
  @Input() public load = false;

  @ViewChild(TemplateRef, {static: true}) public templateRef?: TemplateRef<any>;

  constructor(public sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    if (this.image) {
      this.image = this.sanitizer.bypassSecurityTrustStyle(`url("${this.image}")`);
    }
  }
}
