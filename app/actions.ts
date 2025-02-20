"use server";

import { ServerActionError } from "@/lib/error";

export async function uploadTechStackImage(
  formData: FormData,
): Promise<{ imageUrl: string } | ServerActionError> {
  const imageFile = formData.get("file");

  if (!imageFile) {
    return {
      error: "no tech stack image",
    };
  }

  const cloudinaryForm = new FormData();
  cloudinaryForm.append("file", imageFile!);

  const uploadPreset = process.env.UPLOAD_PRESET!;
  cloudinaryForm.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: cloudinaryForm,
    },
  );

  if (!response.ok) {
    return {
      error: "failed to upload image",
    };
  }

  const data = await response.json();

  return { imageUrl: data.secure_url };
}
