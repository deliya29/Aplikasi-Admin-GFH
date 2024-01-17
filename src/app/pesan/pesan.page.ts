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
  selector: 'app-pesan',
  templateUrl: './pesan.page.html',
  styleUrls: ['./pesan.page.scss'],
})
export class PesanPage implements OnInit {

  public Data: any;
  public msg: string = '';
  public searchNIK: string = '';
  alertController: AlertController;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.alertController = alertCtrl;
  }

  ngOnInit() {
    this.getPesan(); // Tanpa memberikan parameter kd
    
  }
  
  ionViewWillEnter(): void {
    try {
      this.getPesan(); // Tanpa memberikan parameter kd
    } catch (e) {
      throw new Error(e + 'Method not implemented.');
    }
  }
  
  handleRefresh(event: any) {
    setTimeout(() => {
      this.getPesan(); // Tanpa memberikan parameter kd
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

  async getPesan() {
    await this._apiService.getPesan().then((res) => {
      if (res.msg == 'ok') {
        this.Data = res.data;
      } else if (res.msg == 'notFound') {
        this.Data = null;
        this.presentToast(
          'Belum ada pesan!',
          'warning',
          'alert-circle-outline'
        );
      } else if (res.msg == 'err') {
        this.Data = null;
        this.presentToast(
          'Something went wrong!',
          'danger',
          'alert-circle-outline'
        );
      }
    });
  }
  
  searchByNIK(): void {
    if (this.searchNIK.trim() !== '') {
      this.Data = this.Data.filter((pesan: any) =>
       pesan.kd_penduduk.includes(this.searchNIK)
      );

      if (this.Data.length > 0) {
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
        this.getPesan();
      }
    } else {
      // Jika searchNIK kosong, kembalikan ke semua data
      this.getPesan();
    }
  }
  
  edit(kd_pesan: string) {
    console.log('kd_pesan:', kd_pesan);
    
    if (kd_pesan && kd_pesan.trim() !== '') {
      this.navCtrl.navigateRoot('/e-pesan?kd_pesan=' + kd_pesan);
    } else {
      this.presentToast('Invalid kode pesan value', 'danger', 'alert-circle-outline');
    }
  }

  async confirmDelete(kd_pesan: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this Pesan?',
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
            this.deletePesan(kd_pesan);
          },
        },
      ],
    });
  
    await alert.present();
  }
  

  async deletePesan(kd_pesan: string) {
    try {
      const res = await this._apiService.deletePesan(kd_pesan);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getPesan(); // Refresh data setelah penghapusan
      } else if (res.msg === 'notOk') {
        this.presentToast('Data gagal dihapus!', 'danger', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong!', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in deletePesan:', err);
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
