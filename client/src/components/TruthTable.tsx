interface TruthTableProps {
  headers: string[];
  rows: (boolean | string)[][];
  currentInputs?: { [key: string]: boolean };
}

export function TruthTable({ headers, rows, currentInputs }: TruthTableProps) {
  const isCurrentRow = (row: (boolean | string)[]) => {
    if (!currentInputs) return false;
    return headers.slice(0, Object.keys(currentInputs).length).every((header, i) => {
      const value = currentInputs[header];
      return value !== undefined && row[i] === value;
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground font-mono bg-muted/30"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isCurrent = isCurrentRow(row);
            return (
              <tr
                key={i}
                className={`border-b border-border/50 transition-colors ${
                  isCurrent ? 'bg-primary/20' : 'hover-elevate'
                }`}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-3 py-2 text-sm font-mono tabular-nums ${
                      typeof cell === 'boolean'
                        ? cell
                          ? 'text-led-green font-semibold'
                          : 'text-led-red font-semibold'
                        : 'text-foreground'
                    }`}
                  >
                    {typeof cell === 'boolean' ? (cell ? '1' : '0') : cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
