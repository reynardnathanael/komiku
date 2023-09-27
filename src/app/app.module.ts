import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { NgxStarRatingModule } from 'ngx-star-rating';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { UserService } from './user.service';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';
import { ComicComponent } from './comic/comic.component';
import { ComicService } from './comic.service';
import { ReadcomicComponent } from './readcomic/readcomic.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { SearchComponent } from './search/search.component';
import { CategoryComponent } from './category/category.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const appRoutes: Routes = [
  {path: 'comic', component: ComicComponent},
  {path: 'readcomic/:id', component: ReadcomicComponent},
  {path: 'favorite', component: FavoriteComponent},
  {path: 'search', component: SearchComponent},
  {path: 'category', component: CategoryComponent}
]

@NgModule({
  declarations: [AppComponent, ComicComponent, ReadcomicComponent, FavoriteComponent, SearchComponent, CategoryComponent],
  imports: [IonicStorageModule.forRoot(), HttpClientModule, RouterModule.forRoot(appRoutes), FormsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, SwiperModule, NgxStarRatingModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [UserService, ComicService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
