/** Runtime configuration, all from the environment (.env on the box, .env.local in development). */
export const env = {
  mediaPublicUrl: () => process.env.MEDIA_PUBLIC_URL ?? "http://localhost:3300/uploads",
  r2: () => {
    const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = process.env;
    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET) return null;
    return { accountId: R2_ACCOUNT_ID, accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY, bucket: R2_BUCKET };
  },
  deployHookUrl: () => process.env.DEPLOY_HOOK_URL || null,
  access: () => {
    const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN;
    const aud = process.env.CF_ACCESS_AUD;
    return teamDomain && aud ? { teamDomain, aud } : null;
  },
  isDevelopment: () => process.env.NODE_ENV === "development",
  devEmail: () => process.env.ADMIN_DEV_EMAIL ?? "dev@oylab.uz",
};
