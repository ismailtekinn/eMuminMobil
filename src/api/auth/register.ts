import { REGISTER_URL } from "../../constants/constant";
import { LoginResponse, RegisterRequest } from "../../types/auth/authType";

/**
 * Yeni kullanıcı kayıt isteğini sunucuya gönderir.
 * Başarılı olursa token ve kullanıcı bilgilerini döner.
 */
export async function register(
  data: RegisterRequest,
): Promise<LoginResponse> {
  const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    let errorMessage = "Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.";

    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        errorMessage = errorBody.message;
      } else if (errorBody?.title) {
        errorMessage = errorBody.title;
      }
    } catch {
      // JSON parse edilemezse varsayılan mesaj kullanılır
    }

    throw new Error(errorMessage);
  }

  return response.json();
}
