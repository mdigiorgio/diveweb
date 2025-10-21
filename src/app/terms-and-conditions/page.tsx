// src/app/terms-and-conditions/page.tsx

import React from "react";
import { LegalText } from "@/components/LegalText";

const termsMarkdownSource: string = `
## 1. Acceptance of Terms

By accessing and using the website **\${WEBSITE_URL}** (the "Service"), you agree to be bound by these Terms and Conditions ("Terms").
If you do not agree to these Terms, you may not access or use the Service.
By submitting a review or creating an account, you also acknowledge that you have read and agree to these Terms and our Privacy Policy.

## 2. Content and Intellectual Property Rights

### 2.1 Our Intellectual Property

The Service and all original content, features, and functionality (including all text, images, designs, and code) are and will remain the exclusive property of **\${SITE_NAME}** (operated by Michele Di Giorgio) and are protected by copyright and other intellectual property laws.

### 2.2 User-Submitted Review Content

You retain all rights to the review content (text and rating) you submit to the Service.
By submitting a review, you grant us a **non-exclusive, worldwide, royalty-free, perpetual, and irrevocable license** to use, reproduce, modify, adapt, publish, display, and distribute that content on and through the Service and in promotional materials.

You confirm that your submitted content is your own work and does not infringe upon the rights of any third party.
You may request the deletion of your review and associated personal data at any time by contacting **\${LEGAL_CONTACT_EMAIL}**.

## 3. Rules of Conduct (Reviews)

You agree not to use the Service to submit or publish any review content that is:

* Unlawful, harmful, threatening, defamatory, obscene, or harassing.
* Infringing on the intellectual property or privacy rights of any person.
* Used for spamming, commercial solicitation, or unauthorized advertising.
* Impersonating any person or entity or misrepresenting your identity.

We reserve the right to **moderate, edit, remove, or refuse** any review content that violates these Terms or is deemed inappropriate.

## 4. Account Termination

We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms.
You may also request deletion of your account and related data at any time, in accordance with our Privacy Policy.

## 5. Disclaimer and Limitation of Liability

### 5.1 "As Is" Basis

Your use of the Service is at your sole risk. The Service is provided on an **"AS IS"** and **"AS AVAILABLE"** basis.
We make no warranties of any kind regarding the accuracy, reliability, or availability of the Service or any content therein.

### 5.2 Limitation of Liability

In no event shall **\${SITE_NAME}**, nor its owner, be liable for any direct, indirect, incidental, special, consequential, or punitive damages — including, without limitation, loss of profits, data, use, goodwill, or other intangible losses — arising from your access to or use of the Service.

## 6. Governing Law

These Terms shall be governed and construed in accordance with the laws of **\${JURISDICTION}**, without regard to its conflict of law provisions.

## 7. Contact Information

Questions about these Terms and Conditions should be sent to us at **\${LEGAL_CONTACT_EMAIL}**.

## 8. Cookies and Tracking Technologies

We use a minimal number of cookies and similar technologies for the following purposes:

* **Authentication Cookies** — Set automatically by **Auth0** to maintain your secure login session.
* **Analytics Cookies** — Used by **Google Analytics** to collect anonymous usage data, helping us understand how visitors interact with the site.

No cookies are used for marketing, advertising, or third-party profiling.
You can control or delete cookies at any time through your browser settings.`;

export default function TermsAndConditionsPage(): React.ReactElement {
  return (
    <LegalText
      title="Terms And Conditions"
      markdownText={termsMarkdownSource}
    />
  );
}
