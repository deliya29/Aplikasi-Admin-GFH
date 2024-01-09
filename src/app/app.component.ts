import { Component, ViewChild } from '@angular/core';
import { IonMenu } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Penduduk', url: '/penduduk', icon: 'person-add' },
    { title: 'Info', url: '/info', icon: 'mail' },
    { title: 'Iuran', url: '/iuran', icon: 'cash' },
    { title: 'Blok', url: '/blok', icon: 'home' },
    { title: 'Pesan', url: '/pesan', icon: 'chatbubbles' },
    { title: 'User', url: '/user', icon: 'person' },
    { title: 'Surat Keluar', url: '/surat-masuk', icon: 'mail-unread' },
    { title: 'Pengeluaran', url: '/pengeluaran', icon: 'reader' },
    { title: 'Uang Keluar', url: '/uang-keluar', icon: 'receipt' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private storage : Storage,
    private platform: Platform,
    private router : Router
    
  ) {
    this.initializeApp();
  }
  async initializeApp() {
    await this.storage.create();
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault(); // Uncomment if you have StatusBar
    });

    this.storage.get('isLoggedIn').then((val) => {
      if (val === null || val === undefined || val === '') {
        this.router.navigateByUrl('/login'); // Navigasi ke halaman splash
      } else {
        this.router.navigateByUrl('/penduduk'); // Navigasi ke halaman tab1
      }
    });
  }
}