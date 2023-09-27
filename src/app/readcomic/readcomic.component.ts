import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { ComicService } from '../comic.service';
import { Storage } from '@ionic/storage-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-readcomic',
  templateUrl: './readcomic.component.html',
  styleUrls: ['./readcomic.component.scss'],
})
export class ReadcomicComponent implements OnInit {

  readComic() {
    this.cs.comicContents(this.route.snapshot.params['id']).subscribe(
      (data) => {
        this.contents = data;
      }
    );
  }

  listComment() {
    this.cs.comicComments(this.route.snapshot.params['id']).subscribe(
      (data) => {
        this.comments = data;
      }
    );
  }

  listReply() {
    this.cs.comicReplies(this.route.snapshot.params['id']).subscribe(
      (data) => {
        this.replies = data;
      }
    );
  }

  async addComment() {
    this.cs.comicAddComment(await this.storage.get('user_id'), this.route.snapshot.params['id'], this.commentValue, this.parent_id).subscribe(
    (data) => {
      alert(data['pesan']);
      window.location.reload();
    });
  }

  async ratingCondition() {
    this.cs.comicCheckRating(await this.storage.get('user_id'), this.route.snapshot.params['id']).subscribe(
      (data) => {
        if(data['pesan'] == 'sudah') {
          this.rated = 1;
        }
      }
    );
  }

  async addRating() {
    this.cs.comicAddRating(await this.storage.get('user_id'), this.route.snapshot.params['id'], this.rating).subscribe(
      (data) => {
        alert(data['pesan']);
        window.location.reload();
      }
    );
  }

  async checkFavorite() {
    this.cs.comicCheckFavorite(await this.storage.get('user_id'), this.route.snapshot.params['id']).subscribe(
      (data) => {
        if(data['pesan'] == 'sudah') {
          this.favorited = 1;
        }
      }
    );
  }

  async addFavorite() {
    this.cs.comicAddFavorite(await this.storage.get('user_id'), this.route.snapshot.params['id']).subscribe(
      (data) => {
        alert(data['pesan']);
        window.location.reload();
      }
    );
  }

  async deleteFavorite() {
    this.cs.comicRemoveFavorite(await this.storage.get('user_id'), this.route.snapshot.params['id']).subscribe(
      (data) => {
        alert(data['pesan']);
        window.location.reload();
      }
    );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Delete',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.deleteFavorite();
          },
        },
      ],
    });

    await alert.present();
  }

  contents:any = [];
  comments:any = [];
  replies:any = [];
  target:string = "";
  commentValue:string = "";
  parent_id:number = 0;
  rated:number = 0;
  favorited:number = 0;
  rating: number = 0;

  constructor(public cs: ComicService, public route:ActivatedRoute, private storage: Storage, private alertController: AlertController) { }

  ngOnInit() {
    this.readComic();
    this.listComment();
    this.listReply();
    this.ratingCondition();
    this.checkFavorite();
  }
}
