import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingController, AlertController, MenuController } from '@ionic/angular';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-pendingbets',
  templateUrl: './pendingbets.page.html',
  styleUrls: ['./pendingbets.page.scss'],
})
export class PendingbetsPage implements OnInit {
  date: string;
  error: string;
  loading: any;
  amount:Int16Array;
  name1: Int16Array;
  navParams: any;
  users: any;
  data: string;
  money: any;
  data1: string;
  name: any;
  win: any;
  bets: any;
  userEmail: string;

  constructor(public alertController: AlertController, private http: HttpClient, 
    public loadingController: LoadingController, private menu: MenuController, private navCtrl: NavController,private authService: AuthenticateService) { }

  ngOnInit() {
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }
  }
  private prepareDataRequest(): Observable<object> {
    // Define the data URL 
    const dataUrl1 = 'http://localhost/rest/pendingapi.php?username=' + this.userEmail;
    // Prepare the request
    return this.http.get(dataUrl1);
    
  }

  ionViewWillEnter() {
    // Load the data
      this.prepareDataRequest()
      .subscribe(
        data1 => {
          // Set the data to display in the template
          this.data1 = JSON.stringify(data1);
          this.bets = JSON.parse(this.data1);
        }
      );
  }

}
