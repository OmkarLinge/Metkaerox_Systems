import type { Product } from "@/data/company";

const PRIMARY_SPEC_PRIORITY = [
  "Max Lift",
  "Max Payload",
  "Payload",
  "Tank Capacity",
  "Tank",
  "Water Tank",
  "Coverage",
  "Pressure",
  "Tether Length",
  "Weight",
  "Power",
  "Motors",
  "Temp Resist",
] as const;

const RANGE_LABELS = ["Range", "Coverage"] as const;

export function toRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const safeHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((value) => value + value)
          .join("")
      : normalized;

  const numeric = Number.parseInt(safeHex, 16);
  const red = (numeric >> 16) & 255;
  const green = (numeric >> 8) & 255;
  const blue = numeric & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

export function getRelativeIndex(index: number, activeIndex: number, length: number) {
  let relativeIndex = index - activeIndex;

  if (relativeIndex > length / 2) {
    relativeIndex -= length;
  }

  if (relativeIndex < -length / 2) {
    relativeIndex += length;
  }

  return relativeIndex;
}

export function formatStageIndex(index: number) {
  return `${index + 1}`.padStart(2, "0");
}

function getSpecPriority(label: string) {
  const priority = PRIMARY_SPEC_PRIORITY.indexOf(
    label as (typeof PRIMARY_SPEC_PRIORITY)[number]
  );

  return priority === -1 ? PRIMARY_SPEC_PRIORITY.length : priority;
}

export function getPanelSpecs(product: Product) {
  const primarySpec =
    [...product.specs].sort(
      (left, right) => getSpecPriority(left.label) - getSpecPriority(right.label)
    )[0] ?? product.specs[0];

  const rangeSpec =
    product.specs.find((spec) =>
      RANGE_LABELS.includes(spec.label as (typeof RANGE_LABELS)[number])
    ) ?? product.specs.find((spec) => spec.label !== primarySpec?.label);

  return [primarySpec, rangeSpec].filter(
    (spec): spec is NonNullable<typeof spec> => Boolean(spec)
  );
}

export function parseMetricValue(value: string) {
  const match = value.trim().match(/^(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  const numericValue = Number.parseFloat(match[1]);

  if (Number.isNaN(numericValue)) {
    return null;
  }

  return {
    numericValue,
    decimals: match[1].includes(".") ? match[1].split(".")[1].length : 0,
    suffix: match[2].trim(),
  };
}
