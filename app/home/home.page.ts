import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { WeatherModalComponent } from './weather-modal/weather-modal.component';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { BookDetailsPage } from './book-details/book-details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  countriesDataArray: any[] = [];
  startYear: number;
  endYear: number;
  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(
    public modalCTRL: ModalController,
    public http: HttpClient,
    private router: Router,
    private modalController: ModalController
  ) {
    this.startYear = 1900;
    this.endYear = 2000;
    
  }

  async openModal() {
    const modal = await this.modalCTRL.create({
      component: WeatherModalComponent,
      componentProps: {
        title: 'Modal Title',
        content: 'Modal Content',
      },
    });

    await modal.present();
  }

  async openModalDetails(work: any) {
    const key = work.key;
    const url = `http://openlibrary.org/works/${key}.json`;

    this.http.get(url).subscribe(async (data: any) => {
      const modal = await this.modalCTRL.create({
        component: WeatherModalComponent,
        componentProps: {
          title: work.title,
          details: data,
        },
      });

      await modal.present();
    });
  }
  searchBooks() {
    if (this.searchTerm.trim() !== '') {
      const apiUrl = `http://openlibrary.org/search.json?q=${encodeURIComponent(this.searchTerm)}`;

      this.http.get(apiUrl).subscribe((data: any) => {
        this.searchResults = data.docs;
      });
    } else {
      this.searchResults = [];
    }
  }

  async openBookDetails(book: any) {
    const modal = await this.modalController.create({
      component: BookDetailsPage,
      componentProps: {
        bookData: book,
      },
    });
    await modal.present();
  }
}




