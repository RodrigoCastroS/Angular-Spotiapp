import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http:HttpClient) {
    console.log("Spotify service ready");
   }


   getQuery( query:string ){
      const url = `https://api.spotify.com/v1/${ query }`;

      const headers = new HttpHeaders({
        Authorization: "Bearer BvvQBEEIEDEEMLgYo7QtMkVzM7_Xp70THXBkvpU3fgxkA2fsefMC4QRKx0WY1RbAVWygtsLmGo2zFAz-WgAUw"
      });

      return this.http.get(url, { headers })
   }



   getNewReleases(){
     return this.getQuery("browse/new-releases?limit=20")
                .pipe( map( data => {
                  return data['albums'].items;
                }));

      // const headers = new HttpHeaders({
      //   Authorization: "Bearer BQARKjo24B-rR53XEk3c2UDGPszvaP-8EBTZyrcxdPB_UFTEhVCCpuVMAgYFOrkx5wTzruu0nP3UqM8FPk0"
      // });
   }

   getArtists( keyword: string){
      // const headers = new HttpHeaders({
      //   Authorization: "Bearer BQARKjo24B-rR53XEk3c2UDGPszvaP-8EBTZyrcxdPB_UFTEhVCCpuVMAgYFOrkx5wTzruu0nP3UqM8FPk0"
      // });

      return this.getQuery(`search?q=${ keyword }&type=artist&limit=18`)
                  .pipe( map( data => {
                    return data['artists'].items;
                  }));
   }

   getArtist(id: string){
      return this.getQuery(`artists/${id}`);
               // .pipe( map( data =>  data['artists'].items ));


              }
   getTopTracks(id: string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
               .pipe( map( data => data['tracks'] ));

   }
  }
