CREATE TABLE IF NOT EXISTS `contiq`.`notifications` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `action` ENUM('uploaded', 'deleted', 'requested access') NOT NULL,
    `is_read` TINYINT(1) NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `updated_at` TIMESTAMP NOT NULL,
    `actor_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `file_id` INT NOT NULL,
    `is_deleted` BIT(1) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `FK_1` (`user_id` ASC) VISIBLE,
    INDEX `FK_2` (`file_id` ASC) VISIBLE,
    INDEX `FK_3` (`actor_id` ASC) VISIBLE,
    CONSTRAINT `FK_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `contiq`.`users` (`id`),
    CONSTRAINT `FK_3`
    FOREIGN KEY (`file_id`)
    REFERENCES `contiq`.`files` (`id`),
    CONSTRAINT `FK_4`
    FOREIGN KEY (`actor_id`)
    REFERENCES `contiq`.`users` (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;