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
}
