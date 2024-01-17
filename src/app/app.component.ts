import { Component, ViewChild } from '@angular/core';
import { IonMenu, Platform } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // Referensi ke IonMenu
  @ViewChild(IonMenu) menu!: IonMenu;

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

  constructor(
    private storage: Storage,
    private platform: Platform,
    private router: Router
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
        this.router.navigateByUrl('/login');
        // Nonaktifkan menu jika belum login
        this.menu.disabled = true;
      } else {
        this.router.navigateByUrl('/penduduk');
        // Aktifkan kembali menu jika sudah login
        this.menu.disabled = false;
      }
    });
  
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Periksa apakah rute saat ini adalah halaman login
        if (event.url === '/login') {
          // Nonaktifkan menu pada halaman login
          this.menu.disabled = true;
        } else {
          // Aktifkan kembali menu pada halaman lain
          this.menu.disabled = false;
        }
      }
    });
  }
  
  toggleMenu() {
    this.menu.toggle(true);

  }

  navigateToSocialMedia(platform: string) {
    // Implement navigation to social media pages based on the platform
    switch (platform) {
      case 'facebook':
        this.router.navigateByUrl('/facebook-page');
        break;
      case 'twitter':
        this.router.navigateByUrl('/twitter-page');
        break;
      case 'instagram':
        this.router.navigateByUrl('/instagram-page');
        break;
      case 'youtube':
        this.router.navigateByUrl('/youtube-channel');
        break;
      default:
        // Handle other cases or do nothing
        break;
    }
  }
}
