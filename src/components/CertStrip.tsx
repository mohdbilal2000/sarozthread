import Image from 'next/image';
import { certifications } from '@/data/company';
import bciLogo from '@/assets/site/logo-bci-trim.png';
import smetaLogo from '@/assets/site/logo-smeta-trim.png';

/* --------------------------------------------------------------------------
   CertStrip — the compliance band.

   Every Jaipur exporter this factory competes with leads with this row, so a
   buyer scanning three supplier sites in a row expects to find it. Putting it
   directly under the hero answers "can I even use this factory?" before the
   buyer has to go looking for it.

   Why this band is LIGHT on an otherwise dark site: both certification marks
   we hold files for ship with solid white backgrounds, not transparency.
   Dropped onto the void palette they read as pasted-on rectangles. Keying out
   someone else's certification mark is both fragile and not ours to do — so
   the band gets its own light ground, which also gives the long dark page a
   deliberate break.

   Two traps live in here, both already paid for once:

   1. `.section-light` redefines --color-white to #0e0e10 so that `text-white`
      headings stay legible on the light ground. That means Tailwind's
      `bg-white` resolves to near-BLACK inside this band. The plates below use
      a literal `bg-[#ffffff]`, which does not go through the token. Do not
      "tidy" it back to `bg-white`.

   2. The source PNGs carry wide blank margins, and the two marks have very
      different aspect ratios (SMETA is a 6:1 wordmark, BCI a 2.4:1 block).
      A single max-width makes SMETA look half the size of BCI. The files are
      margin-trimmed (*-trim.png) and each mark gets its own width tuned for
      matching optical weight, not matching bounding box.

   Marks render only where we hold the actual file. Disney and the Government
   of India export-house status are real (see data/company.ts) but we have no
   licensed artwork for either, and inventing a lookalike on a compliance row
   is the one place a site must not bluff. Those two render as wordmarks.
   -------------------------------------------------------------------------- */

const LOGOS: Record<string, { src: typeof bciLogo; alt: string; width: string }> = {
  smeta: {
    src: smetaLogo,
    alt: 'Sedex Members Ethical Trade Audit (SMETA)',
    width: 'w-[9.5rem] lg:w-[10.5rem]',
  },
  bci: {
    src: bciLogo,
    alt: 'Better Cotton Initiative',
    width: 'w-[5rem] lg:w-[5.5rem]',
  },
};

export function CertStrip() {
  const plates = certifications.filter((c) => c.logo && LOGOS[c.logo]);
  const wordmarks = certifications.filter((c) => !c.logo || !LOGOS[c.logo]);

  return (
    <section
      aria-labelledby="compliance-strip"
      className="section-light ruled border-b border-line py-10 lg:py-12"
    >
      <div className="shell">
        <h2 id="compliance-strip" className="text-label text-ash">
          Audited and approved by
        </h2>

        <div className="mt-7 flex flex-wrap items-center gap-x-10 gap-y-7 lg:gap-x-14">
          {plates.map((c) => {
            const mark = LOGOS[c.logo as string];
            if (!mark) return null;
            return (
              <div
                key={c.code}
                className="flex h-[4.5rem] items-center justify-center border border-line bg-[#ffffff] px-6"
              >
                <Image
                  src={mark.src}
                  alt={mark.alt}
                  sizes="200px"
                  placeholder="blur"
                  className={`${mark.width} h-auto object-contain`}
                />
              </div>
            );
          })}

          {wordmarks.map((c) => (
            <div key={c.code} className="max-w-[16rem]">
              <p className="text-d3 !text-[0.95rem] leading-tight">{c.name}</p>
              <p className="text-label mt-1.5 text-ash">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
