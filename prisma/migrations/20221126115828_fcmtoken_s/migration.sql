-- CreateTable
CREATE TABLE `Fcmtoken` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `farmerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Fcmtoken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Fcmtoken` ADD CONSTRAINT `Fcmtoken_farmerId_fkey` FOREIGN KEY (`farmerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
