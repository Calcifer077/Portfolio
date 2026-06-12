`ContactPage`

#### Setting state

We are using `useState` but a object in the state.

```ts
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const [formData, setFormData] = useState<FormData>({
  name: "",
  email: "",
  subject: "",
  message: "",
});
```

In the above way we don't have to create a separate state for each name, email, subject, message.

Handling change:

```ts
const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};
```

`HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement` because we use a `input` element, a `select` element and a `text area` element. `e.target.name` comes from the input itself. We have mentioned it for each of them.

We also check if the input element is focused or not and set styling accordingly.

```ts
className={`${inputBase} ${focused === "subject" ? inputFocused : inputIdle} cursor-pointer`}
```

`focused` is tracked using state.

```ts
const [focused, setFocused] = useState<string | null>(null);
```

Styling:

```ts
const inputBase =
  "w-full bg-bg-deep border rounded px-4 py-3 font-mono text-sm text-text-primary placeholder-text-muted/40 outline-none transition-all duration-200";
const inputIdle = "border-border-subtle hover:border-primary/30";
const inputFocused =
  "border-primary/60 shadow-[0_0_0_3px_rgba(173,198,255,0.08)]";
```

We also define different states of form and display things differently according to that.

```ts
type FormState = "idle" | "loading" | "success" | "error";
```

For example, after submitting form, form goes to `success` state and displays a success message.

#### `onFocus` and `onBlur`

These are used in inputs. `onFocus` event is triggered when user is interacting with our input element. `onBlur` is triggered when user clicks anywhere that's not our input element.

## Handling form Submission (Sending mails)

Whenever the user submits the form we make a api request to our next js route located under `api/sendMail/route.ts`.

In contact page:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setFormState("loading");

  // console.log("Form submitted:", formData);

  const res = await fetch("/api/sendMail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  console.log("API response:", data);

  // Simulate API call — replace with your actual endpoint
  if (data.success) {
    setFormState("success");
  } else {
    setFormState("error");
  }
};
```

Above we only call `/api/sendMail`, we don't need to append `route.ts` after it. Depending on the result `success` or `error`, different UI will be shown to the user. The styling is similar to a `success` page, just some changes of colours.

How the `route.ts` looks like:

```ts
// app/api/sendMail/route.ts

// Function which sends the mail, is described below.
import { sendMail } from "@/app/_lib/send-mail";

// A sample request used for testing.
export async function GET() {
  return Response.json({
    success: true,
    message: "This is a GET request to sendMail API",
  });
}

// 'request' here is the request object of NextRequest. Kind of similar to Http request.
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
```

The main function which sends mails.

```ts
// _lib/send-mail.ts

import nodemailer from "nodemailer";

// You have to configure these in env.local or just .env
const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({ html }: { html: string }) {
  try {
    const isVerified = await transporter.verify();

    if (!isVerified) {
      throw new Error("SMTP Server verification failed");
    }
  } catch (error) {
    console.error(
      "Something Went Wrong",
      SMTP_SERVER_USERNAME,
      SMTP_SERVER_PASSWORD,
      error,
    );
    throw new Error("Failed to send mail");
  }
  const info = await transporter.sendMail({
    from: SMTP_SERVER_USERNAME,
    to: SITE_MAIL_RECIEVER,
    subject: "Mail from portfolio contact form",
    html: html,
  });
  console.log("Message Sent", info.messageId);
  console.log("Mail sent to", SITE_MAIL_RECIEVER);
  return info;
}
```

First we have created a transporter. Transporter connects to our email service and handles sending messages on our behalf. Than we verify if the transporter is ready to take request else we just throw a error. Than we just send a email using `transporter.sendMail`. As in this application case, emails will generally be about inquiry or work regarding me and my skills, I just send the data received to myself only. We have used `html` parameter, `html` for it is defined in `route.ts` above.

To get the required env variables, I have used google SMTP server, which you get with your gmail itself. You can activate it by setting app password for SMTP and using that in env variable. For receiver mail I have used my another gmail. For host I have used: `email-smtp.us-east-1.amazonaws.com`.

The above configuration is directly from the documentation, you can check those out below:
[Nodemailer](https://nodemailer.com/)
[Tutorial from dev.to](https://dev.to/sheraz4194/sending-emails-in-nextjs-via-nodemailer-4ai2)
