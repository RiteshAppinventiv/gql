"use strict";

import { ConfigService } from "@nestjs/config";
import { deleteFiles } from "./app.utils";
import * as randomstring from "randomstring";
import { GetObjectCommand, PutObjectCommand, PutObjectRequest, S3Client } from "@aws-sdk/client-s3";
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const AWS = require("aws-sdk"),
	fs = require("fs");


export class UploadUtil {

	constructor(
        private readonly configService: ConfigService,
    ) {
	}

	imageFilter(fileName: string) {
		// accept image only
		if (!fileName.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
			return false;
		}
		return true;
	}

	videoFilter(fileName: string) {
		// accept video only
		if (!fileName.toLowerCase().match(/\.(mp4|flv|mov|avi|wmv)$/)) {
			return false;
		}
		return true;
	}

	audioFilter(fileName: string) {
		// accept video only
		if (!fileName.toLowerCase().match(/\.(mp3|aac|aiff|m4a|ogg)$/)) {
			return false;
		}
		return true;
	}

	pdfNameChange(fileName, contentType){
		if (contentType ==='application/pdf') {
			if (fileName.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
				fileName =  fileName.replace(/\.(jpg|jpeg|png|gif)$/, '.pdf' )
			}
		}
		return fileName
	}
	/**
	 * @function uploadImage 
	 * @description This Function is used to uploading image to S3 Server
	*/
	private async _uploadToS3(fileName, fileBuffer, contentType) {
		try {
			if (contentType === 'application/pdf'){
				fileName = this.pdfNameChange(fileName, contentType);
			}
			return await new Promise(async (resolve, reject) => {
				AWS.config.update({
					region: 'us-east-1',
					// accessKeyId: process.env['AWS_ACCESS_KEY'],
					// secretAccessKey: process.env['AWS_SECRET_KEY']
				});
				const s3 = new AWS.S3({ params: { Bucket: process.env['S3_BUCKET_NAME'] } });
				await s3.upload({
					Key: String(fileName),
					Body: fileBuffer,
					ContentType: contentType,
					Bucket: process.env['S3_BUCKET_NAME'],
					// ACL: 'private'
				}, (error, data) => {
					if (error) {
						console.log("Upload failed: ", error);
						reject(error);
					} else{
						resolve(data);
					}		
				});
			});
		} catch (error) {
			throw error;
		}
	}

	// /**
	//  * @function uploadSingleMediaToS3 
	//  * @description This Function is used to upload single image to S3 Server
	// */
	// uploadSingleMediaToS3(file) {
	// 	return new Promise((resolve, reject) => {
	// 		if (this.imageFilter(file) || this.videoFilter(file) || this.audioFilter(file)) {
	// 			const filePath = `${this.configService.get('UPLOAD_DIR')}${file}`;
	// 				fs.readFile(filePath, (error, fileBuffer) => {
	// 					if (error) {
	// 						reject(error);
	// 					}
	// 					let contentType;
	// 					if (this.imageFilter(file)) {
	// 						contentType = "image/png";
	// 					} else if (this.videoFilter(file)) {
	// 						contentType = "video/mp4";
	// 					} else if (this.audioFilter(file)) {
	// 						contentType = "audio/mpeg";
	// 					} else {
	// 						contentType = "image/png";
	// 					}
	// 					console.log(file, fileBuffer, contentType);
						
	// 					this._uploadToS3(file, fileBuffer, contentType)
	// 						.then((data: any) => {
	// 							deleteFiles(filePath);
	// 							const location = data.Location;
	// 							resolve(location);
	// 						})
	// 						.catch((error) => {
	// 							reject(error);
	// 						});
	// 				});
	// 			// });
	// 		} else {
	// 			reject(new Error("Invalid file type!"));
	// 		}
	// 	});
	// }
	/**
	 * @function 
	 * @description uploadCsvToS3 This Function is used to upload single image to S3 Server
	*/
	uploadCsvToS3(fullPath,fileName) {
		return new Promise(async (resolve, reject) => {
			const fileBuffer = await fs.readFileSync(fullPath);
			fileName = new Date().getTime() + "_" + randomstring.generate(5) + "_" + fileName;
			this._uploadToS3(fileName, fileBuffer, "text/csv")
				.then((data: any) => {
					deleteFiles(fullPath);
					const location = data.Location;
					resolve(location);
				})
				.catch((error) => {
					reject(error);
				});
		});
        
	}

		/**
	 * @function uploadSingleMediaToS3 
	 * @description This Function is used to upload single image to S3 Server
	*/
	uploadSingleMediaToS3(file,fullPath) {
		return new Promise((resolve, reject) => {
					fs.readFile(file.path, (error, fileBuffer) => {
						if (error) {
							reject(error);
						}
						this._uploadToS3(file.originalname, fileBuffer, file.mimetype)
							.then((data: any) => {
								deleteFiles(fullPath);	
								const location = data.Location;
								resolve(location);
							})
							.catch((error) => {
								reject(error);
							});
					});
				// });
		});
	}
	/**
	 * @function deleteFromS3
	 * @description Delete file from s3
	 * @param filename 
	 * @returns 
	 */
	deleteFromS3(filename) {
		filename = filename.split("/").slice(-1)[0];
		AWS.config.update({
			region: 'us-east-1',
			// accessKeyId: process.env['AWS_ACCESS_KEY'],
			// secretAccessKey: process.env['AWS_SECRET_KEY']
		});
		const s3 = new AWS.S3({ params: { Bucket: process.env['S3_BUCKET_NAME'] } });
		return new Promise(function (resolve, reject) {
			const params = {
				Bucket: process.env['S3_BUCKET_NAME'],
				Key: filename
			};
			s3.deleteObject(params, function (error, data) {
				console.log(error, data);
				if (error) {
					reject(error);
				} else {
					resolve(data);
				}
			});
		});
	}

	/**
	 * @function 
	 * @description uploadImageFromPath This Function is used to upload single image to S3 Server
	*/
	uploadImageFromPath(fullPath,fileName) {
		return new Promise(async (resolve, reject) => {
			const fileBuffer = await fs.readFileSync(fullPath);
			// fileName = new Date().getTime() + "_" + randomstring.generate(5) + "_" + fileName;
			this._uploadToS3(fileName, fileBuffer, "image/png")
				.then((data: any) => {
					deleteFiles(fullPath);
					const location = data.Location;
					resolve(location);
				})
				.catch((error) => {
					reject(error);
				});
		});
        
	}




	/**
   * @function createUploadPreSignedUrl
   * @description Generates a presigned URL for uploading an object to S3 with specific metadata
   * @param fileName - The filename of the object in the S3 bucket
   * @param expiration - The expiration time for the presigned URL (in milliseconds), default is 5 minutes
   * @returns Promise<string> - The presigned URL for uploading
   */
	async createUploadPreSignedUrl(fileName: string, expiration = 5 * 60 * 1000): Promise<string> {
		const s3Bucket = process.env['S3_BUCKET_NAME']
		const s3AWSRegion = process.env['S3_REGION']

		const [bucketName, bucketKey] = s3Bucket.split('/');

		const fileKeyName = bucketKey+'/'+fileName

		const objectParams: PutObjectRequest = {
			Bucket: bucketName,
			Key: fileKeyName,
			ACL: 'public-read'
		};

		const s3client = new S3Client({ region: s3AWSRegion });
		const putCommand = new PutObjectCommand(objectParams);
		return getSignedUrl(s3client, putCommand, { expiresIn: expiration });
	}


	async createDownloadPreSignedUrl(fileName: string, expiration = 5 * 60 * 1000): Promise<string> {
		const s3Bucket = process.env['S3_BUCKET_NAME']
		const s3AWSRegion = process.env['S3_REGION']

		const [bucketName, bucketKey] = s3Bucket.split('/');
		const fileKeyName = bucketKey + '/' + fileName

		const objectParams = {
			Bucket: bucketName,
			Key: fileKeyName,
			ResponseContentDisposition: `attachment; filename="${fileName}"`
		};

		const s3ClientOptions: any = { region: s3AWSRegion };

		if (process.env['transferAccelaration']) {
			s3ClientOptions.useAccelerateEndpoint = true;
		}

		const s3client = new S3Client(s3ClientOptions);
		const getCommand = new GetObjectCommand(objectParams);
		return getSignedUrl(s3client, getCommand, { expiresIn: expiration });
	}



}
