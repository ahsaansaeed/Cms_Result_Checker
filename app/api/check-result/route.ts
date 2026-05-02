import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url || !url.startsWith("https://cms.must.edu.pk")) {
    return NextResponse.json({ exists: false, error: "Invalid URL" }, { status: 400 });
  }

  try {
    // We use a HEAD request to check if the image exists without downloading it
    const response = await fetch(url, { 
      method: "HEAD",
      // Short timeout to avoid hanging
      signal: AbortSignal.timeout(5000) 
    });
    
    return NextResponse.json({ 
      exists: response.ok, 
      status: response.status 
    });
  } catch (error) {
    console.error("API check error:", error);
    return NextResponse.json({ 
      exists: false, 
      error: "Could not reach the CMS server. This might be due to a network restriction on port 8082." 
    }, { status: 502 });
  }
}
