import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

// importar el modulo para hacer la llamada
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent  {

  newSongs: any[] = [];
  loading: boolean;

  err: boolean;
  messageErr:string;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.err     = false;

      this.spotify.getNewReleases()
          .subscribe( (data:any) => {
              this.newSongs = data;
              this.loading = false;
            }, ( errorService )=> {
              this.err = true;
              this.loading = false;
              this.messageErr = errorService.error.error.message;

            });

   }


}
