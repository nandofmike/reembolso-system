import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const formato = searchParams.get('formato') || 'csv';
    const search = searchParams.get('search');
    const ano = searchParams.get('ano');
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { processo: { contains: search, mode: 'insensitive' } },
        { beneficiario: { contains: search, mode: 'insensitive' } },
        { requerente: { contains: search, mode: 'insensitive' } },
        { cpfTitular: { contains: search, mode: 'insensitive' } },
        { cpfTitularLimpo: { contains: search, mode: 'insensitive' } },
        { upm: { contains: search, mode: 'insensitive' } },
        { especialidade: { contains: search, mode: 'insensitive' } },
        { decisao: { contains: search, mode: 'insensitive' } },
        { resultado: { contains: search, mode: 'insensitive' } },
        { ob: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (ano) {
      where.anoReferencia = parseInt(ano);
    }
    
    const registros = await prisma.reembolso.findMany({
      where,
      orderBy: { data: 'desc' },
    });
    
    const dadosFormatados = registros.map((r: any) => ({
      'ATRIBUIDO': r.atribuido || '',
      'DATA': r.data ? new Date(r.data).toLocaleDateString('pt-BR') : '',
      'ANO': r.anoReferencia || '',
      'PROCESSO': r.processo || '',
      'UPM': r.upm || '',
      'BENEFICIÁRIO': r.beneficiario || '',
      'REQUERENTE': r.requerente || '',
      'SOLICITADO': r.solicitado || '',
      'CPF TITULAR': r.cpfTitular || '',
      'DISTRIBUIÇÃO': r.distribuicao ? new Date(r.distribuicao).toLocaleDateString('pt-BR') : '',
      'CONFORMIDADE': r.conformidade ? new Date(r.conformidade).toLocaleDateString('pt-BR') : '',
      'PEG': r.peg || '',
      'ESPECIALIDADE': r.especialidade || '',
      'DECISÃO': r.decisao || '',
      'RESULTADO': r.resultado || '',
      'PAGAMENTO': r.pagamento ? new Date(r.pagamento).toLocaleDateString('pt-BR') : '',
      'OB': r.ob || '',
    }));
    
    if (formato === 'excel') {
      const ws = XLSX.utils.json_to_sheet(dadosFormatados);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Reembolsos');
      
      const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
      
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename="reembolsos.xlsx"',
        },
      });
    } else {
      const csv = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(dadosFormatados), {
        blankrows: false,
      });
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="reembolsos.csv"',
        },
      });
    }
  } catch (error) {
    console.error('Erro ao exportar:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao exportar' },
      { status: 500 }
    );
  }
}
