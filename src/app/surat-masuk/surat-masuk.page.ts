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
  selector: 'app-surat-masuk',
  templateUrl: './surat-masuk.page.html',
  styleUrls: ['./surat-masuk.page.scss'],
})
export class SuratMasukPage implements OnInit {

  public Data: any;
  isReadOnly = false;
  public searchNIK: string = '';
  public kd_penduduk: string = '';
  public surat: string = '';
  alertController: AlertController;


  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService,

    private alertCtrl: AlertController
  ) {
    this.getSurat();
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
      this.getSurat(); // Tanpa memberikan parameter kd
    } catch (e) {
      throw new Error(e + 'Method not implemented.');
    }
  }
 
  handleRefresh(event: any) {
    setTimeout(() => {
      this.getSurat();
      event.target.complete();
    }, 2000);
  }
  async getSurat() {
    await this.storage.create();
    // Berikan nilai val sesuai kebutuhan

    this._apiService.getSurat().then((res: any) => {
      if (res.msg == 'ok') {
        this.Data = res.data;
        this.kd_penduduk = String(res.data[0].user);
        this.surat = String(res.data[0].user);
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
        surat.nomor_surat.includes(this.searchNIK)
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
        this.getSurat();
      }
    } else {
      // Jika searchNIK kosong, kembalikan ke semua data
      this.getSurat();
    }
  }
  edit(kd_surat_keluar: string) {
    console.log('kd_surat_keluar:', kd_surat_keluar);
    
    if (kd_surat_keluar && kd_surat_keluar.trim() !== '') {
      this.navCtrl.navigateRoot('/e-surat?kd_surat_keluar=' + kd_surat_keluar);
    } else {
      this.presentToast('Invalid kd_surat_keluar value', 'danger', 'alert-circle-outline');
    }
  }

  async confirmDelete(kd_surat_keluar: string) {
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
            this.delete_Surat(kd_surat_keluar);
          },
        },
      ],
    });
  
    await alert.present();
  }
  

  async delete_Surat(kd_surat_keluar: string) {
    try {
      const res = await this._apiService.deleteSurat(kd_surat_keluar);

      if (res.msg === 'ok') {
        this.presentToast('Data berhasil dihapus!', 'success', 'checkmark-circle-outline');
        this.getSurat(); // Refresh data setelah penghapusan
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

