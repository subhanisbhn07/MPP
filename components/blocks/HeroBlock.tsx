interface HeroBlockProps {
  title: string;
  subtitle: string;
}

export function HeroBlock({ title, subtitle }: HeroBlockProps) {
  return (
    <section className="bg-[#FFD700] py-10 sm:py-16">
      <div className="container text-center px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
          {title}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-800">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
