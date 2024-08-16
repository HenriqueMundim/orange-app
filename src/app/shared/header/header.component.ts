import { IuserInfo } from './../../core/interfaces/IuserInfo.interface';
import { CookieService } from 'ngx-cookie-service';
import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
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

    if(this.cookieService.get("token") != null) {
      this.getGoogleUserInfo(this.cookieService.get("token"));
    }
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event) {
    const windowtarget = event.target as Window

    this.viewSize = windowtarget.innerWidth;
  }

  private closeMenu(event: Event) {
    if (this.isMenuOpen === true && event.target != this.openMenu?.nativeElement) {
      this.dropdownMenu!.nativeElement.style.display="none";
    }
  }

  public dropdown() {
    this.dropdownMenu!.nativeElement.style.display="block";
    this.isMenuOpen = true;
  }

  private getGoogleUserInfo(token: String) {
    this.userService.getInfo(token).pipe(
      catchError(err => {
          this.router.navigate(["/login"])
          return EMPTY;
      })
    )
    .subscribe({
      next: (respose: IuserInfo) => {
        this.name = respose.name + " " + respose.lastName;
        this.email = respose.email;
      }
    })
  }

  public logout() {
    this.cookieService.deleteAll();
    localStorage.clear();

    this.router.navigate(["/login"]);
  }
}
