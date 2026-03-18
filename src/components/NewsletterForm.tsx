"use client";

export default function NewsletterForm() {
  return (
    <form className="flex gap-0" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="YOUR@EMAIL.COM"
        className="flex-1 bg-[#0a0a0a] border border-[#222] px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#f97316] tracking-wider"
      />
      <button type="submit" className="btn-primary" style={{ clipPath: "none" }}>
        SUBSCRIBE
      </button>
    </form>
  );
}
