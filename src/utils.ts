type ConditionalClassName = Record<string, boolean>;

type ClassName = string | ConditionalClassName;

export const cn = (...classNames: ClassName[]) => {
  let fullClassName = '';

  for (const className of classNames) {
    if (typeof className === 'string') {
      fullClassName += ` ${className}`;
      continue;
    }

    Object.entries(className).forEach(([className, shouldInclude]) => {
      if (!shouldInclude) return;

      fullClassName += ` ${className}`;
    });
  }

  return fullClassName;
};

export const formatDate = (date: string, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  }).format(new Date(date));

export const toTitleCase = (text: string) =>
  text
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
