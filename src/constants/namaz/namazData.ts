import { NextPrayer, PrayerDate, PrayerTime } from "../../types/namaz/namazType";

export const NEXT_PRAYER: NextPrayer = {
  name: "İkindi",
  countdown: "02:12:17",
  location: "İstanbul, Türkiye",
};

export const PRAYER_DATE: PrayerDate = {
  hijri: "14 Ramazan 1445",
  gregorian: "24 Mart 2024, Pazar",
};

export const PRAYER_TIMES: PrayerTime[] = [
  {
    id: "imsak",
    name: "İmsak",
    subtitle: "Sahur bitişi",
    time: "05:24",
    icon: "nightlight-round",
  },
  {
    id: "gunes",
    name: "Güneş",
    subtitle: "Kerahat vakti başlangıcı",
    time: "06:51",
    icon: "wb-sunny",
  },
  {
    id: "ogle",
    name: "Öğle",
    subtitle: "Günün ortası",
    time: "13:12",
    icon: "light-mode",
  },
  {
    id: "ikindi",
    name: "İkindi",
    subtitle: "Şu anki vakit",
    time: "16:44",
    icon: "cloud-queue",
  },
  {
    id: "aksam",
    name: "Akşam",
    subtitle: "İftar vakti",
    time: "19:24",
    icon: "brightness-3",
  },
  {
    id: "yatsi",
    name: "Yatsı",
    subtitle: "Yatış vakti",
    time: "20:45",
    icon: "bedtime",
  },
];

export const ACTIVE_PRAYER_ID = "ikindi";
