import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  NavController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../ApiService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public Data: any;
  isReadOnly = false;
  public searchNIK: string = '';
  public user: string = '';
  public kd_user: string = '';
  alertController: AlertController;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService,

    private alertCtrl: AlertController
  ) {
    this.getUser();
    this.alertController = alertCtrl;
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
  async getUser() {
    await this.storage.create();
    // Berikan nilai val sesuai kebutuhan

    this._apiService.getUser('').then((res: any) => {
      if (res.msg == 'ok') {
        this.Data = res.data;
        this.user = String(res.data[0].user);
      } else if (res.msg == 'err') {
        this.presentToast(
          'Terjadi kesalahan: ' + String(res.err),
          'danger',
          'alert-circle-outline'
        );
      }
    });
  }

  searchByNIK(): void {
    if (this.searchNIK.trim() !== '') {
      this.Data = this.Data.filter((user: any) =>
        user.kd_penduduk.includes(this.searchNIK)
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
        this.getUser();
      }
    } else {
      // Jika searchNIK kosong, kembalikan ke semua data
      this.getUser();
    }
  }
  edit(kd_penduduk: string) {
    console.log('kd_penduduk:', kd_penduduk);
    
    if (kd_penduduk && kd_penduduk.trim() !== '') {
      this.navCtrl.navigateRoot('/e-user?kd_penduduk=' + kd_penduduk);
    } else {
      this.presentToast('Invalid kd_info value', 'danger', 'alert-circle-outline');
    }
  }
  async confirmDelete(kd_user: string) {
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
            this.delete_user(kd_user);
          },
        },
      ],
    });
  
    await alert.present();
  }
  

  async delete_user(kd_user: string) {
    try {
      const res = await this._apiService.deleteUser(kd_user);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getUser(); // Refresh data setelah penghapusan
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
  ngOnInit() {
  }

}
