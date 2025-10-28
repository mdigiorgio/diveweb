// src/app/privacy-policy/page.tsx

import React from "react";
import { LegalText } from "@/components/LegalText";

const privacyMarkdownSource: string = `
This Privacy Policy describes how **\${SITE_NAME}** ("we," "us," or "our")
collects, uses, and protects the personal information of visitors and users ("you")
of the website **\${WEBSITE_URL}** (the "Service"). By using our Service, you agree to the collection and use of information in accordance with this policy.

---

## 1. Information We Collect

### 1.1. Data Provided by Third-Party Authentication (Auth0 / Google)

When you log in to submit a review, we collect information from your chosen authentication provider (e.g., Google) through **Auth0**, our authentication service provider. Auth0 provides us with:

- **Identity Data:** Your name or display name.
- **Contact Data:** Your email address.
- **Profile Data:** Your profile picture or avatar URL.

This information is used only to identify you when posting reviews.

### 1.2. Content Data

When you submit a review, we collect:

- **Review Content:** The text and star rating you provide.
- **Associated Metadata:** The date and time your review was submitted.

This content is stored securely in **Supabase**, which serves as our database platform.

### 1.3. Technical and Usage Data

When you visit the site, we automatically collect limited technical data, including:

- IP address, browser type, and operating system.
- Pages visited and interactions with the site.

We use **Google Analytics** to collect anonymous, aggregated information to help us understand and improve user experience.
Cookies are used for session management and analytics.

---

## 2. How We Use Your Information

We use your information to:

- **Provide Services:** Authenticate you through Auth0 and enable review submission.
- **Review Attribution:** Publicly display your name, avatar, and review to ensure authenticity.
- **Improve the Service:** Analyze anonymous usage patterns to enhance the website.
- **Security:** Detect and prevent spam, fraud, and unauthorized access.

We do **not** sell or use your information for advertising.

---

## 3. Data Sharing & Disclosure

We may share your data only with trusted third parties who help us operate our
services, including:

- **Auth0** — for authentication and identity management.
- **Supabase** — for storing and managing review data.
- **Google Analytics** — for anonymous site usage analytics.

All third-party providers are required to protect your data and comply with
applicable privacy laws.

If we link to other websites, please note that we are not responsible for the
privacy practices of those external sites. We encourage you to review their
policies before sharing any personal information.

---

## 4. Data Retention and Security

We retain your data only as long as needed to provide our Service or until you request deletion.
We apply appropriate technical and organizational safeguards to protect your information from unauthorized access, alteration, or disclosure.

---

## 5. Your Data Rights (GDPR Compliance)

As this Service operates under the laws of Italy and the European Union, you have the following rights:

- **Right to Access:** Request a copy of your personal data.
- **Right to Rectification:** Request correction of inaccurate or incomplete information.
- **Right to Erasure ("Right to be Forgotten")**: Request deletion of your personal data, including your reviews.
- **Right to Restrict or Object:** Request to limit or object to specific processing activities.

To exercise these rights, contact us at **\${LEGAL_CONTACT_EMAIL}**.

---

## 6. International Data Transfers

Some of our service providers may process data outside the European Union. When
this occurs, we ensure that appropriate safeguards are in place.

Specifically, providers such as Auth0, Supabase, and Google Analytics rely on
the European Commission’s Standard Contractual Clauses (SCCs) or other approved
mechanisms to ensure that your personal data remains protected according to EU
standards.

This means that even if your data is processed outside the EU, it is handled in
compliance with GDPR requirements.

---

## 7. Cookies

Our website uses cookies to enhance your browsing experience.

- Essential cookies: Needed for basic website functionality.
- Analytics cookies: Help us understand how visitors use our site.
- Preference cookies: Store your language and display settings.
- Marketing cookies: May be used to deliver relevant content.

You can control or disable cookies in your browser settings. A cookie consent
banner allows you to accept or reject non-essential cookies at any time.

---

## 8. Changes to This Policy

We may update this Privacy Policy periodically.
Any updates will be posted on this page, and the “Effective Date” will be revised accordingly.

---

## 9. Data Security

We use appropriate technical and organizational measures to protect your
information from unauthorized access, alteration, or disclosure. However, no
online system is completely secure, and we cannot guarantee absolute
protection.

---

## 10. Updates to this Policy

We may update this Privacy Policy periodically to reflect changes in our
practices or legal obligations. Any updates will be posted on this page with a
revised effective date.

You have the right to access, rectify, erase, restrict, or object to the
processing of your personal data, the right to data portability, and the right
to withdraw consent at any time.

---

## 11. Contact Information

Questions about this Privacy Policy or your data rights can be sent to
**\${LEGAL_CONTACT_EMAIL}**.`;

export default function PrivacyPolicyPage() {
  return (
    <LegalText title="Privacy Policy" markdownText={privacyMarkdownSource} />
  );
}
