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
  selector: 'app-e-iuran',
  templateUrl: './e-iuran.page.html',
  styleUrls: ['./e-iuran.page.scss'],
})
export class EIuranPage implements OnInit {

  public Data: any;
  public image: any;
  public kd_iuran: any;
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
    this.route.queryParams.subscribe((params) => {
      const kd_iuran= params['kd_iuran'];
      if (kd_iuran== null) {
        this.presentToast(
          'No Parameter found!',
          'warning',
          'alert-circle-outline'
        );
      } else {
        this.kd_iuran = kd_iuran;
        this.getIuran();
      }
    });
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
  async getFile(event: any) {
    const file = event.target.files[0];
    this.image = file;
  }

  async getIuran() {
    try {
      await this.storage.create();
      this._apiService.getIuran().then((res: any) => {
        console.log(res.data);
        if (res.msg == 'ok') {
          this.Data = res.data.filter((item: any) => item.kd_iuran === this.kd_iuran);
          if (this.Data.length > 0) {
            const dataItem = this.Data[0];
            this.kd_iuran = dataItem.kd_iuran;
            this.image = dataItem.bukti_iuran;
            this.kd_blok = dataItem.kd_blok;
            this.kd_penduduk = dataItem.kd_penduduk;
            this.jenis = dataItem.jenis_pembayaran;
            this.ket = dataItem.keterangan;
            this.tgl= dataItem.tgl_pembayaran;
            this.tahun= dataItem.kas_tahun;
            this.bulan= dataItem.kas_bulan;
            this.status= dataItem.status;
          } else {
            this.presentToast('Data not found', 'warning', 'alert-circle-outline');
          }
        } else if (res.msg == 'err') {
          this.presentToast(
            'Something went wrong: ' + String(res.err),
            'danger',
            'alert-circle-outline'
          );
        }
      });
    } catch (error) {
      console.error('Error in getIuran', error);
      this.presentToast(
        'Error fetching data',
        'danger',
        'alert-circle-outline'
      );
    }
  }
  
  async Update() {
    if (
      this.kd_iuran == '' &&
      this.image == '' &&
      this.kd_blok == '' &&
      this.kd_penduduk == '' &&
      this.jenis == '' &&
      this.ket == '' &&
      this.tgl == '' &&
      this.tahun == '' &&
      this.bulan == '' &&
      this.status == '' 
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
      formData.append('kd_iuran', this.kd_iuran);
      formData.append('kd_blok', this.kd_blok);
      formData.append('kd_penduduk', this.kd_penduduk);
      formData.append('jenis_pembayaran', this.jenis);
      formData.append('keterangan', this.ket);
      formData.append('tgl_pembayaran', this.tgl);
      formData.append('kas_tahun', this.tahun);
      formData.append('kas_bulan', this.bulan);
      formData.append('status', this.status);
      if (this.image !== undefined || this.image !== null) {
        formData.append('iuran_foto', this.image);
      }
      this._apiService.updateIuran(formData).then((res) => {
        if (res.msg == 'ok') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data berhasil diubah !',
            'success',
            'checkmark-circle-outline'
          );
          this.navCtrl.navigateRoot('/iuran');
        } else if (res.msg == 'notOk') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data gagal diubah !',
            'danger',
            'alert-circle-outline'
          );
        } else if (res.msg == 'err') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Something went wrong !',
            'danger',
            'alert-circle-outline'
          );
        }
      });
    }
  }
  

  ngOnInit() {
  }
  Back() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.navCtrl.navigateForward('/iuran');
  }

}
