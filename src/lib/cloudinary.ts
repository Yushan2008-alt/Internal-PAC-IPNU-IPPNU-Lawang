import { v2 as cloudinary } from "cloudinary";

/**
 * Konfigurasi Server-Side Cloudinary untuk upload foto bukti kas,
 * foto kader terbaik 5 departemen, dan lampiran dokumen LPJ.
 */
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  bytes: number;
}

/**
 * Helper untuk mengunggah file Base64 / Buffer ke folder tertentu di Cloudinary
 */
export async function uploadToCloudinary(
  fileBase64: string,
  folder: "bukti_kas" | "kader_terbaik" | "lpj_docs" | "general" = "general"
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileBase64,
      {
        folder: `pac_lawang/${folder}`,
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Gagal mengunggah file ke Cloudinary"));
        } else {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            resource_type: result.resource_type,
            bytes: result.bytes,
          });
        }
      }
    );
  });
}
