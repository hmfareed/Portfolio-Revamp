'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name (at least 2 letters).' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(2, { message: 'Please enter a short subject.' }),
  message: z.string().min(10, { message: 'Message should be at least 10 characters long.' }),
  // Honeypot field: must be empty
  website: z.string().max(0, { message: 'Spam detected' }).optional().or(z.literal('')),
});

export type ContactFormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function sendContactEmail(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
    website: (formData.get('website') as string) || '',
  };

  // Validate honeypot and inputs
  const parseResult = contactSchema.safeParse(rawData);
  if (!parseResult.success) {
    // If honeypot is triggered, reject silently
    if (rawData.website && rawData.website.trim().length > 0) {
      return {
        success: true,
        message: 'Your message has been sent successfully.',
      };
    }

    return {
      success: false,
      errors: parseResult.error.flatten().fieldErrors,
      message: 'Please review the fields in your note before sending.',
    };
  }

  const { name, email, subject, message } = parseResult.data;
  const resendApiKey = process.env.RESEND_API_KEY;
  const destinationEmail = process.env.CONTACT_RECEIVER_EMAIL || 'mohammedfareed.dev@gmail.com';

  if (!resendApiKey) {
    // Graceful fallback when user hasn't set their Resend API key yet
    console.warn(
      `[Contact Form] Note received from ${name} (${email}): "${subject}". RESEND_API_KEY is not configured yet. Set RESEND_API_KEY to send live emails.`
    );
    return {
      success: true,
      message: 'Thank you! Your note was received. (Live delivery simulated until RESEND_API_KEY is set in environment).',
    };
  }

  try {
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [destinationEmail],
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('[Resend Error]', error);
      return {
        success: false,
        message: `Failed to deliver email: ${error.message}`,
      };
    }

    return {
      success: true,
      message: 'Thank you! Your note has been stamped and delivered to my inbox.',
    };
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : 'Unknown server error';
    console.error('[Contact Action Error]', err);
    return {
      success: false,
      message: `An unexpected error occurred: ${errMessage}`,
    };
  }
}
