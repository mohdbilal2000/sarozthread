import { PageHero, Section } from '@/components/blocks';

export function LegalPage({
  kicker,
  title,
  lede,
  updated,
  trail,
  children,
}: {
  kicker: string;
  title: string;
  lede?: string;
  updated: string;
  trail: { name: string; href: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero kicker={kicker} title={title} lede={lede} trail={trail} />
      <Section>
        <div className="shell max-w-[56rem]">
          <p className="text-label text-ash">Last updated {updated}</p>
          <div className="prose mt-10">{children}</div>
        </div>
      </Section>
    </>
  );
}
