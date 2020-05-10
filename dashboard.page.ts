import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingController, AlertController, ModalController,  PopoverController, Events, NavController  } from '@ionic/angular';
import { NotificationsComponent } from '../notifications/notifications.component';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage {
  users: any[] = [
    {
      id: 1,
      first: 'Alice',
      last: 'Smith',
    },
    {
      id: 2,
      first: 'Bob',
      last: 'Davis',
    },
    {
      id: 3,
      first: 'Charlie',
      last: 'Rosenburg',
    }
  ];

  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];
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
  
  /**
   * Constructor of our first page
   * @param movieService The movie Service to get data
   */

  constructor(public alertController: AlertController, private http: HttpClient,  private router: Router,private route: ActivatedRoute,
    public loadingController: LoadingController,public modalController: ModalController, public popoverCtrl: PopoverController,
    private navCtrl: NavController, public toastController: ToastController) { this.data = ''; this.error = '';    
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.sport = this.router.getCurrentNavigation().extras.state.user.Sport;
        }
    });
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data2 = this.router.getCurrentNavigation().extras.state.user;
        this.amount2 = this.router.getCurrentNavigation().extras.state.user.amount2;
        this.toWin = this.router.getCurrentNavigation().extras.state.user.toWin;
        if(this.toWin > 0){
        this.toWin = this.toWin.toFixed(2);
        }
        this.gametime = this.router.getCurrentNavigation().extras.state.user.Starttime;
        this.date = this.router.getCurrentNavigation().extras.state.user.date;
        this.team1 = this.router.getCurrentNavigation().extras.state.user.team1;
        this.team2 = this.router.getCurrentNavigation().extras.state.user.team2;
        }
    }); }

  private prepareDataRequest(): Observable<object> {
    // Define the data URL
    const dataUrl = 'http://localhost/rest/api.php?Sport=' + this.sport;
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
          this.users = JSON.parse(this.data);
        }
      );
  }
  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  compareWith = this.compareWithFn;


  customAlertOptions: any = this.users;
  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };

  customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
  };

  public sendPostRequest(entry) { 
    //Your method sig should look something like this: sendPostRequest(int id)
    //Get element at id
    //element.parent.parent.header.text
    //Search for "Pass parameter through event handler typescript ionic"

    if (this.amount > 0) {
    console.log("send post");
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let amount = entry.gameid;
    let postData = {
      "gameid": amount,
      "date": "2019-09-14",
      "team1": "Blue Jays",
      "team2": "Yankees",
      "ProjectedSpread1": "1.5",
      "ProjectedSpread2": "-1.5",
      "MoneyLine1": "240",
      "MoneyLine2": "-240",
      "Total": "9.5",
      "SpreadV1": "0",
      "SpreadV2": "0",
      "Sport": "mlb",
      "StartTime": "0000-00-00 00:00:00.000000"
    }

    this.http.post("http://localhost/placebet/create.php", postData, { observe: 'response' })
      .subscribe(data => {
        console.log(data);

      }, error => {
        console.log(error);
      });
  }
  
}

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }


  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
        component: NotificationsComponent,
        event: ev,
        animated: true,
        showBackdrop: true
    });
    return await popover.present();
}

public openDetailsWithState1(entry) {
  let amount = this.amount
  let navigationExtras: NavigationExtras = {
    state: {
      user: {
        date: entry.date,
        StartTime: entry.StartTime,
        gameid: entry.gameid,
        team1: entry.team1,
        team2: entry.team2,
        Selection: entry.team1,
        Type: 'Moneyline',
        Odds: entry.MoneyLine1,
        Spread: entry.MoneyLine1,
        Sport: entry.Sport
      }
    }
  };
  this.router.navigate(['/confirm'], navigationExtras);
}
public openDetailsWithState2(entry) {
  let amount = this.amount
  let navigationExtras: NavigationExtras = {
    state: {
      user: {
        date: entry.date,
        StartTime: entry.StartTime,
        gameid: entry.gameid,
        team1: entry.team1,
        team2: entry.team2,
        Selection: entry.team2,
        Type: 'Moneyline',
        Odds: entry.MoneyLine2,
        Spread: entry.MoneyLine2,
        Sport: entry.Sport
      }
    }
  };
  this.router.navigate(['/confirm'], navigationExtras);
}
public openDetailsWithState3(entry) {
  let amount = this.amount
  let navigationExtras: NavigationExtras = {
    state: {
      user: {
        date: entry.date,
        StartTime: entry.StartTime,
        gameid: entry.gameid,
        team1: entry.team1,
        team2: entry.team2,
        Selection: entry.team1,
        Type: 'Spread',
        Odds: entry.SpreadV1,
        Spread: entry.ProjectedSpread1,
        Sport: entry.Sport
      }
    }
  };
  this.router.navigate(['/confirm'], navigationExtras);
}
public openDetailsWithState4(entry) {
  let amount = this.amount
  let navigationExtras: NavigationExtras = {
    state: {
      user: {
        date: entry.date,
        StartTime: entry.StartTime,
        gameid: entry.gameid,
        team1: entry.team1,
        team2: entry.team2,
        Selection: entry.team2,
        Type: 'Spread',
        Odds: entry.SpreadV2,
        Spread: entry.ProjectedSpread2,
        Sport: entry.Sport
      }
    }
  };
  this.router.navigate(['/confirm'], navigationExtras);
}
public openDetailsWithState5(entry) {
  let amount = this.amount
  let navigationExtras: NavigationExtras = {
    state: {
      user: {
        date: entry.date,
        StartTime: entry.StartTime,
        gameid: entry.gameid,
        team1: entry.team1,
        team2: entry.team2,
        Selection: entry.Total,
        Type: 'Over',
        Odds: '+100',
        Spread: entry.Total,
        Sport: entry.Sport
      }
    }
  };
  this.router.navigate(['/confirm'], navigationExtras);
}
public openDetailsWithState6(entry) {
  let amount = this.amount
  let navigationExtras: NavigationExtras = {
    state: {
      user: {
        date: entry.date,
        StartTime: entry.StartTime,
        gameid: entry.gameid,
        team1: entry.team1,
        team2: entry.team2,
        Selection: entry.Total,
        Type: 'Under',
        Odds: '+100',
        Spread: entry.Total,
        Sport: entry.Sport
      }
    }
  };
  this.router.navigate(['/confirm'], navigationExtras);
}

}