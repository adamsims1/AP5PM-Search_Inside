import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.scss'],
})
export class WeatherModalComponent {
  selectedItemsData: { data?: any } = {};
  showOverlay = true;

  constructor(private modalCTRL: ModalController, private http: HttpClient) {
    this.getItems();
  }

  async getItems() {
    const storedItems = await Preferences.get({ key: 'jsonData' });

    if (storedItems.value) {
      const selectedItems = JSON.parse(storedItems.value);
    }
  }

  dismissModal() {
    this.modalCTRL.dismiss(null, 'cancel');
    this.showOverlay = false;
  }

  async submit() {
    const fetchDataFromApi = async () => {
      const item_id = 'designevaluation25clin';
      const hostname = 'ia800204.us.archive.org';
      const doc = item_id;
      const path = '/27/items/' + item_id;
      const searchPhrase = '"library science"';
      const url = `https://${hostname}/fulltext/inside.php?item_id=${item_id}&doc=${doc}&path=${path}&q=${encodeURIComponent(searchPhrase)}`;

      const data = await this.http.jsonp(url, 'callback').toPromise();
      return { data };
    };

    this.selectedItemsData = await fetchDataFromApi();
  }

  // Replace this with your actual method or action when an item is clicked
  handleItemClick(item: any) {
    console.log('Item Clicked:', item);
  }
}