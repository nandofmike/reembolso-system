import * as XLSX from 'xlsx';

export interface ReembolsoRow {
  atribuido?: string;
  data?: string | Date;
  processo?: string;
  upm?: string;
  beneficiario?: string;
  requerente?: string;
  solicitado?: string | number;
  cpfTitular?: string;
  distribuicao?: string | Date;
  conformidade?: string | Date;
  peg?: string;
  especialidade?: string;
  decisao?: string;
  resultado?: string;
  pagamento?: string | Date;
  ob?: string;
}

function parseDate(value: any): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'number') {
    const excelEpoch = new Date(1900, 0, 1);
    const date = new Date(excelEpoch.getTime() + (value - 2) * 24 * 60 * 60 * 1000);
    return isNaN(date.getTime()) ? null : date;
  }
  if (typeof value === 'string') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  }
  return null;
}

function cleanCPF(cpf: string | undefined): string | null {
  if (!cpf) return null;
  const cleaned = String(cpf).replace(/\D/g, '');
  return cleaned.length > 0 ? cleaned : null;
}

function parseNumber(value: any): number | null {
  if (!value) return null;
  const num = parseFloat(String(value));
  return isNaN(num) ? null : num;
}

export async function importExcelFile(
  file: File,
  prisma: any
): Promise<{
  totalLido: number;
  totalInserido: number;
  totalAtualizado: number;
  erros: Array<{ linha: number; erro: string }>;
}> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { cellDates: true });
  
  const sheetName = workbook.SheetNames.find(name => 
    name.toUpperCase() === 'CADASTRO'
  ) || workbook.SheetNames[0];
  
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet) as ReembolsoRow[];
  
  const erros: Array<{ linha: number; erro: string }> = [];
  let totalInserido = 0;
  let totalAtualizado = 0;
  
  for (let i = 0; i < rows.length; i++) {
    try {
      const row = rows[i];
      
      const data = parseDate(row.data);
      const anoReferencia = data ? data.getFullYear() : null;
      const cpfTitularLimpo = cleanCPF(row.cpfTitular);
      const solicitado = parseNumber(row.solicitado);
      
      const dedupeKey = {
        processo: row.processo?.trim() || null,
        data,
        cpfTitularLimpo,
        solicitado,
      };
      
      const existente = await prisma.reembolso.findFirst({
        where: {
          processo: dedupeKey.processo,
          data: dedupeKey.data,
          cpfTitularLimpo: dedupeKey.cpfTitularLimpo,
          solicitado: dedupeKey.solicitado,
        },
      });
      
      const reembolsoData = {
        atribuido: row.atribuido?.trim() || null,
        data,
        anoReferencia,
        processo: row.processo?.trim() || null,
        upm: row.upm?.trim() || null,
        beneficiario: row.beneficiario?.trim() || null,
        requerente: row.requerente?.trim() || null,
        solicitado,
        cpfTitular: row.cpfTitular?.trim() || null,
        cpfTitularLimpo,
        distribuicao: parseDate(row.distribuicao),
        conformidade: parseDate(row.conformidade),
        peg: row.peg?.trim() || null,
        especialidade: row.especialidade?.trim() || null,
        decisao: row.decisao?.trim() || null,
        resultado: row.resultado?.trim() || null,
        pagamento: parseDate(row.pagamento),
        ob: row.ob?.trim() || null,
      };
      
      if (existente) {
        await prisma.reembolso.update({
          where: { id: existente.id },
          data: reembolsoData,
        });
        totalAtualizado++;
      } else {
        await prisma.reembolso.create({
          data: reembolsoData,
        });
        totalInserido++;
      }
    } catch (error) {
      erros.push({
        linha: i + 2,
        erro: error instanceof Error ? error.message : String(error),
      });
    }
  }
  
  return {
    totalLido: rows.length,
    totalInserido,
    totalAtualizado,
    erros,
  };
}
