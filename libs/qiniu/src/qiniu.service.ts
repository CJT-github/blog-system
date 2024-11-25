import { Injectable } from '@nestjs/common';
import { env } from 'process';
import * as qiniu from 'qiniu';

@Injectable()
export class QiniuService {
  private mac: qiniu.auth.digest.Mac;
  private config: qiniu.conf.Config;

  constructor() {
    //初始化七牛云SDK
    this.mac = new qiniu.auth.digest.Mac(env.ACCESS_KEY, env.SECRET_KEY);
    this.config = new qiniu.conf.Config();
    this.config.zone = qiniu.zone.Zone_z2; //根据存储区域调整 华南广东
  }

  //生成上传凭证
  getUploadToken(): string {
    const options: qiniu.rs.PutPolicyOptions = {
      scope: env.BUCKET,
      expires: 3600, //凭证有效时间
    };

    const putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(this.mac);
  }

  //上传文件
  async uploadFile(buffer: Buffer, key: string): Promise<string> {
    const uploadToken = this.getUploadToken();
    const formUploader = new qiniu.form_up.FormUploader(this.config);
    const putExtra = new qiniu.form_up.PutExtra();

    return new Promise((res, rej) => {
      formUploader.put(
        uploadToken,
        key,
        buffer,
        putExtra,
        (err, body, info) => {
          if (err) {
            rej(err);
          } else if (info.statusCode === 200) {
            res(`${env.DOMAIN}/${body.key}`);
          } else {
            rej(body);
          }
        },
      );
    });
  }
}
