// Vercel serverless function: POST /api/enquiry
// Configure in Vercel → Project → Settings → Environment Variables:
//   RESEND_API_KEY      (optional) send each enquiry as an email through Resend
//   ENQUIRY_TO_EMAIL    recipient for the email, e.g. sales@yourdomain.com
//   ENQUIRY_FROM_EMAIL  verified sender in Resend, e.g. "Nature City <noreply@yourdomain.com>"
//   ENQUIRY_WEBHOOK_URL (optional) also POST the JSON to a Google Apps Script / Zapier / CRM webhook
// At least one of the two (email or webhook) must be configured, otherwise the endpoint returns 500
// so visitors are offered the WhatsApp fallback instead of a silent failure.

const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  if (b.company) return res.status(200).json({ ok: true }); // honeypot: pretend success to bots

  const name = String(b.name || "").trim().slice(0, 120);
  const phone = String(b.phone || "").trim().slice(0, 30);
  const email = String(b.email || "").trim().slice(0, 160);
  const intent = String(b.intent || "").slice(0, 80);
  const message = String(b.message || "").trim().slice(0, 2000);
  const page = String(b.page || "").slice(0, 300);

  if (name.length < 2 || !/^[+]?[\d\s-]{8,16}$/.test(phone)) return res.status(400).json({ ok: false, error: "invalid" });

  const lead = { name, phone, email, intent, message, page, receivedAt: new Date().toISOString() };
  const jobs = [];

  if (process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL) {
    jobs.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM_EMAIL || "Nature City <onboarding@resend.dev>",
          to: process.env.ENQUIRY_TO_EMAIL.split(",").map((s) => s.trim()),
          reply_to: email || undefined,
          subject: `New enquiry — ${intent || "The Nature City"} — ${name}`,
          html: `<h2>New website enquiry</h2>
            <p><b>Name:</b> ${esc(name)}<br/><b>Phone:</b> ${esc(phone)}<br/><b>Email:</b> ${esc(email) || "—"}<br/>
            <b>Wants to:</b> ${esc(intent)}<br/><b>Message:</b> ${esc(message) || "—"}<br/><b>Page:</b> ${esc(page)}</p>`,
        }),
      }).then((r) => { if (!r.ok) throw new Error("email failed"); })
    );
  }
  if (process.env.ENQUIRY_WEBHOOK_URL) {
    jobs.push(
      fetch(process.env.ENQUIRY_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) })
        .then((r) => { if (!r.ok) throw new Error("webhook failed"); })
    );
  }

  if (!jobs.length) return res.status(500).json({ ok: false, error: "not-configured" });
  const results = await Promise.allSettled(jobs);
  const ok = results.some((r) => r.status === "fulfilled");
  return res.status(ok ? 200 : 502).json({ ok });
}
