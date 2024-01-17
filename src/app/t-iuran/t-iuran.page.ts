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
  selector: 'app-t-iuran',
  templateUrl: './t-iuran.page.html',
  styleUrls: ['./t-iuran.page.scss'],
})
export class TIuranPage implements OnInit {
  public Blok: any;
  public Warga: any;
  public image: any;
  public kd_blok: string = '';
  public kd_penduduk: string = '';
  public jenis: string = '';
  public ket: string = '';
  public tgl: string = '';
  public tahun: string = '';
  public bulan: string = '';
  public status: string = '';

 
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiserviceService
  ) {
    this.getBlok(),
    this.getWarga();
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

  async getBlok() {
    this._apiService.getBlok().then((res) => {
      if (res.msg == 'ok') {
        this.Blok = Array(res.data);
        if (res.data !== null) {
          this.Blok = res.data;
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
  async getWarga() {
    this._apiService.getWarga().then((res) => {
      if (res.msg == 'ok') {
        this.Warga = Array(res.data);
        if (res.data !== null) {
          this.Warga = res.data;
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
      // this.image == null ||
      // this.image == undefined ||
      this.kd_blok == '' ||
      this.kd_penduduk == '' ||
      this.jenis == '' ||
      this.ket == '' ||
      this.tgl == '' ||
      this.tahun == '' ||
      this.bulan == '' 
      //this.status == '' 
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
      formData.append('kd_blok', this.kd_blok);
      formData.append('kd_penduduk', this.kd_penduduk);
      formData.append('jenis_pembayaran', this.jenis);
      formData.append('keterangan', this.ket);
      formData.append('tgl_pembayaran', this.tgl);
      formData.append('kas_tahun', this.tahun);
      formData.append('kas_bulan', this.bulan);
      formData.append('status', this.status);
      // formData.append('iuran_foto', this.image);
      if (this.image) {
        formData.append('iuran_foto', this.image);
      }
      this._apiService.createIuran(formData).then((res) => {
        if (res.msg == 'ok') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data berhasil ditambahkan!',
            'success',
            'checkmark-circle-outline'
          );
          this.navCtrl.navigateRoot('/iuran');
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
