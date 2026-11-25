/**
 * Emails a booking / inquiry to the business inbox.
 *
 * The site is static (GitHub Pages), so there is no server of our own to send mail.
 * FormSubmit (https://formsubmit.co) relays the form to the inbox below — no API key,
 * but the inbox owner must click the activation link FormSubmit sends on the very
 * first submission. Until then nothing is delivered.
 */

export const BOOKING_INBOX = 'wonderlanka.experiences@gmail.com';

const ENDPOINT = `https://formsubmit.co/ajax/${BOOKING_INBOX}`;
const TIMEOUT_MS = 20000;

export interface BookingDetails {
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  travelDates: string;
  numGuests: number;
  tourType: string;
  destinations: string[];
  message: string;
}

export async function sendBookingEmail(booking: BookingDetails): Promise<void> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        // Underscore fields are FormSubmit settings, the rest become rows in the email
        _subject: `New booking inquiry: ${booking.tourType} — ${booking.name} (${booking.country})`,
        _template: 'table',
        _replyto: booking.email,
        Name: booking.name,
        Email: booking.email,
        WhatsApp: booking.whatsapp,
        Country: booking.country,
        'Travel dates': booking.travelDates,
        Guests: String(booking.numGuests),
        'Tour type': booking.tourType,
        Destinations: booking.destinations.length ? booking.destinations.join(', ') : 'Not selected',
        Message: booking.message,
      }),
    });

    const data = await res.json().catch(() => null);
    // FormSubmit answers 200 with success "false" for rejected submissions
    if (!res.ok || !data || String(data.success) !== 'true') {
      throw new Error(data?.message || `Email service responded with ${res.status}`);
    }
  } finally {
    window.clearTimeout(timer);
  }
}

export const BOOKING_WHATSAPP_NUMBER = '94771958093';

/** wa.me link that opens a chat with the office, with the booking already typed in. */
export function buildBookingWhatsAppUrl(booking: BookingDetails): string {
  const lines = [
    'Hello Wonder Lanka Experience! I would like to book a tour.',
    '',
    `*Name:* ${booking.name}`,
    `*Country:* ${booking.country}`,
    `*Email:* ${booking.email}`,
    `*WhatsApp:* ${booking.whatsapp}`,
    `*Tour type:* ${booking.tourType}`,
    `*Travel dates:* ${booking.travelDates}`,
    `*Guests:* ${booking.numGuests}`,
    `*Destinations:* ${booking.destinations.length ? booking.destinations.join(', ') : 'Not selected'}`,
  ];
  if (booking.message.trim()) lines.push('', `*Message:* ${booking.message.trim()}`);
  return `https://wa.me/${BOOKING_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
