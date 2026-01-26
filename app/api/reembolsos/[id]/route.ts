import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const reembolso = await prisma.reembolso.findUnique({
      where: { id },
    });
    
    if (!reembolso) {
      return NextResponse.json(
        { error: 'Reembolso não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(reembolso);
  } catch (error) {
    console.error('Erro ao buscar:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao buscar' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const data = body.data ? new Date(body.data) : null;
    const anoReferencia = data ? data.getFullYear() : null;
    
    const cpfTitularLimpo = body.cpfTitular
      ? body.cpfTitular.replace(/\D/g, '') || null
      : null;
    
    const reembolso = await prisma.reembolso.update({
      where: { id },
      data: {
        atribuido: body.atribuido !== undefined ? body.atribuido : undefined,
        data,
        anoReferencia,
        processo: body.processo !== undefined ? body.processo : undefined,
        upm: body.upm !== undefined ? body.upm : undefined,
        beneficiario: body.beneficiario !== undefined ? body.beneficiario : undefined,
        requerente: body.requerente !== undefined ? body.requerente : undefined,
        solicitado: body.solicitado !== undefined ? parseFloat(body.solicitado) : undefined,
        cpfTitular: body.cpfTitular !== undefined ? body.cpfTitular : undefined,
        cpfTitularLimpo,
        distribuicao: body.distribuicao ? new Date(body.distribuicao) : undefined,
        conformidade: body.conformidade ? new Date(body.conformidade) : undefined,
        peg: body.peg !== undefined ? body.peg : undefined,
        especialidade: body.especialidade !== undefined ? body.especialidade : undefined,
        decisao: body.decisao !== undefined ? body.decisao : undefined,
        resultado: body.resultado !== undefined ? body.resultado : undefined,
        pagamento: body.pagamento ? new Date(body.pagamento) : undefined,
        ob: body.ob !== undefined ? body.ob : undefined,
      },
    });
    
    return NextResponse.json(reembolso);
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao atualizar' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const reembolso = await prisma.reembolso.delete({
      where: { id },
    });
    
    return NextResponse.json(reembolso);
  } catch (error) {
    console.error('Erro ao deletar:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao deletar' },
      { status: 500 }
    );
  }
}
