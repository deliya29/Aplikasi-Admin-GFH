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
  selector: 'app-penduduk',
  templateUrl: './penduduk.page.html',
  styleUrls: ['./penduduk.page.scss'],
})
export class PendudukPage implements OnInit {
  public Data: any;
  isReadOnly = false;
  public searchNIK: string = '';
  public penduduk: string = '';
  public kd_penduduk: string = '';
  alertController: AlertController;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService,

    private alertCtrl: AlertController
  ) {
    this.getPenduduk();
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
  async getPenduduk() {
    await this.storage.create();
    // Berikan nilai val sesuai kebutuhan

    this._apiService.getPenduduk('').then((res: any) => {
      if (res.msg == 'ok') {
        this.Data = res.data;
        this.penduduk = String(res.data[0].penduduk);
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
      this.Data = this.Data.filter((penduduk: any) =>
        penduduk.nik.includes(this.searchNIK)
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
        this.getPenduduk();
      }
    } else {
      // Jika searchNIK kosong, kembalikan ke semua data
      this.getPenduduk();
    }
  }

  edit(nik: string) {
    console.log('nik:', nik);

    if (nik && nik.trim() !== '') {
      this.navCtrl.navigateRoot('/e-penduduk?nik=' + nik);
    } else {
      this.presentToast(
        'Nilai nik tidak valid',
        'danger',
        'alert-circle-outline'
      );
    }
  }

  async tambah() {
    this.navCtrl.navigateRoot('/tambah-penduduk');
  }
  async confirmDelete(kd_penduduk: string) {
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
            this.delete_Penduduk(kd_penduduk);
          },
        },
      ],
    });

    await alert.present();
  }

  async delete_Penduduk(kd_penduduk: string) {
    try {
      const res = await this._apiService.delete_Penduduk(kd_penduduk);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getPenduduk(); // Refresh data setelah penghapusan
      } else if (res.msg === 'notOk') {
        this.presentToast('Data gagal dihapus!', 'danger', 'alert-circle-outline');
      } else {
        this.presentToast('Something went wrong!', 'danger', 'alert-circle-outline');
      }
    } catch (err: any) {
      console.error('Error in deletePenduduk:', err);
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
  ngOnInit() {}
}
