class Strategy {
  strategies = new Map<string, () => void>();

  draw(shapeType: string) {
    this.strategies.get(shapeType)?.();
  }
}

export const DrawStrategy = new Strategy();
