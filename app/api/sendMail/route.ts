// app/api/sendMail/route.ts

import { sendMail } from "@/app/_lib/send-mail";

export async function GET() {
  return Response.json({
    success: true,
    message: "This is a GET request to sendMail API",
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Contact Form Submission</h2>

      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">Name</td>
          <td style="padding: 8px;">${body.name}</td>
        </tr>

        <tr>
          <td style="padding: 8px; font-weight: bold;">Email</td>
          <td style="padding: 8px;">${body.email}</td>
        </tr>

        <tr>
          <td style="padding: 8px; font-weight: bold;">Subject</td>
          <td style="padding: 8px;">${body.subject}</td>
        </tr>
      </table>

      <div style="margin-top: 20px;">
        <h3>Message</h3>
        <div
          style="
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            background: #f9f9f9;
          "
        >
          ${body.message}
        </div>
      </div>
    </div>
  `;

  try {
    await sendMail({
      html: html,
    });

    return Response.json({
      success: true,
      message: "Mail sent successfully",
      data: body,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error sending mail:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    console.log((error as Error).message);

    return Response.json({
      success: false,
      message: "Error sending mail",
      data: body,
    });
  }
}
