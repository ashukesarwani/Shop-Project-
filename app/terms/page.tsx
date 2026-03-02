export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

      <p className="mb-4">
        By using this website, you agree to our terms and conditions.
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Prices are subject to change without notice.</li>
        <li>Orders are confirmed via WhatsApp.</li>
        <li>Products are subject to availability.</li>
        <li>We reserve the right to cancel suspicious orders.</li>
      </ul>
    </div>
  );
}