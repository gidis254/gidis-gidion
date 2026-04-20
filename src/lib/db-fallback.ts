export function isDbUnavailableError(error: unknown): boolean {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";

  return (
    message.includes("Unable to open the database file") ||
    message.includes("PrismaClientInitializationError")
  );
}
