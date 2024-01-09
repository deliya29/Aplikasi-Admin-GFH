import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../ApiService';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-t-info',
  templateUrl: './t-info.page.html',
  styleUrls: ['./t-info.page.scss'],
})
export class TInfoPage implements OnInit {
  newInfoData: any = {};
  public judul_info: string = '';
  public informasi: string = '';
  public tgl_info: string = '';
  getInfo: any;

  constructor(
    private _apiService: ApiserviceService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async addNewInfo() {
    try {
      const formData = new FormData();
      formData.append('judul_info', this.judul_info);
      formData.append('informasi', this.informasi);
      formData.append('tgl_info', this.tgl_info);
      const response = await this._apiService.createInfo(formData);

      if (response.msg === 'ok') {
        // Data added successfully, you can navigate to another page or show a success message
        this.presentToast('Informasi Ditambahkan!!', 'success');
        // For example, navigate back to the previous page
        this.navCtrl.back();
      } else if (response.msg === 'notOk') {
        // Handle the case when data addition fails
        this.presentToast('Gagal Menambahkan Informasi!!', 'danger');
      } else {
        // Handle other error cases
        this.presentToast('Something went wrong', 'danger');
      }
    } catch (err: any) {
      console.log(err);
      // Handle unexpected errors
      this.presentToast('An error occurred', 'danger');
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
  goToInfoPage() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.router.navigate(['/info']).then(() => {
      // Perbarui data di halaman 'info' setelah navigasi
      this.getInfo();
    });
  }
  
}
