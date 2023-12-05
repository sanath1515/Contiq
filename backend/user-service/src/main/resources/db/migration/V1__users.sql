CREATE TABLE IF NOT EXISTS `contiq`.`users` (
    `id` INT NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `name` VARCHAR(60) NOT NULL,
    `password` VARCHAR(72) NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `updated_at` TIMESTAMP NOT NULL,
    `is_deleted` BIT(1) NOT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;