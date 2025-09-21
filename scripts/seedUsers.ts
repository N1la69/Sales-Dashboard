import { pbkdf2Sync, randomBytes } from "crypto";
import { PrismaClient } from "../app/generated/prisma/index";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding users...");

  const plainPassword = "adminpassword123";

  // Generate salt
  const salt = randomBytes(16).toString("hex");

  // Generate hash using PBKDF2
  const hash = pbkdf2Sync(plainPassword, salt, 10000, 64, "sha512").toString(
    "hex"
  );

  // Create user
  const user = await prisma.user.create({
    data: {
      name: "Test Admin",
      email: "admin@example.com",
      role: "ADMIN",
      isActive: true,
      hash,
      salt,
      image: "https://picsum.photos/100/100",
      lastLogin: new Date(),
      permissionSets: {
        create: [
          {
            page: "dashboard",
            permissions: ["read", "write", "export"],
          },
          {
            page: "settings",
            permissions: ["read", "write"],
          },
        ],
      },
    },
  });

  console.log("🌱 Seeded user:", user.email);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🌱 Seeding completed.")
    process.exit(0);
  });