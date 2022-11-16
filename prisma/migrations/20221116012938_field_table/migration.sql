-- CreateTable
CREATE TABLE `Field` (
    `id` VARCHAR(191) NOT NULL,
    `field_type_id` INTEGER NOT NULL,
    `addr` VARCHAR(191) NULL,
    `gateway` INTEGER NOT NULL,
    `node` INTEGER NOT NULL,
    `min_moist` INTEGER NULL,
    `max_moist` INTEGER NULL,
    `min_temp` DOUBLE NULL,
    `max_temp` DOUBLE NULL,
    `temp_auto` BOOLEAN NOT NULL DEFAULT false,
    `moist_auto` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
