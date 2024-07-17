import { Component } from '@angular/core';
import { WeatherServiceService } from './weather-service.service';
import { GeocodingService } from './geocoding.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  city : any;
  weather: any;
  private apiKey = 'AIzaSyBXr1Vt-pDbTJ8Sd3ifRNHuWHcV5GBLYOk';
  private apiUrl = `https://maps.googleapis.com/maps/api/geocode/json`;
  latitude: number | undefined;
  longitude: number | undefined;
  cityName: string | undefined;
  error: string | undefined;
  loading = false;
  constructor(private weatherService: WeatherServiceService, private geocodingService: GeocodingService) {
   // this.getWeather();
    this.getCurrentLocation();
  }

  getWeather() {
    this.loading = true;
    this.weatherService.getWeather(this.city).subscribe(
      {
        next: result =>{
         console.log(result);
         this.weather = result;
         this.loading = false;

       },
       error: err =>{
        this.loading = false;
       },
       complete: () =>{
        this.loading = false;
       }
       }
    );
  }
  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getCityName(this.latitude, this.longitude);

        },
        (error) => {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              this.error = "User denied the request for Geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              this.error = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              this.error = "The request to get user location timed out.";
              break;
            // case error.UNKNOWN_ERROR:
            //   this.error = "An unknown error occurred.";
            //   break;
          }
        }
      );
    } else {
      this.error = "Geolocation is not supported by this browser.";
    }
  }

  getCityName(lat: number, lng: number): void {
    this.geocodingService.getCityName(lat, lng).subscribe(
      (response) => {
        const addressComponents = response.results[0].address_components;
        const city = addressComponents.find((component: any) =>
          component.types.includes('locality')
        );
        this.cityName = city ? city.long_name : 'City not found';
        this.city = this.cityName;
        console.log(this.cityName);
        this.getWeather();

      },
      (error) => {
        this.error = 'Unable to fetch city name';
      }
    );
  }

  getWeatherInfor(){
    if(this.city.length < 3){
      this.error = "Please enter city";
    } else{
      this.cityName = this.city;
      this.getWeather();

    }
  }

}
