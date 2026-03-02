export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

      <p className="mb-2">📞 Phone: +91 7668392051</p>
      <p className="mb-2">📞 Phone: +91 7380785853</p>
      <p className="mb-2">📧 Email: satishchandrakesarwani94@gmail.com</p>

      <p className="mt-4">
        📍 Shop Location:
        <a
          href="https://maps.app.goo.gl/JhYW42ZayHViGgLP8"
          target="_blank"
          className="text-blue-600 ml-2 underline"
        >
          View on Google Maps
        </a>
      </p>
    </div>
  );
}