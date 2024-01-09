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
  selector: 'app-pengeluaran',
  templateUrl: './pengeluaran.page.html',
  styleUrls: ['./pengeluaran.page.scss'],
})
export class PengeluaranPage implements OnInit {

  public Data: any;
  isReadOnly = false;
  public searchNIK: string = '';
  public kd_pengeluaran: string = '';
  public nama_pengeluaran: string = '';

  alertController: AlertController;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService,

    private alertCtrl: AlertController
  ) {
    this.getPengeluaran();
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
  ionViewWillEnter(): void {
    try {
      this.getPengeluaran(); // Tanpa memberikan parameter kd
    } catch (e) {
      throw new Error(e + 'Method not implemented.');
    }
  }
 
  handleRefresh(event: any) {
    setTimeout(() => {
      this.getPengeluaran();
      event.target.complete();
    }, 2000);
  }
  async getPengeluaran() {
    await this.storage.create();
    // Berikan nilai val sesuai kebutuhan

    this._apiService.getPengeluaran().then((res: any) => {
      if (res.msg == 'ok') {
        this.Data = res.data;
        this.kd_pengeluaran = String(res.data[0].user);
        this.nama_pengeluaran = String(res.data[0].user);
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
      this.Data = this.Data.filter((surat: any) =>
        surat.kd_pengeluaran.includes(this.searchNIK)
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
        this.getPengeluaran();
      }
    } else {
      // Jika searchNIK kosong, kembalikan ke semua data
      this.getPengeluaran();
    }
  }
  edit(kd_pengeluaran: string) {
    console.log('kd_pengeluaran:', kd_pengeluaran);
    
    if (kd_pengeluaran && kd_pengeluaran.trim() !== '') {
      this.navCtrl.navigateRoot('/e-pengeluaran?kd_pengeluaran=' + kd_pengeluaran);
    } else {
      this.presentToast('Invalid kd value', 'danger', 'alert-circle-outline');
    }
  }

  async confirmDelete(kd_pengeluaran: string) {
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
            this.delete_Pengeluaran(kd_pengeluaran);
          },
        },
      ],
    });
  
    await alert.present();
  }
  

  async delete_Pengeluaran(kd_pengeluaran: string) {
    try {
      const res = await this._apiService.deletePengeluaran(kd_pengeluaran);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getPengeluaran(); // Refresh data setelah penghapusan
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

  ngOnInit() {
  }

}

