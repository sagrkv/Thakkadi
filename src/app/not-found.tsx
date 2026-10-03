import Link from 'next/link';
export default function NotFound() {
  return <div className="content-page reading-page"><div className="content-heading"><p className="eyebrow">404 · Page not found</p><h1>Let’s get you to the right place.</h1><p>This address does not match a page. Choose a calculator or browse the legal library.</p></div><div className="recovery-links"><Link className="btn-primary" href="/">Browse calculators</Link><Link className="btn-secondary" href="/laws">Legal library</Link></div></div>;
}
