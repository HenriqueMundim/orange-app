import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild("dropdownMenu") dropdownMenu: ElementRef<HTMLElement> | undefined
  @ViewChild("openMenu") openMenu: ElementRef<HTMLElement> | undefined

  private isMenuOpen = false;
  public viewSize: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.viewSize = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event) {
    const windowtarget = event.target as Window

    this.viewSize = windowtarget.innerWidth;
  }

  @HostListener('click', ['$event'])
  private closeMenu(event: Event) {
    if (this.isMenuOpen == true && event.target != this.openMenu?.nativeElement) {
      this.dropdownMenu!.nativeElement.style.display="none";
    }
  }

  public dropdown() {
    this.dropdownMenu!.nativeElement.style.display="block";
    this.isMenuOpen = true;
  }

}
