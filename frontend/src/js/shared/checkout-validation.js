// FreshCart — Customer & shipping validation (Phase 5C).

const REQUIRED_FIELDS = [
  ['fullName', 'Nama lengkap wajib diisi'],
  ['phone', 'Nomor telepon wajib diisi'],
  ['province', 'Provinsi wajib diisi'],
  ['city', 'Kota / kabupaten wajib diisi'],
  ['district', 'Kecamatan wajib diisi'],
  ['address', 'Alamat lengkap wajib diisi'],
  ['postalCode', 'Kode pos wajib diisi']
];

/** Accept common Indonesian phone formats: 08xx, 62xx and +62xx. */
export function isValidPhone(value) {
  const clean = String(value || '').replace(/[\s\-()]/g, '');
  return /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/.test(clean);
}

export function isValidPostalCode(value) {
  return /^\d{5}$/.test(String(value || '').trim());
}

export function isValidEmail(value) {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

/** Returns { valid, errors: { field: message } }. */
export function validateCustomer(data = {}) {
  const errors = {};
  for (const [field, message] of REQUIRED_FIELDS) {
    if (!String(data[field] ?? '').trim()) errors[field] = message;
  }
  if (String(data.phone || '').trim() && !isValidPhone(data.phone)) {
    errors.phone = 'Gunakan format nomor Indonesia, misalnya 081234567890';
  }
  if (String(data.postalCode || '').trim() && !isValidPostalCode(data.postalCode)) {
    errors.postalCode = 'Kode pos harus 5 digit angka';
  }
  if (!isValidEmail(data.email)) errors.email = 'Format email tidak valid';
  return { valid: Object.keys(errors).length === 0, errors };
}
