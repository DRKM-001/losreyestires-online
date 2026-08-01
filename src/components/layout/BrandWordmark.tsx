import { cn } from '@/lib/utils';

interface BrandWordmarkProps {
  inverse?: boolean;
  size?: 'header' | 'footer';
}

export function BrandWordmark({ inverse = false, size = 'header' }: BrandWordmarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block whitespace-nowrap font-sans font-black leading-none tracking-[-0.045em]',
        size === 'footer' ? 'text-3xl' : 'text-lg sm:text-2xl',
        inverse ? 'text-white' : 'text-zinc-950'
      )}
    >
      Los Reyes Tires
    </span>
  );
}
