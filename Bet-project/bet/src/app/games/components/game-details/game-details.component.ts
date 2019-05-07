import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { GameDetailsService } from '../../services/game-details.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BetsService } from 'src/app/user/services/bets.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthentificationService } from 'src/app/user/services/authentification.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LogInComponent } from 'src/app/user/components/log-in/log-in.component';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  @ViewChild("scroll") scrollDiv: ElementRef;
  _currentGame;
  currentGame;
  bettingAmount: boolean = false;
  currentUser: object;
  betUp: boolean = false;
  betDown: boolean = false;
  key: string;

  constructor(private gameDetails: GameDetailsService,
              private afs: AngularFirestore,
              private auth: AngularFireAuth,
              private bets: BetsService,
              private activeRoute: ActivatedRoute,
              private authService: AuthentificationService,
              private dialog: MatDialog) {

              }

  ngOnInit() {
    this.scrollDiv.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });//Vahag esi scrolli hmara 4jnjes

    this.activeRoute.params.subscribe(params => {
      if(params.id) {

        this.afs.collection('games').snapshotChanges().subscribe(res => {
          res.forEach(game => {
            if(game.payload.doc.id === params.id) {
              for(let key in game.payload.doc.data()['odds']) {
                if(this.currentGame) {
                  if(game.payload.doc.data()['odds'][key] > this.currentGame.odds[key]) {
                    
                    this.key = key;
                    this.betUp = true;

                  } else if(game.payload.doc.data()['odds'][key] < this.currentGame.odds[key]) {

                    this.key = key;
                    this.betDown = true;

                  }
                }
              }
              
              
              this.currentGame = game.payload.doc.data();
              this.currentGame.id = game.payload.doc.id;
            }
          })
          


          this.afs.collection('teams').snapshotChanges().subscribe(res => {
            res.forEach(team => {
              if(this.currentGame['team_1'] === team.payload.doc.id) {
                this.currentGame.team1 = team.payload.doc.data()['name'];
              } else if(this.currentGame['team_2'] === team.payload.doc.id) {
                this.currentGame.team2 = team.payload.doc.data()['name'];
              }
            })


            this.afs.collection('categories').snapshotChanges().subscribe(res => {
              res.forEach(cat => {
                if(this.currentGame.category === cat.payload.doc.id) {
                  this.currentGame.categoryName = cat.payload.doc.data()['name'];
                }
              })


              this.afs.collection('subcategories').snapshotChanges().subscribe(res => {
                res.forEach(subCat => {
                  if(this.currentGame.type === subCat.payload.doc.id) {
                    this.currentGame.subCategoryName = subCat.payload.doc.data()['name'];
                  }
                })
              })

              
            })

          })

          setTimeout(() => {
            this.betUp = false;
            this.betDown = false;
          }, 2000);

        })

      }

    })

  }

  bettingAmountControl = new FormControl('', [Validators.required, Validators.min(1000)]);

  placeBet() {
    if(this.authService.isLogged) {
      const currentUser = this.auth.auth.currentUser;
      let subscription = this.afs.collection('users').doc(currentUser.uid).valueChanges().subscribe(user => {
        if (user['balance'] >= this.bettingAmountControl.value) {
          this.bets.balance = user['balance'];
          const id = this.afs.createId();
          const bet = {
            amount: this.bettingAmountControl.value,
            game: this.currentGame['id'],
            odd: this.gameDetails.selectedTeam,
            user: currentUser.uid
          }
          this.afs.collection('bets').doc(id).set(bet);
          this.bets.newBets.push(this.currentGame);
          this.bets.changeBalance(currentUser, this.bettingAmountControl.value, false);
          subscription.unsubscribe();
        }
      })  
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      this.dialog.open(LogInComponent,dialogConfig);
    }
    

  }

  showBettingAmount(event: Event) {
    if (event.target['tagName'] === 'P' && this.gameDetails.selectedBet) {
      if (event.target['parentElement']['parentElement'] === this.gameDetails.selectedBet['parentElement']) {
        this.bettingAmount = true;
      }
    } else if (event.target['tagName'] === 'DIV' && this.gameDetails.selectedBet) {
      if (event.target['parentElement'] === this.gameDetails.selectedBet['parentElement']) {
        this.bettingAmount = true;
      }
    }
  }



}
