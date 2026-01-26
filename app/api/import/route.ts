import { NextRequest, NextResponse } from 'next/server';
import { importExcelFile } from '@/app/lib/excel-importer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Arquivo não fornecido' },
        { status: 400 }
      );
    }
    
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      return NextResponse.json(
        { error: 'Apenas arquivos Excel (.xlsx, .xls) são aceitos' },
        { status: 400 }
      );
    }
    
    const resultado = await importExcelFile(file, prisma);
    
    return NextResponse.json(resultado);
  } catch (error) {
    console.error('Erro ao importar:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao importar' },
      { status: 500 }
    );
  }
}
