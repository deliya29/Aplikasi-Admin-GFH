import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../ApiService';
import {
  ViewDidEnter,
  ToastController,
  NavController,
  AlertController,
} from '@ionic/angular';
import * as XLSX from 'xlsx';
import Chart from 'chart.js/auto'; 
@Component({
  selector: 'app-uang-keluar',
  templateUrl: './uang-keluar.page.html',
  styleUrls: ['./uang-keluar.page.scss'],
})
export class UangKeluarPage implements OnInit {
  public info: string='';
  isMenuOpen = false;
  UangData: any;
  uangkeluar:any;
  chart: any;
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
    this.getUang();
    this.alertController = alertCtrl;
  }

  ionViewDidEnter() {
    this.getUang();
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
  searchByNIK(): void {
    if (this.searchNIK.trim() !== '') {
      this.UangData = this.UangData.filter((uangkeluar: any) =>
       uangkeluar.kd_pengeluaran.includes(this.searchNIK)
      );

      if (this.UangData.length > 0) {
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
        this.getUang();
      }
    } else {
      // Jika searchNIK kosong, kembalikan ke semua data
      this.getUang();
    }
  }
  async getUang() {
    try {
      await this.storage.create();
      const res = await this._apiService.getUang();

      if (res.msg === 'ok') {
        this.UangData = res.data;
      } else if (res.msg === 'notFound') {
        this.presentToast(
          'Belum ada info !',
          'warning',
          'alert-circle-outline'
        );
      } else {
        this.presentToast(
          'Something went wrong',
          'danger',
          'alert-circle-outline'
        );
      }
    } catch (err: any) {
      console.error('Error in getInfo:', err);
      this.presentToast(
        'Error fetching data',
        'danger',
        'alert-circle-outline'
      );
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getUang();
      event.target.complete();
    }, 2000);
  }
  edit(kd_keluar: string) {
    console.log('kd_keluar:', kd_keluar);

    if (
      kd_keluar !== undefined &&
      kd_keluar !== null &&
      kd_keluar.trim() !== ''
    ) {
      this.navCtrl.navigateRoot('/e-uang?kd_keluar=' + kd_keluar);
    } else {
      this.presentToast('Invalid kd value', 'danger', 'alert-circle-outline');
    }
  }

  async confirmDelete(kd_keluar: string) {
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
            this.Delete_uang(kd_keluar);
          },
        },
      ],
    });

    await alert.present();
  }
  async Delete_uang(kd_keluar: string) {
    try {
      const res = await this._apiService.Delete_uang(kd_keluar);

      if (res.msg === 'ok') {
        this.presentToast(
          'Data berhasil dihapus!',
          'success',
          'checkmark-circle-outline'
        );
        this.getUang(); // Refresh data setelah penghapusan
      } else if (res.msg === 'notOk') {
        this.presentToast(
          'Data gagal dihapus!',
          'danger',
          'alert-circle-outline'
        );
      } else {
        this.presentToast(
          'Something went wrong!',
          'danger',
          'alert-circle-outline'
        );
      }
    } catch (err: any) {
      console.error('Error in deleteSurat:', err);
      this.presentToast('Error: ' + err.err, 'danger', 'alert-circle-outline');
    }
  }
  exportToExcel() {
    if (this.UangData && this.UangData.length > 0) {
      // Menambahkan kolom "No" ke setiap objek dalam array
      const dataWithRowNumbers = this.UangData.map((data: any, index: number) => ({
        No: index + 1,
        ...data,
      }));
  
      // Membuat lembar kerja dari data yang telah dimodifikasi
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataWithRowNumbers);
  
      // Membuat buku kerja dan menambahkan lembar kerja
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'UangData');
  
      // Menyimpan buku kerja sebagai file Excel
      XLSX.writeFile(wb, 'Laporan_uang.xlsx');
    } else {
      this.presentToast('No data to export', 'warning', 'alert-circle-outline');
    }
  }
  
  

  navigateToChart() {
    this.navCtrl.navigateForward(['/report'], {
      state: { data: this.UangData },
    });
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
