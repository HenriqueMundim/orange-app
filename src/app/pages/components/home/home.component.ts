import { catchError, EMPTY } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { IuserInfo } from 'src/app/core/interfaces/IuserInfo.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private token: string | null = "";
  public userInfo: IuserInfo | undefined;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("token") != null) {
      this.token = localStorage.getItem("token");
    }

    this.getUserInfo()
  }


  private getUserInfo() {
    this.userService.getInfo(this.token).pipe(
      catchError(err => {
          console.log(err)
          return EMPTY;
      })
    )
    .subscribe({
      next: respose => this.userInfo = respose
    })
  }

}
