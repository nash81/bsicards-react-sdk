export class BSICardsError extends Error {
  public readonly code?: number;

  constructor(message: string, code?: number) {
    super(message);
    this.name = "BSICardsError";
    this.code = code;
  }
}

export class BSICardsValidationError extends BSICardsError {
  constructor(message: string) {
    super(message);
    this.name = "BSICardsValidationError";
  }
}

