import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '25');
    const skip = (page - 1) * limit;
    
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
    
    const [registros, total] = await Promise.all([
      prisma.reembolso.findMany({
        where,
        skip,
        take: limit,
        orderBy: { data: 'desc' },
      }),
      prisma.reembolso.count({ where }),
    ]);
    
    const somaResult = await prisma.reembolso.aggregate({
      where,
      _sum: { solicitado: true },
    });
    
    const totalPages = Math.ceil(total / limit);
    
    return NextResponse.json({
      registros,
      paginacao: {
        page,
        limit,
        total,
        totalPages,
      },
      soma: somaResult._sum.solicitado || 0,
    });
  } catch (error) {
    console.error('Erro ao listar:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao listar' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const data = body.data ? new Date(body.data) : null;
    const anoReferencia = data ? data.getFullYear() : null;
    
    const cpfTitularLimpo = body.cpfTitular
      ? body.cpfTitular.replace(/\D/g, '') || null
      : null;
    
    const reembolso = await prisma.reembolso.create({
      data: {
        atribuido: body.atribuido || null,
        data,
        anoReferencia,
        processo: body.processo || null,
        upm: body.upm || null,
        beneficiario: body.beneficiario || null,
        requerente: body.requerente || null,
        solicitado: body.solicitado ? parseFloat(body.solicitado) : null,
        cpfTitular: body.cpfTitular || null,
        cpfTitularLimpo,
        distribuicao: body.distribuicao ? new Date(body.distribuicao) : null,
        conformidade: body.conformidade ? new Date(body.conformidade) : null,
        peg: body.peg || null,
        especialidade: body.especialidade || null,
        decisao: body.decisao || null,
        resultado: body.resultado || null,
        pagamento: body.pagamento ? new Date(body.pagamento) : null,
        ob: body.ob || null,
      },
    });
    
    return NextResponse.json(reembolso, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao criar' },
      { status: 500 }
    );
  }
}
