import { createServiceClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string;

    if (!file || !category) {
      return NextResponse.json(
        { error: "File and category are required" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Generate unique filename
    const timestamp = Date.now();
    const ext = file.name.split(".").pop();
    const filename = `${category}/${timestamp}-${file.name}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("brand-assets")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("brand-assets")
      .getPublicUrl(filename);

    return NextResponse.json({
      success: true,
      filename: file.name,
      path: data.path,
      url: urlData.publicUrl,
      category,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = createServiceClient();

    // List all files in the bucket
    const categories = ["logos", "colors", "typography", "inspiration", "guidelines"];
    const allFiles: Array<{ name: string; category: string; url: string; size: number }> = [];

    for (const category of categories) {
      const { data, error } = await supabase.storage
        .from("brand-assets")
        .list(category);

      if (data && !error) {
        for (const file of data) {
          const { data: urlData } = supabase.storage
            .from("brand-assets")
            .getPublicUrl(`${category}/${file.name}`);

          allFiles.push({
            name: file.name,
            category,
            url: urlData.publicUrl,
            size: file.metadata?.size || 0,
          });
        }
      }
    }

    return NextResponse.json({ files: allFiles });
  } catch (error) {
    console.error("List error:", error);
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
  }
}
