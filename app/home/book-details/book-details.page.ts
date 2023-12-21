import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage {
  @Input() bookData: any;
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
  searchInsideBook() {
    // Implement the logic to search inside the book using the API
    // Make API calls and update the searchResults array accordingly
    // Example: this.searchResults = yourSearchResultsFromAPI;
  }

  openExternalLink() {
    if (this.bookData && this.bookData.key) {
      const workKey = this.bookData.key.replace('/works/', ''); // Remove '/works/' prefix
      const editionKey = this.bookData.edition_key;
      
      const openLibraryLink = `https://openlibrary.org/works/${workKey}?edition=key%A${editionKey}`;
      window.open(openLibraryLink, '_blank');
    }
  }

  getCoverImageUrl(cover_i: string): string {
    // Construct the URL for the book cover image
    if (cover_i) {
      return `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`;
    }
    return 'placeholder-image.jpg'; // Replace with the path to a placeholder image
  }
}