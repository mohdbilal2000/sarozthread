import Link from 'next/link';
import { ArrowRight } from '@/components/Icons';
import { capabilities } from '@/data/capabilities';
import { productCategories } from '@/data/products';

export default function NotFound() {
  return (
    <section className="ruled grid min-h-[70svh] place-items-center py-24">
      <div className="shell max-w-[48rem] text-center">
        <p className="text-num text-[clamp(5rem,18vw,14rem)] text-signal">404</p>
        <h1 className="text-d1 mt-8">That page has been unpicked</h1>
        <p className="mx-auto mt-7 max-w-[46ch] text-smoke">
          The page you were looking for is not here. Try the factory, a capability, a product
          category, or get in touch directly.
        </p>
        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          <li>
            <Link href="/factory" className="tag">
              Factory
            </Link>
          </li>
          {capabilities.slice(0, 3).map((c) => (
            <li key={c.slug}>
              <Link href={`/capabilities/${c.slug}`} className="tag">
                {c.name}
              </Link>
            </li>
          ))}
          {productCategories.slice(0, 2).map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}`} className="tag">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn">
            Back to the front page <ArrowRight />
          </Link>
          <Link href="/faq" className="btn btn-outline">
            Read the FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}
