import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsLoaderService {
  private apiLoaded = false;

  constructor() {}

  loadGoogleMaps(apiKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.apiLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${'AIzaSyCKmTCvOcyjC-5uGe3Ml-zluIqBivkya8o'}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.apiLoaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Failed to load Google Maps API'));
      };

      document.body.appendChild(script);
    });
  }
}
