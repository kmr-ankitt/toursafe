export default function encrypt(data: string): string {
  // Simple base64 encoding for demonstration purposes
  return Buffer.from(data).toString('base64');
}