import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../ApiService';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-t-pesan',
  templateUrl: './t-pesan.page.html',
  styleUrls: ['./t-pesan.page.scss'],
})
export class TPesanPage implements OnInit {
  newPesanData: any = {};
  public kd_penduduk: string = '';
  public pesan: string = '';
  public tgl_pesan: string='';
  getPesan: any;
  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async addPesan() {
    if (!this.kd_penduduk || !this.pesan || !this.tgl_pesan) {
      this.presentToast('Harap isi semua kolom', 'danger');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('kd_pnddk', this.kd_penduduk);
      formData.append('pesan', this.pesan);
      formData.append('tgl_pesan', this.tgl_pesan);
      const response = await this._apiService.createPesan(formData);
  
      if (response.msg === 'ok') {
        this.presentToast('Pesan Ditambahkan!!', 'success');
        this.navCtrl.back();
      } else if (response.msg === 'notOk') {
        this.presentToast('Gagal Menambahkan Pesan!!', 'danger');
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
  goToPesan() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.router.navigate(['/pesan']).then(() => {
      // Perbarui data di halaman 'info' setelah navigasi
      this.getPesan();
    });
  }
  
}

