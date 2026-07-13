import { ChatMessage } from "../../types/chat/chatTypes";

export const CHAT_DATE_LABEL = "Bugün 12 Mart 2024";

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    text: "Selamun Aleyküm. Ben E-Mümin, dini konularda size yardımcı olmak için buradayım. İslam, Kur'an, hadis ve günlük ibadetler hakkında sorularınızı yanıtlayabilirim.",
  },
  {
    id: "2",
    role: "user",
    text: "İslam'da dürüst ticaretin önemi nedir?",
  },
  {
    id: "3",
    role: "assistant",
    text: "İslam'da dürüst ticaret, hem bireysel ahlak hem de toplumsal adaletin temel taşlarından biridir. Alışverişte hile yapmamak, malın ayıbını gizlememek ve doğru ölçü kullanmak esastır.\n\nPeygamber Efendimiz (s.a.v.), alışveriş yapanların birbirlerine hakkı verdikten sonra hayırlı kazanç kazanmalarını buyurmuştur. Dürüst ticaret, kul hakkına girmemek ve emanete riayet etmek anlamına gelir.",
    sources: [
      "Buhârî, Büyû' 50",
      "Müslim, Müsâkat 106",
      "Kur'an, Nahl 91",
    ],
  },
];
