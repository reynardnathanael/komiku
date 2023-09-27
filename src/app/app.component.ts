import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UserService } from './user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user_id = "";
  user_name = "";
  login_user = "";
  login_passwd = "";
  login_error = "";
  avatar = "";
  currentRoute = "";

  constructor(private storage: Storage, public us: UserService, private router: Router) { }

  async ngOnInit() {
    await this.storage.create();
    this.user_id = await this.storage.get("user_id");
    this.user_name = await this.storage.get("user_name");
    this.avatar = await this.storage.get("avatar");
    this.currentRoute = document.URL.substring(document.URL.lastIndexOf('/') + 1);
  }

  login() {
    this.us.checkLogin(this.login_user, this.login_passwd).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.user_id = data['user_id'];
          this.user_name = data['user_name']
          this.avatar = data['avatar']
          this.storage.set('user_id', this.user_id);
          this.storage.set('user_name', this.user_name);
          this.storage.set('avatar', this.avatar);
        }
        else {
          this.login_error = "username atau password salah";
        }
      }
    );
  }

  logout() {
    this.storage.remove("user_id");
    this.storage.remove("user_name");
    this.storage.remove("avatar");
    window.location.href = "/";
  }
}
