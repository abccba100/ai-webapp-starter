/**
 * 표준 앱 에러 구조
 */
export type AppError = {
  code: string;
  message: string;
  status?: number;
};

const DEFAULT_STATUS = 500;
const DEFAULT_CODE = "INTERNAL_ERROR";

/**
 * AppError 인스턴스를 생성합니다.
 */
export function createAppError(
  code: string,
  message: string,
  status?: number
): AppError {
  return { code, message, ...(status !== undefined && { status }) };
}

/**
 * unknown/Error를 AppError로 변환합니다.
 * 이미 AppError면 그대로 반환하고, Error면 message를 사용하며, 그 외는 문자열로 변환합니다.
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }
  if (error instanceof Error) {
    return createAppError(
      error.name || DEFAULT_CODE,
      error.message,
      DEFAULT_STATUS
    );
  }
  const message =
    typeof error === "string" ? error : "An unexpected error occurred";
  return createAppError(DEFAULT_CODE, message, DEFAULT_STATUS);
}

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value &&
    typeof (value as AppError).code === "string" &&
    typeof (value as AppError).message === "string"
  );
}

/**
 * AppError를 Web API Response로 변환합니다.
 * status가 없으면 500을 사용합니다.
 */
export function errorToResponse(error: AppError): Response {
  const status = error.status ?? DEFAULT_STATUS;
  return new Response(JSON.stringify(error), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
