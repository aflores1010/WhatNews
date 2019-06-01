import { Component } from '@angular/core';
import { LocalDataService } from 'src/app/services/local-data.service';
import { Article } from 'src/app/interfaces/interfaces';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  favoritesNews: Article[] = [];

  constructor(private localDataService: LocalDataService,
              private events: Events) {
              this.events.subscribe('reloadFavorites',() => {
                this.loadFavorites();
              });
  }

  ngOnInit() {
    console.log('On Init');
  }

  ionViewDidEnter() {
    this.loadFavorites();
  }

  async loadFavorites() {
    // this.localDataService.loadFavorites().then( resp => {
    //   console.log(resp);
    //   this.favoritesNews = resp;
    // });
    this.favoritesNews = await this.localDataService.loadFavorites();
  }

}
