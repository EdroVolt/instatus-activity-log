function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function intToHSL(value: number): string {
  const hue = value % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

export function generateGradient(name: string): string {
  const hash = hashCode(name);
  const color1 = intToHSL(hash);
  const color2 = intToHSL(hash * 1.5);
  return `linear-gradient(135deg, ${color1}, ${color2})`;
}
