import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
  ModalController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../ApiService';
@Component({
  selector: 'app-t-uang',
  templateUrl: './t-uang.page.html',
  styleUrls: ['./t-uang.page.scss'],
})
export class TUangPage implements OnInit {
  public Pengeluaran: any;
  public image: any;
  public kd_keluar: string = '';
  public kd_pengeluaran: string = '';
  public keterangan: string = '';
  public tanggal_keluar: string = '';

 
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService
  ) {
    this.getPengeluaran()
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

  async getPengeluaran() {
    this._apiService.getPengeluaran().then((res) => {
      if (res.msg == 'ok') {
        this.Pengeluaran = Array(res.data);
        if (res.data !== null) {
          this.Pengeluaran = res.data;
        } else {
          this.presentToast(
            'Blok not found !',
            'danger',
            'alert-circle-outline'
          );
        }
      } else if (res.msg == 'err') {
        this.presentToast(
          'Something went wrong',
          'danger',
          'alert-circle-outline'
        );
      }
    });
  }
  

  async getFile(event: any) {
    const file = event.target.files[0];
    this.image = file;
  }
  // ...

  async Insert() {
    if (
      this.image == null ||
      this.image == undefined ||
      this.kd_pengeluaran == '' ||
      this.keterangan== '' ||
      this.tanggal_keluar == '' 
       
    ) {
      this.presentToast(
        'Tidak boleh ada form yang kosong, harap isi semua form!',
        'warning',
        'alert-circle-outline'
      );
    } else {
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
        spinner: 'lines',
      });
      loader.present();
  
      const formData = new FormData();
      formData.append('kd_pengeluaran', this.kd_pengeluaran);
      formData.append('keterangan', this.keterangan);
      formData.append('tanggal_keluar', this.tanggal_keluar);
      formData.append('pengeluaran_foto', this.image);
  
      this._apiService.createUang(formData).then((res) => {
        if (res.msg == 'ok') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data berhasil ditambahkan!',
            'success',
            'checkmark-circle-outline'
          );
          this.navCtrl.navigateRoot('/uang-keluar');
        } else if (res.msg == 'notOk') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data gagal ditambahkan!',
            'danger',
            'alert-circle-outline'
          );
        } else if (res.msg == 'err') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Something went wrong!',
            'danger',
            'alert-circle-outline'
          );
        }
      });
    }
  }
  
  

  ngOnInit() {}
}

  


