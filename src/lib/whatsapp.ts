export function buildWhatsAppUrl(phoneE164: string, message: string) {
  const phone = phoneE164.replace('+', '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}
