import sharp from "sharp";
import { join } from "path";

const source = "src/assets/emuminIcon.jpeg";
const resRoot = "android/app/src/main/res";

// İkon arka planı ile uyumlu koyu yeşil
const bg = { r: 28, g: 46, b: 38, alpha: 1 };

const splashSizes = {
  "drawable-mdpi": 288,
  "drawable-hdpi": 432,
  "drawable-xhdpi": 576,
  "drawable-xxhdpi": 864,
  "drawable-xxxhdpi": 1152,
};

const launcherSizes = {
  "mipmap-mdpi": 48,
  "mipmap-hdpi": 72,
  "mipmap-xhdpi": 96,
  "mipmap-xxhdpi": 144,
  "mipmap-xxxhdpi": 192,
};

const foregroundSizes = {
  "mipmap-mdpi": 108,
  "mipmap-hdpi": 162,
  "mipmap-xhdpi": 216,
  "mipmap-xxhdpi": 324,
  "mipmap-xxxhdpi": 432,
};

async function resizeTo(filePath, size, fit = "contain") {
  await sharp(source)
    .resize(size, size, { fit, background: bg })
    .toFile(filePath);
}

async function main() {
  for (const [folder, size] of Object.entries(splashSizes)) {
    const out = join(resRoot, folder, "splashscreen_logo.png");
    await resizeTo(out, size, "contain");
    console.log("splash:", out);
  }

  for (const [folder, size] of Object.entries(launcherSizes)) {
    const launcher = join(resRoot, folder, "ic_launcher.webp");
    const round = join(resRoot, folder, "ic_launcher_round.webp");
    await sharp(source)
      .resize(size, size, { fit: "cover", position: "centre" })
      .webp()
      .toFile(launcher);
    await sharp(source)
      .resize(size, size, { fit: "cover", position: "centre" })
      .webp()
      .toFile(round);
    console.log("launcher:", launcher);
  }

  for (const [folder, size] of Object.entries(foregroundSizes)) {
    const out = join(resRoot, folder, "ic_launcher_foreground.webp");
    await sharp(source)
      .resize(size, size, { fit: "contain", background: bg })
      .webp()
      .toFile(out);
    console.log("foreground:", out);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
