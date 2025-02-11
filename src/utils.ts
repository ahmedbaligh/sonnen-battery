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

export const formatDate = (date: string, locale = 'en-US') =>
  new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
