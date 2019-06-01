import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Events } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() new: Article;
  @Input() index: number;
  @Input() isFromFavorite;
  favoriteText = '';

  constructor(private inAppBroser: InAppBrowser,
              private socialSharing: SocialSharing,
              public actionSheetController: ActionSheetController,
              private events: Events,
              private localDataService: LocalDataService) { }

  ngOnInit() {
    console.log('isFromFavorite', this.isFromFavorite);
  }

  goToLink() {
    this.inAppBroser.create(this.new.url, '_system');
  }

  async showActionSheet() {

    let saveDeleteButton;
    if(!this.isFromFavorite){
      saveDeleteButton = {
        cssClass: 'action-dark-button',
        text: 'Save favorite',
        icon: 'star',
        handler: () => {
          this.save();
        }
      };
    } else {
      saveDeleteButton = {
        cssClass: 'action-dark-button',
        text: 'Delete favorite',
        icon: 'trash',
        handler: () => {
          this.localDataService.deleteFavorite(this.new);
          this.events.publish('reloadFavorites');
        }
      };
    }
    

    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        cssClass: 'action-dark-button',
        text: 'Share',
        icon: 'share',
        handler: () => {
          this.share();
        }
      }, 
      saveDeleteButton
    ]
    });
    await actionSheet.present();
  }

  share() {
    console.log('sharing');
    this.socialSharing.share(
      this.new.title,
      this.new.source.name,
      '',
      this.new.url
    );
  }

  save() {
    this.localDataService.saveFavorite(this.new);
  }

}
