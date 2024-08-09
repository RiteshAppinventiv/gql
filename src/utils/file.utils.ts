"use strict";

import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { deleteFiles } from "./app.utils";
import { UploadUtil } from "./upload.utils";
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffProbePath = require('ffprobe-static');
console.log(ffProbePath.path);

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffProbePath.path);

@Injectable()
export class ThumbnailUtil{

  constructor(
    private readonly configService: ConfigService,
    private readonly uploadUtils: UploadUtil
  ) {
  }

  async generateThumbnail(file) {
    
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg.setFfprobePath(ffProbePath.path);
    return new Promise( async (res, rej) => { 
      try { 
        let fullPath = (`${this.configService.get('UPLOAD_DIR')}` + file.filename);
        let tFullDir = (`${this.configService.get('UPLOAD_DIR')}`);
        let tFileName = `${file.filename}_thumbnail.png`
        const tFullPath = (`${this.configService.get('UPLOAD_DIR')}` + tFileName);
        ffmpeg(fullPath).screenshots({
          count: 1,
          filename: tFileName,
          folder: tFullDir,
        }).on('end', async () => { 
          let tFileName = `${file.filename}_thumbnail.png`
          const tFullPath =  (`${this.configService.get('UPLOAD_DIR')}` + tFileName);
          const tUrl = await this.uploadUtils.uploadImageFromPath(tFullPath, tFileName);
          res({tUrl})
          
  
        });
        // return {tFullPath, tFileName}
  
      } catch (e) {
        rej(null)
      }
    })
    
    
  }
  
}
