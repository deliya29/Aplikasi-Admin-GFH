import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../ApiService';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-t-user',
  templateUrl: './t-user.page.html',
  styleUrls: ['./t-user.page.scss'],
})
export class TUserPage implements OnInit {

  newPesanData: any = {};
  public kd_penduduk: string = '';
  public email: string = '';
  public username: string = '';
  public password: string='';
  getUser: any;
  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async addUser() {
    if (!this.kd_penduduk || !this.email || !this.username || !this.password) {
      this.presentToast('Harap isi semua kolom', 'danger');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('kd_pnddk', this.kd_penduduk);
      formData.append('email', this.email);
      formData.append('username', this.username);
      formData.append('password', this.password);
      const response = await this._apiService.createUser(formData);
  
      if (response.msg === 'ok') {
        this.presentToast('User Ditambahkan!!', 'success');
        this.navCtrl.back();
      } else if (response.msg === 'notOk') {
        this.presentToast('Gagal Menambahkan User Baru!!', 'danger');
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
  goToUser() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.router.navigate(['/user']).then(() => {
      // Perbarui data di halaman 'info' setelah navigasi
      this.getUser();
    });
  }
  
}

