import { IuserInfo } from './../../core/interfaces/IuserInfo.interface';
import { CookieService } from 'ngx-cookie-service';
import { Component, ElementRef, HostListener, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { catchError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild("dropdownMenu") dropdownMenu: ElementRef<HTMLElement> | undefined
  @ViewChild("openMenu") openMenu: ElementRef<HTMLElement> | undefined
  @Input() name!: string;
  @Input() email!: string;

  private clickListener: () => void;
  private isMenuOpen = false;
  public viewSize: number = 0;
  public path: string = "";

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router,
    private render: Renderer2
  ) {
    this.clickListener = this.render.listen('document', 'click', (event: MouseEvent) => {
      this.closeMenu(event);
    });
  }

  ngOnInit(): void {
    this.viewSize = window.innerWidth;
    this.path = this.router.url;
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event) {
    const windowtarget = event.target as Window

    this.viewSize = windowtarget.innerWidth;
  }

  private closeMenu(event: Event) {
    if (this.isMenuOpen === true && event.target != this.openMenu?.nativeElement && event.target != this.dropdownMenu?.nativeElement) {
      console.log("close");
      this.dropdownMenu!.nativeElement.style.display="none";
    }
  }

  public dropdown() {
    this.dropdownMenu!.nativeElement.style.display="block";
    this.isMenuOpen = true;
  }


  public logout() {
    this.cookieService.deleteAll();
    localStorage.clear();

    this.router.navigate(["/login"]);
  }
}
