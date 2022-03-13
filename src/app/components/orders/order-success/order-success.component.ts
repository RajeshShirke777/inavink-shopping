import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.sass']
})
export class OrderSuccessComponent implements OnInit {

  message:string='';
  public paymantWay = [
    { title: 'Visa Debit Card', image: 'assets/images/flags/visa.png', card: '******6766' },
    { title: 'Mastercard Office', image: 'assets/images/flags/master.png', card: '******6766' },
    
  ];
  constructor(
    private sharedService:SharedService,
    private titleService: Title,
    private metaTagService: Meta,
  ) { 
    this.message = this.sharedService.orderSuccessMessage;
    this.sharedService.orderSuccessMessage = '';
  }

  ngOnInit(): void {
    this.titleService.setTitle('Buy Online from Local Shops Near you | Vocal for Local | Near Me');
    this.metaTagService.updateTag(
      { name: 'keywords', content: 'Vocal for Local, Near Me, Buy, Nearby shops, Shops near me, Local Stores, where to buy, Shopping, Shopping center, local Shops, Local Vocal' });   
    this.metaTagService.updateTag(    
      { name: 'title', content: 'Buy Online from Local Shops Near you | Vocal for Local | Near Me' });   
    this.metaTagService.updateTag(
      { name: 'description', content: 'Be Vocal for Local, now checkout and Shop Online from Local Shops near me. One of the Best of India Shopping site to support Local stores'  });
    this.metaTagService.updateTag(
      { name:  'robots', content: 'index, follow' });
    this.metaTagService.updateTag(
      { name: 'author', content: 'InAVink' });
    this.metaTagService.updateTag(
      { name: 'viewport',  content: 'width=device-width, initial-scale=1' });    
    this.metaTagService.updateTag(
      { name: 'date', content: '2021-03-18', scheme: 'YYYY-MM-DD'});   
  }

}
