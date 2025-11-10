interface HeroBlockProps {
  title: string;
  subtitle: string;
}

export function HeroBlock({ title, subtitle }: HeroBlockProps) {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
          {title}
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
