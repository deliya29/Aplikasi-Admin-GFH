import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../ApiService';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t-blok',
  templateUrl: './t-blok.page.html',
  styleUrls: ['./t-blok.page.scss'],
})
export class TBlokPage implements OnInit {
  newBlokData: any = {};
  public kd_blok: string = '';
  public no_blok: string = '';
  public nama_blok: string = '';
  public status: string = '';
  
  getBlok: any;
  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async addBlok() {
    if (!this.no_blok || !this.nama_blok ||!this.status) {
      this.presentToast('Harap isi semua kolom', 'danger');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('kd_blok', this.kd_blok);
      formData.append('no_blok', this.no_blok);
      formData.append('nama_blok', this.nama_blok);
      formData.append('status', this.status);
      const response = await this._apiService.createBlok(formData);
  
      if (response.msg === 'ok') {
        this.presentToast('Blok Ditambahkan!!', 'success');
        this.navCtrl.back();
      } else if (response.msg === 'notOk') {
        this.presentToast('Gagal Menambahkan Blok!!', 'danger');
      } else {
        this.presentToast('Terjadi kesalahan', 'danger');
      }
    } catch (err: any) {
      console.error(err);
      this.presentToast('Terjadi kesalahan', 'danger');
    }
  }
  

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
  goToBlokPage() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.router.navigate(['/blok']).then(() => {
      // Perbarui data di halaman 'info' setelah navigasi
      this.getBlok();
    });
  }
  
}

