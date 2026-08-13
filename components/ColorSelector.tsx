"use client";

import { useId } from "react";

interface ColorSelectorProps {
  readonly colors: readonly string[];
  readonly value: string;
  readonly onChange: (color: string) => void;
  readonly disabled?: boolean;
}

export function ColorSelector({
  colors,
  value,
  onChange,
  disabled = false,
}: ColorSelectorProps) {
  const selectorId = useId();

  return (
    <fieldset className="selector selector-color" disabled={disabled}>
      <legend className="selector-legend">
        COLOR
        {value && <span className="selector-current"> / {value}</span>}
      </legend>

      <div className="selector-options">
        {colors.map((color, index) => {
          const optionId = `${selectorId}-color-${index}`;
          const isSelected = value === color;

          return (
            <label
              className={`selector-option selector-color-option${
                isSelected ? " selector-option--selected" : ""
              }`}
              htmlFor={optionId}
              key={color}
            >
              <input
                className="selector-input"
                id={optionId}
                name={`${selectorId}-color`}
                type="radio"
                value={color}
                checked={isSelected}
                required
                onChange={() => onChange(color)}
              />
              <span className="selector-label">{color}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
