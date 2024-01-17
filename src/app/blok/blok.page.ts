import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

import {
  NavController,
  AlertController,
  ToastController
} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { ApiserviceService } from '../ApiService';


@Component({
  selector: 'app-blok',
  templateUrl: './blok.page.html',
  styleUrls: ['./blok.page.scss'],
})
export class BlokPage implements OnInit {

  public blokData: any;
  public searchNumber: string = '';
  alertController: AlertController;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.getBlokData();
    this.alertController = alertCtrl;
  }

  ngOnInit() {
    // Mendapatkan parameter 'kd' dari URL
    const kd = this.activatedRoute.snapshot.paramMap.get('kd');
    // Jika perlu mendapatkan atau menyimpan data di penyimpanan lokal
    const storedData = this.storage.get('some_key');
    // Panggil fungsi untuk mendapatkan data blok
    this.getBlokData();
  }

  async presentToast(msg: any, color: any, icon: any) {
    const toast = await this.toastCtrl.create({
      icon: icon,
      message: msg,
      duration: 1500,
      color: color,
      position: 'top',
    });
    toast.present();
  }
  ionViewWillEnter(): void {
    try {
      this.getBlokData(); // Tanpa memberikan parameter kd
    } catch (e) {
      throw new Error(e + 'Method not implemented.');
    }
  }
 
  handleRefresh(event: any) {
    setTimeout(() => {
      this.getBlokData();
      event.target.complete();
    }, 2000);
  }

  async getBlokData() {
    // Jika perlu menginisialisasi penyimpanan
    await this.storage.create();

    this._apiService.getBlok().then((res: any) => {
      if (res.msg == 'ok') {
        this.blokData = res.data;
      } else if (res.msg == 'notFound') {
        this.presentToast(
          'Belum ada blok!',
          'warning',
          'alert-circle-outline'
        );
      } else if (res.msg == 'err') {
        this.presentToast(
          'Terjadi kesalahan',
          'danger',
          'alert-circle-outline'
        );
      }
    });
  }
  searchnoBlok(): void {
    if (this.searchNumber.trim() !== '') {
      this.blokData = this.blokData.filter((info: any) =>
        info.no_blok.includes(this.searchNumber)
      );
  
      if (this.blokData.length > 0) {
        this.presentToast(
          'Data berhasil ditemukan!',
          'success',
          'checkmark-circle-outline'
        );
      } else {
        this.presentToast(
          'Data tidak ditemukan.',
          'warning',
          'alert-circle-outline'
        );
        // Jika data tidak ditemukan, tampilkan kembali semua data
        this.getBlokData();
      }
    } else {
      // Jika searchTanggal kosong, kembalikan ke semua data
      this.getBlokData();
    }
  }
  // Contoh fungsi untuk berpindah halaman jika diperlukan
 
  edit(kd_blok: string) {
    console.log('kd_blok:', kd_blok);
    
    if (kd_blok && kd_blok.trim() !== '') {
      this.navCtrl.navigateRoot('/e-blok?kd_blok=' + kd_blok);
    } else {
      this.presentToast('Invalid kd_blok value', 'danger', 'alert-circle-outline');
    }
  }

  async confirmDelete(kd_blok: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this information?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Delete canceled');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.delete_Blok(kd_blok);
          },
        },
      ],
    });
  
    await alert.present();
  }
  

  async delete_Blok(kd_blok: string) {
    try {
      const res = await this._apiService.deleteBlok(kd_blok);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getBlokData(); // Refresh data setelah penghapusan
      } else if (res.msg === 'notOk') {
        this.presentToast('Data gagal dihapus!', 'danger', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong!', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in deleteInfo:', err);
      this.presentToast('Error: ' + err.err, 'danger', 'alert-circle-outline');
    }
  }
  async logout() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin keluar dari aplikasi?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Batal
          },
        },
        {
          text: 'Yes',
          handler: () => {
            // Logout dan navigasi ke halaman login
            this.storage.remove('isLoggedIn');
            localStorage.removeItem('isLoggedIn');
            this.navCtrl.navigateRoot('/login');
          },
        },
      ],
    });

    await alert.present();
  }
  route(route:string){
    this.navCtrl.navigateForward(route);
  }
}

