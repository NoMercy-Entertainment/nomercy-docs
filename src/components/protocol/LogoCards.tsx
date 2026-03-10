import { Button } from './Button';
import { Heading } from '../Heading';

// Props for individual LogoCard
export interface LogoCardProps {
  name: string;
  href: string;
  logo: string;
  description: string;
}

// Individual logo card component
export function LogoCard({ name, href, logo, description }: LogoCardProps) {
  return (
    <div className="flex flex-row-reverse gap-6">
      <div className="flex-auto">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
          {name}
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        <p className="mt-4">
          <Button href={href} variant="text" arrow="right">
            Read more
          </Button>
        </p>
      </div>
      {logo && (
        <img
          src={logo}
          alt=""
          className="h-12 w-12"
        />
      )}
    </div>
  );
}

// Helper to generate id from heading text
function headingToId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Container component that renders children
export function LogoCards({ children, heading = 'Libraries' }: { children?: React.ReactNode; heading?: string; }) {
  const id = headingToId(heading);

  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id={id}>
        {heading}
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3 dark:border-white/5">
        {children}
      </div>
    </div>
  );
}
