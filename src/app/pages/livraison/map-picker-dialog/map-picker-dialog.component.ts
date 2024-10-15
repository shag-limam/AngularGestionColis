// import { Component, AfterViewInit, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// declare var google: any;

// @Component({
//   selector: 'app-map-picker-dialog',
//   templateUrl: './map-picker-dialog.component.html',
//   styleUrls: ['./map-picker-dialog.component.scss']
// })
// export class MapPickerDialogComponent implements AfterViewInit {
//   map: any;
//   marker: any;
//   defaultPoint: string | null;

//   constructor(
//     private dialogRef: MatDialogRef<MapPickerDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { pointType: 'departure' | 'arrival', defaultPoint: string | null }
//   ) {
//     this.defaultPoint = data.defaultPoint;
//   }

//   ngAfterViewInit(): void {
//     this.initMap();
//   }

//   initMap(): void {
//     const mapOptions = {
//       center: this.defaultPoint ? this.parseLatLng(this.defaultPoint) : { lat: 48.8566, lng: 2.3522 },
//       zoom: 10
//     };
//     this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

//     this.map.addListener('click', (event: any) => {
//       if (this.marker) {
//         this.marker.setPosition(event.latLng);
//       } else {
//         this.marker = new google.maps.Marker({
//           position: event.latLng,
//           map: this.map
//         });
//       }
//     });

//     if (this.defaultPoint) {
//       this.setMarker(this.parseLatLng(this.defaultPoint));
//     }
//   }

//   parseLatLng(point: string): any {
//     const [lat, lng] = point.split(',').map(Number);
//     return { lat, lng };
//   }

//   setMarker(location: any): void {
//     this.marker = new google.maps.Marker({
//       position: location,
//       map: this.map
//     });
//   }

//   // confirmSelection(): void {
//   //   if (this.marker) {
//   //     const position = this.marker.getPosition();
//   //     this.dialogRef.close(`${position.lat()},${position.lng()}`);
//   //   }
//   // }
//   confirmSelection(): void {
//     if (this.marker) {
//       const position = this.marker.getPosition();
//       this.dialogRef.close(`${position.lat()},${position.lng()}`);
//     } else {
//       // Vous pouvez ajouter une alerte ou un message ici si nécessaire
//       console.warn('Aucun point sélectionné sur la carte.');
//     }
//   }
  

//   cancel(): void {
//     this.dialogRef.close();
//   }
// }


import { Component, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var google: any;

@Component({
  selector: 'app-map-picker-dialog',
  templateUrl: './map-picker-dialog.component.html',
  styleUrls: ['./map-picker-dialog.component.scss']
})
export class MapPickerDialogComponent implements AfterViewInit {
  map: any;
  marker: any;
  defaultPoint: string | null;

  constructor(
    private dialogRef: MatDialogRef<MapPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pointType: 'departure' | 'arrival', defaultPoint: string | null }
  ) {
    this.defaultPoint = data.defaultPoint;
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    const mapOptions = {//18.09137003549409,-15.980933904647827
      center: this.defaultPoint ? this.parseLatLng(this.defaultPoint) : { lat: 18.091, lng: -15.9809 },
      zoom: 10
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    this.map.addListener('click', (event: any) => {
      if (this.marker) {
        this.marker.setPosition(event.latLng);
      } else {
        this.marker = new google.maps.Marker({
          position: event.latLng,
          map: this.map
        });
      }
    });

    // Si un point par défaut est passé, placez un marqueur
    if (this.defaultPoint) {
      this.setMarker(this.parseLatLng(this.defaultPoint));
    }
  }

  parseLatLng(point: string): any {
    const [lat, lng] = point.split(',').map(Number);
    return { lat, lng };
  }

  setMarker(location: any): void {
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
  }

  getDialogTitle(): string {
    return this.data.pointType === 'departure' ? 'Sélectionner le point de départ' : 'Sélectionner le point d\'arrivée';
  }

  confirmSelection(): void {
    if (this.marker) {
      const position = this.marker.getPosition();
      this.dialogRef.close(`${position.lat()},${position.lng()}`);
    } else {
      alert('Veuillez sélectionner un point sur la carte.');
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

