import { Router, type IRouter, type Request, type Response } from "express";
import { RegisterPushTokenBody, SendTestNotificationBody } from "@workspace/api-zod";
import { db, pushTokensTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.post("/push-tokens", async (req: Request, res: Response) => {
  const parsed = RegisterPushTokenBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { token, platform } = parsed.data;

  try {
    const existing = await db
      .select()
      .from(pushTokensTable)
      .where(eq(pushTokensTable.token, token))
      .limit(1);

    if (existing.length > 0) {
      const row = existing[0]!;
      res.status(201).json({ id: row.id, token: row.token, platform: row.platform });
      return;
    }

    const [row] = await db
      .insert(pushTokensTable)
      .values({ token, platform })
      .returning();

    res.status(201).json({ id: row!.id, token: row!.token, platform: row!.platform });
  } catch (err) {
    res.status(500).json({ error: "Failed to register push token" });
  }
});

router.post("/push-tokens/send-test", async (req: Request, res: Response) => {
  const parsed = SendTestNotificationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { token, title = "UtilityHub", body = "Try the new Tax Calculator!" } = parsed.data;

  try {
    const message = {
      to: token,
      sound: "default" as const,
      title,
      body,
      data: { type: "test" },
    };

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const receipt = await response.json();
    res.json({ status: "sent", receipt });
  } catch {
    res.status(500).json({ error: "Failed to send notification" });
  }
});

export default router;
