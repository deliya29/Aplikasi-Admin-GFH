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
  selector: 'app-e-surat',
  templateUrl: './e-surat.page.html',
  styleUrls: ['./e-surat.page.scss'],
})
export class ESuratPage implements OnInit {
  public Data: any;
  public kd_surat_keluar: any;
  public kd_penduduk: string = '';
  public nomor_surat: string = '';
  public keterangan: string = '';
  public tanggal_surat: string = '';

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
      const kd_surat_keluar = params['kd_surat_keluar'];
      if (kd_surat_keluar == null) {
        this.presentToast(
          'No Parameter found!',
          'warning',
          'alert-circle-outline'
        );
      } else {
        this.kd_surat_keluar = kd_surat_keluar;
        this.getSurat();
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

  async getSurat() {
    try {
      await this.storage.create();
      this._apiService.getSurat().then((res: any) => {
        console.log(res.data);
        if (res.msg == 'ok') {
          this.Data = res.data.filter(
            (item: any) => item.kd_surat_keluar === this.kd_surat_keluar
          );
          if (this.Data.length > 0) {
            const dataItem = this.Data[0];
            this.kd_penduduk = dataItem.kd_penduduk;
            this.nomor_surat = dataItem.nomor_surat;
            this.keterangan = dataItem.keterangan;
            this.tanggal_surat = dataItem.tanggal_surat;
          } else {
            this.presentToast(
              'Data not found',
              'warning',
              'alert-circle-outline'
            );
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
      console.error('Error in getInfo', error);
      this.presentToast(
        'Error fetching data',
        'danger',
        'alert-circle-outline'
      );
    }
  }

  async Update() {
    try {
      if (
        this.kd_surat_keluar == '' ||
        this.kd_penduduk == '' ||
        this.nomor_surat == '' ||
        this.keterangan == '' ||
        this.tanggal_surat == ''
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

        const updateData = {
          kd_penduduk: this.kd_penduduk,
          nomor_surat: this.nomor_surat,
          keterangan: this.keterangan,
          tanggal_surat: this.tanggal_surat,
        };

        this._apiService
          .updateSurat(updateData, this.kd_surat_keluar)
          .then((res) => {
            if (res.msg == 'ok') {
              this.loadingCtrl.dismiss();
              this.presentToast(
                'Data berhasil diubah !',
                'success',
                'checkmark-circle-outline'
              );
              this.navCtrl.navigateRoot('/surat-masuk');
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
    } catch (error) {
      console.error('Error in Update', error);
      this.presentToast(
        'Error updating data',
        'danger',
        'alert-circle-outline'
      );
    }
  }

  Back() {
    // Ganti 'info' dengan path yang sesuai untuk halaman info Anda
    this.navCtrl.navigateForward('/surat-masuk');
  }

  ngOnInit() {}
}
