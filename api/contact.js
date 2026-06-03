const MAX_FIELD = 4000;
const REQUIRED = ["name", "email", "organization", "country", "deploymentTarget", "message"];

function parseBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return Object.fromEntries(new URLSearchParams(req.body));
    }
  }
  return {};
}

function clean(value, limit = MAX_FIELD) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function wantsJson(req) {
  return String(req.headers.accept || "").includes("application/json");
}

function send(req, res, status, payload) {
  if (wantsJson(req)) {
    res.status(status).json(payload);
    return;
  }
  res.status(status).setHeader("content-type", "text/html; charset=utf-8");
  res.end(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Project Sovereign contact</title></head><body><main style="font-family:system-ui,sans-serif;max-width:680px;margin:10vh auto;padding:24px"><h1>${status < 400 ? "Request received" : "Request not sent"}</h1><p>${payload.message || payload.error}</p><p><a href="/contact">Return to contact</a></p></main></body></html>`);
}

module.exports = async function handler(req, res) {
  res.setHeader("x-content-type-options", "nosniff");

  if (req.method === "OPTIONS") {
    res.setHeader("allow", "POST, OPTIONS");
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("allow", "POST, OPTIONS");
    send(req, res, 405, { error: "Only POST requests are accepted." });
    return;
  }

  const raw = parseBody(req);
  const honeypot = clean(raw.website, 200);
  if (honeypot) {
    send(req, res, 400, { error: "The request could not be accepted." });
    return;
  }

  const fields = {
    name: clean(raw.name, 120),
    email: clean(raw.email, 180).toLowerCase(),
    organization: clean(raw.organization, 180),
    country: clean(raw.country, 120),
    deploymentTarget: clean(raw.deploymentTarget, 120),
    message: clean(raw.message, MAX_FIELD),
    role: clean(raw.role, 120),
    usersRange: clean(raw.usersRange, 80),
    needs: clean(raw.needs, 240),
    sourcePath: clean(raw.sourcePath, 240) || "/contact",
  };

  const missing = REQUIRED.filter((field) => !fields[field]);
  if (missing.length) {
    send(req, res, 400, { error: `Missing required field: ${missing.join(", ")}.` });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    send(req, res, 400, { error: "Enter a valid email address." });
    return;
  }

  const consent = raw.consent === true || raw.consent === "true" || raw.consent === "on";
  if (!consent) {
    send(req, res, 400, { error: "Consent is required before sending a deployment review request." });
    return;
  }

  const webhookUrl = process.env.NATOROS_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    send(req, res, 503, { error: "The contact webhook is not configured. Please try again later." });
    return;
  }

  const payload = {
    source: "projectsovereign.eu",
    type: "deployment_request",
    submittedAt: new Date().toISOString(),
    contact: {
      name: fields.name,
      email: fields.email,
      role: fields.role || undefined,
    },
    organization: {
      name: fields.organization,
      country: fields.country,
      usersRange: fields.usersRange || undefined,
    },
    requirements: {
      deploymentTarget: fields.deploymentTarget,
      needs: fields.needs || undefined,
    },
    message: fields.message,
    metadata: {
      sourcePath: fields.sourcePath,
      userAgent: clean(req.headers["user-agent"], 500),
      ip:
        clean(req.headers["x-forwarded-for"], 200).split(",")[0] ||
        clean(req.socket && req.socket.remoteAddress, 80),
    },
  };

  const headers = { "content-type": "application/json" };
  if (process.env.NATOROS_CONTACT_WEBHOOK_SECRET) {
    headers.authorization = `Bearer ${process.env.NATOROS_CONTACT_WEBHOOK_SECRET}`;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }

    send(req, res, 200, {
      ok: true,
      message: "Request sent. We will respond through the contact details provided.",
    });
  } catch (error) {
    console.error("NatorOS contact webhook failed", error);
    send(req, res, 502, {
      error: "The request could not be forwarded right now. Please try again later.",
    });
  }
};
