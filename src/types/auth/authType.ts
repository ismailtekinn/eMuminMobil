// Login isteğinde sunucuya gönderilecek alanlar
export interface LoginRequest {
  email: string;
  password: string;
}

// Register isteğinde sunucuya gönderilecek alanlar
export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

// Sunucudan dönen kullanıcı bilgisi
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  dailyRequestLimit: number;
  remainingRequestCount: number;
  membershipStatus: number;
  membershipStartDate: string;
  membershipEndDate: string;
}

// Login başarılı olduğunda sunucunun döndürdüğü cevap
export interface LoginResponse {
  token: string;
  expiresAt: string;
  user: User;
}

// AsyncStorage'a kaydedeceğimiz oturum verisi
export interface StoredAuthData {
  token: string;
  expiresAt: string;
  user: User;
}
