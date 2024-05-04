import { Resend } from "resend";
import { Email } from "@/components/magic-link-email";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function sendVerificationRequest(params: {
  identifier: string;
  url: string;
  provider: any;
}) {
  const { identifier: to, provider, url } = params;
  const { host } = new URL(url);
  await resend.emails.send({
    from: provider.from,
    to,
    subject: `🗄️ PDF-AI - Sign in to ${host}`,
    react: Email({ url }),
    text: text({ url, host }),
  });
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
