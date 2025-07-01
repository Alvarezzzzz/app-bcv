DROP DATABASE IF EXISTS bcv; 
CREATE DATABASE bcv;
USE bcv;

CREATE TABLE tasaDolar (
  id INT NOT NULL AUTO_INCREMENT,
  tasa DECIMAL(10,4) NOT NULL,
  fecha_validez DATE NOT NULL,
  fecha_consulta TIMESTAMP NOT NULL DEFAULT (now()),
  PRIMARY KEY (id)
);

INSERT INTO tasaDolar (tasa, fecha_validez) VALUES (37.4521, '2025-06-16');
INSERT INTO tasaDolar (tasa, fecha_validez) VALUES (37.4892, '2025-06-17');
INSERT INTO tasaDolar (tasa, fecha_validez) VALUES (37.5210, '2025-06-18');

