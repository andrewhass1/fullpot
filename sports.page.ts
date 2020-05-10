import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthenticateService } from '../services/authentication.service';
import { NavController, ModalController } from '@ionic/angular';
import {NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage implements OnInit {
  date: string;
  error: string;
  loading: any;
  amount:number;
  name1: Int16Array;
  page: any;
  dataReturned:any;
  gameid: any;
  sport: any;
  amount2: any;
  toast: Promise<boolean>;
  toWin: any;
  gametime: any;
  team1: any;
  team2: any;
  data: any;
  data2: any;
  toWin1: any;
  update: any;
  StartTime: any;
  Selection: any;
  Spread: any;
  Type: any;
  Sport: any;
  sports: any;
  Starttime: any;
  constructor(private route: ActivatedRoute, private http: HttpClient,  private router: Router, 
    public toastController: ToastController, public alertController: AlertController, 
    private navCtrl: NavController, private authService: AuthenticateService) { 
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.data2 = this.router.getCurrentNavigation().extras.state.user;
          this.amount2 = this.router.getCurrentNavigation().extras.state.user.amount2;
          this.toWin = this.router.getCurrentNavigation().extras.state.user.toWin;
          this.Starttime = this.router.getCurrentNavigation().extras.state.user.Starttime;
          this.date = this.router.getCurrentNavigation().extras.state.user.date;
          this.team1 = this.router.getCurrentNavigation().extras.state.user.team1;
          this.team2 = this.router.getCurrentNavigation().extras.state.user.team2;
          } 
      });
    }

  ngOnInit() {
  }
  private prepareDataRequest(): Observable<object> {
    // Define the data URL
    const dataUrl = 'http://localhost/rest/sport.php';
    // Prepare the request
    return this.http.get(dataUrl);
  }

  ionViewWillEnter() {
    // Load the data
    this.prepareDataRequest()
      .subscribe(
        data => {
          // Set the data to display in the template
          this.data = JSON.stringify(data);
          this.sports = JSON.parse(this.data);
        }
      );
  }
  public dashboard(sport: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        user: {
          Sport: sport.Sport
        }
      }
    };
    this.router.navigate(['/dashboard'], navigationExtras);
  }
}
