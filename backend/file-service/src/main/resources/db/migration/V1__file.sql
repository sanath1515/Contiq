CREATE TABLE IF NOT EXISTS `contiq`.`files` (
    `id` INT NOT NULL,
    `name` VARCHAR(60) NOT NULL,
    `content` MEDIUMBLOB NOT NULL,
    `type` ENUM('pdf', 'ppt', 'pptx') NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `updated_at` TIMESTAMP NOT NULL,
    `is_deleted` BIT(1) NOT NULL,
    `uploaded_by` INT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `FK_1` (`uploaded_by` ASC) VISIBLE,
    CONSTRAINT `FK_1`
    FOREIGN KEY (`uploaded_by`)
    REFERENCES `contiq`.`users` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;
