"use client";

import { useId } from "react";

interface SizeSelectorProps {
  readonly sizes: readonly string[];
  readonly value: string;
  readonly onChange: (size: string) => void;
  readonly disabled?: boolean;
}

export function SizeSelector({
  sizes,
  value,
  onChange,
  disabled = false,
}: SizeSelectorProps) {
  const selectorId = useId();

  return (
    <fieldset className="selector selector-size" disabled={disabled}>
      <legend className="selector-legend">
        TALLA
        {value && <span className="selector-current"> / {value}</span>}
      </legend>

      <div className="selector-options">
        {sizes.map((size, index) => {
          const optionId = `${selectorId}-size-${index}`;
          const isSelected = value === size;

          return (
            <label
              className={`selector-option selector-size-option${
                isSelected ? " selector-option--selected" : ""
              }`}
              htmlFor={optionId}
              key={size}
            >
              <input
                className="selector-input"
                id={optionId}
                name={`${selectorId}-size`}
                type="radio"
                value={size}
                checked={isSelected}
                required
                onChange={() => onChange(size)}
              />
              <span className="selector-label">{size}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
