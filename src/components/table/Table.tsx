import { useState } from 'react';

import './Table.css';

interface TableProps {
  columns: string[];
  data: string[][];
}

export function Table({ columns, data }: TableProps) {
  const [isCountMismatch] = useState(() => {
    const count = columns.length;
    return data.some(row => row.length !== count);
  });

  if (isCountMismatch) {
    throw new Error(
      `Data does not match column count. Check the length of \`columns\` prop and each row in the \`data\` prop.`
    );
  }

  return (
    <article role="table" className="table" style={{ '--columns': columns.length } as React.CSSProperties}>
      <header className="table-header table-row">
        {columns.map(column => (
          <p key={column} className="table-cell">
            {column}
          </p>
        ))}
      </header>

      {data.map((row, index) => (
        <div key={index} className="table-row">
          {row.map((cell, i) => (
            <p key={`${cell}${i}`} className="table-cell">
              {cell}
            </p>
          ))}
        </div>
      ))}
    </article>
  );
}
