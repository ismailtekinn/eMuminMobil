import { LOGIN_URL } from "../../constants/constant";
import { LoginRequest, LoginResponse } from "../../types/auth/authType";

/**
 * Kullanıcı giriş isteğini sunucuya gönderir.
 * Başarılı olursa token ve kullanıcı bilgilerini döner.
 */
export async function login(
  credentials: LoginRequest,
): Promise<LoginResponse> {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  // Sunucu hata döndürdüyse (401, 400 vb.)
  if (!response.ok) {
    let errorMessage = "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.";

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
