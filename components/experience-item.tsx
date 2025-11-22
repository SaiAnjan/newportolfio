interface ExperienceItemProps {
  period: string;
  title: string;
  location: string;
}

export function ExperienceItem({ period, title, location }: ExperienceItemProps) {
  return (
    <article className="px-0 md:px-0 py-4 px-3">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 pr-0 md:pr-3 order-2 md:order-1">
          <p className="text-sm font-light text-gray-500 mt-0">{period}</p>
        </div>
        <div className="w-full md:w-full pr-0 md:pr-3 order-2 md:order-1">
          <p className="pl-0 text-sm font-light leading-relaxed mb-2 mt-0">
            {title}
          </p>
          <p className="text-sm font-light text-gray-500 mt-0">{location}</p>
        </div>
      </div>
    </article>
  );
}

