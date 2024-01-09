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
  selector: 'app-iuran',
  templateUrl: './iuran.page.html',
  styleUrls: ['./iuran.page.scss'],
})
export class IuranPage implements OnInit {
  public iuran: string=''; // Ganti dengan nama yang sesuai
  isMenuOpen = false;
 iuranData: any[] = [];
  tahunList: any[] = []; // Pastikan inisialisaspublic searchNIK: string = '';
  public searchNIK: string = '';
  public kd_penduduk: string = '';
  alertController: AlertController;
 
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController,
    private _apiService: ApiserviceService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.getIuran();
    this.alertController = alertCtrl;
  }

  ngOnInit() {
    this.getIuran ();
    // Inisialisasi tahunList jika diperlukan
     // Isi dengan data tahun yang diperlukan
  }


  getPayment() {
    // Panggil metode sesuai kebutuhan Anda, contoh:
    // this._apiService.getPaymentByYear(this.searchYear).then((res: any) => { ... });
  }
  searchByNIK(): void {
    if (this.searchNIK.trim() !== '') {
      this.iuranData = this.iuranData.filter((iuran: any) =>
        iuran.kd_penduduk.includes(this.searchNIK)
      );

      if (this.iuranData.length > 0) {
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
        this.getIuran();
      }
    } else {
      // Jika searchNIK kosong, kembalikan ke semua data
      this.getIuran();
    }
  }

  
  ionViewWillEnter(): void {
    try {
      this.getIuran(); // Tanpa memberikan parameter kd
    } catch (e) {
      throw new Error(e + 'Method not implemented.');
    }
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.getIuran(); // Tanpa memberikan parameter kd
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
  async getIuran() {
    await this.storage.create();
    this._apiService.getIuran().then((res: any) => {
      console.log('Response from getIuran:', res);
      if (res.msg == 'ok') {
        this.iuranData = res.data;
      } else if (res.msg == 'err') {
        this.presentToast('Something went wrong:' + String(res.err), 'danger', 'alert-circle-outline');
      }
    });
  }
  edit(kd_iuran: string) {
    console.log('kd_iuran:', kd_iuran);
    
    if (kd_iuran && kd_iuran.trim() !== '') {
      this.navCtrl.navigateRoot('/e-iuran?kd_iuran=' + kd_iuran);
    } else {
      this.presentToast('Invalid kd_iuran value', 'danger', 'alert-circle-outline');
    }
  }

  async confirmDelete(kd_iuran: string) {
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
            this.delete_Iuran(kd_iuran);
          },
        },
      ],
    });
  
    await alert.present();
  }
  

  async delete_Iuran(kd_iuran: string) {
    try {
      const res = await this._apiService.deleteIuran(kd_iuran);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getIuran(); // Refresh data setelah penghapusan
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
