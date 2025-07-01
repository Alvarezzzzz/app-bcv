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
INSERT INTO tasaDolar (tasa, fecha_validez) VALUES (103.0998, '2025-06-19');
INSERT INTO tasaDolar (tasa, fecha_validez) VALUES (104.5498, '2025-06-20');
INSERT INTO tasaDolar (tasa, fecha_validez) VALUES (107.2118, '2025-06-25');
INSERT INTO tasaDolar (tasa, fecha_validez) VALUES (105.6090, '2025-06-26');
INSERT INTO tasaDolar (tasa, fecha_validez) VALUES (106.3437, '2025-06-27');
INSERT INTO tasaDolar (tasa, fecha_validez) VALUES (108.5231, '2025-06-30');

