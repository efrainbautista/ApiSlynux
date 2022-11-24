CREATE TABLE IF NOT EXISTS departments (
  id VARCHAR(2) NOT NULL,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_departments_name(name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS provinces (
  id VARCHAR(4) NOT NULL,
  name VARCHAR(45) NOT NULL,
  department_id VARCHAR(2) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_provinces_name_department_id(name, department_id),
  KEY IX_provinces_department_id(department_id),
  CONSTRAINT FK_provinces_department_id FOREIGN KEY(department_id) REFERENCES departments(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS districts (
  id VARCHAR(6) NOT NULL,
  name VARCHAR(45) NOT NULL,
  province_id VARCHAR(4) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_districts_name_province_id(name, province_id),
  KEY IX_districts_province_id(province_id),
  CONSTRAINT FK_districts_province_id FOREIGN KEY(province_id) REFERENCES provinces(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  district_id VARCHAR(6) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_users_email(email),
  KEY IX_users_district_id(district_id),
  CONSTRAINT FK_users_district_id FOREIGN KEY(district_id) REFERENCES districts(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS clients(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  type ENUM ('C', 'P') NOT NULL DEFAULT 'C',
  created_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_at DATETIME NULL,
  updated_by BIGINT UNSIGNED NULL,
  company_name VARCHAR(150) NULL,
  ruc VARCHAR(11) NULL,
  first_name VARCHAR(75) NULL,
  last_name VARCHAR(75) NULL,
  dni VARCHAR(8) NULL,
  PRIMARY KEY(id),
  UNIQUE INDEX UQ_clients_ruc(ruc),
  UNIQUE INDEX UQ_clients_company_name(company_name), 
  UNIQUE INDEX UQ_clients_dni(dni),
  KEY IX_clients_created_by(created_by),
  KEY IX_clients_updated_by(updated_by),
  CONSTRAINT FK_clients_created_by FOREIGN KEY(created_by) REFERENCES users(id),
  CONSTRAINT FK_clients_updated_by FOREIGN KEY(updated_by) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS accounts(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  number VARCHAR(15) NOT NULL,
  balance DECIMAL(10,2) NULL,
  currency VARCHAR(3) NULL,
  client_id BIGINT UNSIGNED NOT NULL,
  created_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_at DATETIME NULL,
  updated_by BIGINT UNSIGNED NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UQ_accounts_number(number),
  KEY IX_accounts_client_id(client_id),
  KEY IX_accounts_created_by(created_by),
  KEY IX_accounts_updated_by(updated_by),
  CONSTRAINT FK_accounts_client_id FOREIGN KEY(client_id) REFERENCES clients(id),
  CONSTRAINT FK_accounts_created_by FOREIGN KEY(created_by) REFERENCES users(id),
  CONSTRAINT FK_accounts_updated_by FOREIGN KEY(updated_by) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS transactions(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  type CHAR(1) NOT NULL,
  status TINYINT UNSIGNED NOT NULL,
  from_account_id BIGINT UNSIGNED NOT NULL,
  to_account_id BIGINT UNSIGNED NULL,
  amount DECIMAL(10,2) NULL,
  currency VARCHAR(3) NULL,
  created_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_at DATETIME NULL,
  updated_by BIGINT UNSIGNED NULL,
  PRIMARY KEY (id),
  KEY IX_transactions_from_account_id(from_account_id),
  KEY IX_transactions_to_account_id(to_account_id),
  KEY IX_transactions_created_by(created_by),
  KEY IX_transactions_updated_by(updated_by),
  CONSTRAINT FK_transactions_from_account_id FOREIGN KEY(from_account_id) REFERENCES accounts(id),
  CONSTRAINT FK_transactions_to_account_id FOREIGN KEY(to_account_id) REFERENCES accounts(id),
  CONSTRAINT FK_transactions_created_by FOREIGN KEY(created_by) REFERENCES users(id),
  CONSTRAINT FK_transactions_updated_by FOREIGN KEY(updated_by) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;