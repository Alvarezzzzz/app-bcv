import mysql from "mysql2/promise";
import { DB_CONFIG } from "../config.js";

const connection = await mysql.createConnection(DB_CONFIG);

export class DollarRateModel {
  static async getToday() {
    try {
      const [dolarRate] = await connection.query(
        "select tasa, fecha_validez, fecha_consulta from tasaDolar where fecha_validez = CURDATE() ORDER BY fecha_consulta DESC LIMIT 1;"
      );
      return { dolarRate: dolarRate[0], success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  static async getHistory() {
    try {
      const [dolarRates] = await connection.query(
        `
        SELECT td.tasa, td.fecha_validez, td.fecha_consulta
        FROM tasaDolar td
        JOIN (
            SELECT fecha_validez, MAX(fecha_consulta) AS max_fecha_consulta
            FROM tasaDolar
            GROUP BY fecha_validez
        ) ultimas
        ON td.fecha_validez = ultimas.fecha_validez
        AND td.fecha_consulta = ultimas.max_fecha_consulta
        ORDER BY td.fecha_validez DESC;
        `
      );
      return { dolarRates: dolarRates, success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  static async getRange({ date1, date2 }) {
    if (!date2) {
      try {
        const [dolarRate] = await connection.query(
          "select tasa, fecha_validez, fecha_consulta from tasaDolar where fecha_validez = ? ORDER BY fecha_consulta DESC LIMIT 1;",
          [date1]
        );

        return { dolarRates: dolarRate[0], success: true };
      } catch (error) {
        console.log(error);
        return { success: false };
      }
    } else {
      try {
        const [dolarRates] = await connection.query(
          `
        SELECT td.tasa, td.fecha_validez, td.fecha_consulta
        FROM tasaDolar td
        JOIN (
            SELECT fecha_validez, MAX(fecha_consulta) AS max_fecha_consulta
            FROM tasaDolar
            WHERE fecha_validez BETWEEN '2025-06-18' AND '2025-06-30'
            GROUP BY fecha_validez
        ) latest
        ON td.fecha_validez = latest.fecha_validez
        AND td.fecha_consulta = latest.max_fecha_consulta
        ORDER BY td.fecha_validez DESC;
        `,
          [date1, date2]
        );
        return { dolarRates: dolarRates, success: true };
      } catch (error) {
        console.log(error);
        return { success: false };
      }
    }
  }
}
