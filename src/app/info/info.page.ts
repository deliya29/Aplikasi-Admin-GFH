// info.page.ts
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
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  public info!: string;
  isMenuOpen = false;
  infoData: any;
  public searchTanggal: string = '';
  alertController: AlertController;
  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.getInfo();
    this.alertController = alertCtrl;
  }

  ngOnInit() {
    this.getInfo();
  }

  ionViewWillEnter(): void {
    try {
      this.getInfo(); // Tanpa memberikan parameter kd
    } catch (e) {
      throw new Error(e + 'Method not implemented.');
    }
  }
 
  handleRefresh(event: any) {
    setTimeout(() => {
      this.getInfo();
      event.target.complete();
    }, 2000);
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

 async getInfo() {
    await this.storage.create();
    this._apiService.getInfo().then((res: any) => {
      if (res.msg == 'ok') {
        // Mengasumsikan createdAt sebagai properti timestamp
        this.infoData = res.data.sort((a: any, b: any) => {
          return b.createdAt - a.createdAt;
        });
      } else if (res.msg == 'notFound') {
        this.presentToast('Belum ada info !', 'warning', 'alert-circle-outline');
      } else if (res.msg == 'err') {
        this.presentToast('Terjadi kesalahan', 'danger', 'alert-circle-outline');
      }
    });
  }
  
  searchByTanggal(): void {
    if (this.searchTanggal.trim() !== '') {
      this.infoData = this.infoData.filter((info: any) =>
        info.tgl_info.includes(this.searchTanggal)
      );
  
      if (this.infoData.length > 0) {
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
        this.getInfo();
      }
    } else {
      // Jika searchTanggal kosong, kembalikan ke semua data
      this.getInfo();
    }
  }
  

  edit(kd_info: string) {
    console.log('kd_info:', kd_info);
    
    if (kd_info && kd_info.trim() !== '') {
      this.navCtrl.navigateRoot('/e-info?kd_info=' + kd_info);
    } else {
      this.presentToast('Invalid kd_info value', 'danger', 'alert-circle-outline');
    }
  }

  async confirmDelete(kd_info: string) {
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
            this.delete_Info(kd_info);
          },
        },
      ],
    });
  
    await alert.present();
  }
  

  async delete_Info(kd_info: string) {
    try {
      const res = await this._apiService.deleteInfo(kd_info);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getInfo(); // Refresh data setelah penghapusan
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
}
