export async function POST(request: Request) {
  const formData = await request.formData();
  const imageBlob = formData.get("file");

  if (!imageBlob) {
    return new Response(JSON.stringify({ error: "이미지가 없습니다." }), {
      status: 400,
    });
  }

  const cloudinaryForm = new FormData();
  cloudinaryForm.append("file", imageBlob);

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
    return new Response(JSON.stringify({ error: "업로드 실패" }), {
      status: 500,
    });
  }

  const data = await response.json();
  return new Response(JSON.stringify({ imageUrl: data.url }), {
    status: 200,
  });
}
