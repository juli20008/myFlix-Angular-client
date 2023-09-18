import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

type User = { _id?: string, username?: string, password?: string, Email?: string, FavoriteMovies?: [] }

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User = {};

  @Input() userData = { username: '', password: '', Email: '' };
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    const user = this.getUser();

    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;
    this.userData = {
      username: user.username || "",
      Email: user.Email || "",
      password: ""
    }
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response))
      this.user = response;
      this.snackBar.open('user updated!', 'OK', {
        duration: 2000
      })
    })
  }
}