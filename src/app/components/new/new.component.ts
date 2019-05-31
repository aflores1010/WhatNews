import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() new: Article;
  @Input() index: number;

  constructor(private inAppBroser: InAppBrowser,
              private socialSharing: SocialSharing,
             public actionSheetController: ActionSheetController) { }

  ngOnInit() {}

  goToLink() {
    this.inAppBroser.create(this.new.url, '_system');
  }

  async showActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        cssClass: 'action-dark-button',
        text: 'Share',
        icon: 'share',
        handler: () => {
          this.share();
        }
      }, {
        cssClass: 'action-dark-button',
        text: 'Save as favorite',
        icon: 'star',
        handler: () => {
          console.log('Play clicked');
        }
      }]
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

}
