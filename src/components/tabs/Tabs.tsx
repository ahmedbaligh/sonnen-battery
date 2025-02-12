import { cn, toTitleCase } from '../../utils';

import './Tabs.css';

interface TabsProps<T extends string> {
  items: T[] | readonly T[];
  onSelect: (item: T) => void;
  activeItem: T;
  className?: string;
}

export const Tabs = <T extends string>(props: TabsProps<T>) => (
  <div className="tabs">
    {props.items.map(item => (
      <button
        key={item}
        title={toTitleCase(item)}
        className={cn('tab', {
          active: item === props.activeItem,
        })}
        onClick={() => props.onSelect(item)}
      >
        {toTitleCase(item)}
      </button>
    ))}
  </div>
);
