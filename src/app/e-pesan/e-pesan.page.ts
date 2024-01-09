import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiserviceService } from '../ApiService';
@Component({
  selector: 'app-e-pesan',
  templateUrl: './e-pesan.page.html',
  styleUrls: ['./e-pesan.page.scss'],
})
export class EPesanPage implements OnInit {

  public Data: any;
  public kd_pesan: any;
  public kd_penduduk: any;
  
  public pesan: string = '';
  public tgl_pesan: string = '';

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
      const kd_pesan = params['kd_pesan'];
      if (kd_pesan == null) {
        this.presentToast(
          'No Parameter found!',
          'warning',
          'alert-circle-outline'
        );
      } else {
        this.kd_pesan = kd_pesan;
        this.getPesan();
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

  async getPesan() {
    try {
      await this.storage.create();
      const res = await this._apiService.getPesan();

      if (res.msg === 'ok') {
        this.Data = res.data.filter(
          (item: any) => item.kd_pesan === this.kd_pesan
        );
        if (this.Data.length > 0) {
          const dataItem = this.Data[0];
      
          this.kd_penduduk = dataItem.kd_penduduk;
          this.pesan = dataItem.pesan;
          this.tgl_pesan = dataItem.tgl_pesan;
        } else {
          this.presentToast(
            'Data not found',
            'warning',
            'alert-circle-outline'
          );
        }
      } else if (res.msg === 'err') {
        this.presentToast(
          'Something went wrong: ' + String(res.err),
          'danger',
          'alert-circle-outline'
        );
      }
    } catch (error) {
      console.error('Error in getPesan', error);
      this.presentToast(
        'Error fetching data',
        'danger',
        'alert-circle-outline'
      );
    }
  }

  async updatePesan() {
    try {
      if (this.kd_penduduk === ''|| this.pesan === '' || this.tgl_pesan === '' ) {
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

        const updateData = {
          kd_penduduk: this.kd_penduduk,
          pesan: this.pesan,
          tgl_pesan: this.tgl_pesan,
        };

        const res = await this._apiService.updatePesan(updateData, this.kd_pesan);

        if (res.msg === 'ok') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data berhasil diubah !',
            'success',
            'checkmark-circle-outline'
          );

          // Update data lokal
          const updatedDataItem = this.Data[0];
          updatedDataItem.kd_penduduk = this.kd_penduduk;
          updatedDataItem.pesan = this.pesan;
          updatedDataItem.tgl_pesan = this.tgl_pesan;
         

          this.navCtrl.navigateRoot('/pesan');
        } else if (res.msg === 'notOk') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Data gagal diubah !',
            'danger',
            'alert-circle-outline'
          );
        } else if (res.msg === 'err') {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Something went wrong !',
            'danger',
            'alert-circle-outline'
          );
        }
      }
    } catch (error) {
      console.error('Error in updatePesan', error);
      this.loadingCtrl.dismiss();
      this.presentToast(
        'Error updating data',
        'danger',
        'alert-circle-outline'
      );
    }
  }

  backToBlok() {
    // Ganti 'blok' dengan path yang sesuai untuk halaman blok Anda
    this.navCtrl.navigateForward('/pesan');
  }

  ngOnInit() {}
}

