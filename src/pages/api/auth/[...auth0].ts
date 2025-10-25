// src/pages/api/auth/[...auth0].ts

import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default handleAuth({
  /**
   * This top-level onError handler intercepts errors from ALL auth routes
   * (login, logout, callback, etc.)
   */
  async onError(req: NextApiRequest, res: NextApiResponse, error: Error) {
    // Check if this error happened during the callback and is 'access_denied'
    if (
      req.url?.includes("/api/auth/callback") &&
      error.message.includes("access_denied")
    ) {
      // Get your app's base URL from environment variables
      const baseUrl = process.env.AUTH0_BASE_URL || "http://localhost:3000";

      // Redirect the user back to the review box anchor
      res.redirect(`${baseUrl}/#review-box`);
      return; // Stop execution
    }

    // For all other errors, redirect to the default Auth0 error page.
    // You can customize this by redirecting to your own /pages/error.js
    const baseUrl = process.env.AUTH0_BASE_URL || "http://localhost:3000";
    const errorUrl = new URL("/api/auth/error", baseUrl);
    errorUrl.searchParams.set("error", error.name);
    errorUrl.searchParams.set("error_description", error.message);

    res.redirect(errorUrl.toString());
  },

  /**
   * This handles the /api/auth/callback route
   * We still need this, but the error handling is moved outside.
   */
  callback: handleCallback({
    // You can put other callback-specific options here if needed,
    // like `afterCallback`.
  }),

  // Other handlers like login, logout, etc., would also go here
  // if you needed to customize them.
});
