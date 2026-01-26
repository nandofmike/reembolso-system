'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Reembolso {
  id: string;
  atribuido: string | null;
  data: string | null;
  anoReferencia: number | null;
  processo: string | null;
  upm: string | null;
  beneficiario: string | null;
  requerente: string | null;
  solicitado: number | null;
  cpfTitular: string | null;
  especialidade: string | null;
  decisao: string | null;
  resultado: string | null;
  pagamento: string | null;
}

interface PaginacaoInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function Home() {
  const [registros, setRegistros] = useState<Reembolso[]>([]);
  const [paginacao, setPaginacao] = useState<PaginacaoInfo>({
    page: 1,
    limit: 25,
    total: 0,
    totalPages: 0,
  });
  const [soma, setSoma] = useState(0);
  const [anos, setAnos] = useState<number[]>([]);
  const [busca, setBusca] = useState('');
  const [filtros, setFiltros] = useState<any>({});
  const [carregando, setCarregando] = useState(false);
  const [importando, setImportando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    carregarDados();
  }, [paginacao.page, filtros]);

  async function carregarDados() {
    setCarregando(true);
    try {
      const params = new URLSearchParams({
        page: paginacao.page.toString(),
        limit: paginacao.limit.toString(),
        search: busca,
        ...filtros,
      });

      const response = await fetch(`/api/reembolsos?${params}`);
      const data = await response.json();

      setRegistros(data.registros);
      setPaginacao(data.paginacao);
      setSoma(data.soma);

      if (data.registros.length > 0) {
        const anosUnicos = Array.from(
          new Set(
            data.registros
              .map((r: Reembolso) => r.anoReferencia)
              .filter(Boolean)
          )
        ).sort((a, b) => (b as number) - (a as number)) as number[];
        setAnos(anosUnicos);
      }
    } catch (error) {
      setMensagem('Erro ao carregar dados');
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  async function handleImportar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportando(true);
    setMensagem('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      });

      const resultado = await response.json();

      if (response.ok) {
        setMensagem(
          `✓ Importação concluída: ${resultado.totalInserido} inseridos, ${resultado.totalAtualizado} atualizados`
        );
        carregarDados();
      } else {
        setMensagem(`✗ Erro: ${resultado.error}`);
      }
    } catch (error) {
      setMensagem('Erro ao importar arquivo');
      console.error(error);
    } finally {
      setImportando(false);
    }
  }

  function handleBusca(e: React.ChangeEvent<HTMLInputElement>) {
    setBusca(e.target.value);
    setPaginacao(prev => ({ ...prev, page: 1 }));
  }

  function handleAplicarFiltros() {
    setPaginacao(prev => ({ ...prev, page: 1 }));
  }

  function handleLimparFiltros() {
    setFiltros({});
    setBusca('');
    setPaginacao(prev => ({ ...prev, page: 1 }));
  }

  function handleExportar(formato: 'csv' | 'excel') {
    const params = new URLSearchParams({
      formato,
      search: busca,
      ...filtros,
    });

    window.location.href = `/api/export?${params}`;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Painel de Reembolso 2025+
          </h1>
          <p className="text-gray-600">
            Gerencie reembolsos com importação, cadastro contínuo e filtros avançados
          </p>
        </div>

        {mensagem && (
          <div
            className={`mb-4 p-4 rounded ${
              mensagem.startsWith('✓')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {mensagem}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Total de Registros</p>
            <p className="text-2xl font-bold">{paginacao.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Registros Filtrados</p>
            <p className="text-2xl font-bold">{registros.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600 text-sm">Soma Solicitado (Filtrado)</p>
            <p className="text-2xl font-bold">
              R$ {soma.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Busca rápida (processo, beneficiário, CPF...)"
              value={busca}
              onChange={handleBusca}
              className="flex-1 px-4 py-2 border rounded"
            />

            <div className="flex gap-2 flex-wrap">
              <Link
                href="/reembolsos/novo"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                + Novo Registro
              </Link>

              <label className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                📤 Importar Excel
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleImportar}
                  disabled={importando}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => handleExportar('csv')}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                📥 Exportar CSV
              </button>

              <button
                onClick={() => handleExportar('excel')}
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                📥 Exportar Excel
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {carregando ? (
            <div className="p-8 text-center">Carregando...</div>
          ) : registros.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum registro encontrado
            </div>
          ) : (
            <>
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-2 text-left">DATA</th>
                    <th className="px-4 py-2 text-left">ANO</th>
                    <th className="px-4 py-2 text-left">PROCESSO</th>
                    <th className="px-4 py-2 text-left">UPM</th>
                    <th className="px-4 py-2 text-left">BENEFICIÁRIO</th>
                    <th className="px-4 py-2 text-left">REQUERENTE</th>
                    <th className="px-4 py-2 text-right">SOLICITADO</th>
                    <th className="px-4 py-2 text-left">ESPECIALIDADE</th>
                    <th className="px-4 py-2 text-left">DECISÃO</th>
                    <th className="px-4 py-2 text-left">RESULTADO</th>
                    <th className="px-4 py-2 text-left">PAGAMENTO</th>
                    <th className="px-4 py-2 text-left">ATRIBUIDO</th>
                    <th className="px-4 py-2 text-center">AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {registros.map((registro) => (
                    <tr key={registro.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">
                        {registro.data
                          ? new Date(registro.data).toLocaleDateString('pt-BR')
                          : '-'}
                      </td>
                      <td className="px-4 py-2">{registro.anoReferencia || '-'}</td>
                      <td className="px-4 py-2">{registro.processo || '-'}</td>
                      <td className="px-4 py-2">{registro.upm || '-'}</td>
                      <td className="px-4 py-2">{registro.beneficiario || '-'}</td>
                      <td className="px-4 py-2">{registro.requerente || '-'}</td>
                      <td className="px-4 py-2 text-right">
                        {registro.solicitado
                          ? `R$ ${registro.solicitado.toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`
                          : '-'}
                      </td>
                      <td className="px-4 py-2">{registro.especialidade || '-'}</td>
                      <td className="px-4 py-2">{registro.decisao || '-'}</td>
                      <td className="px-4 py-2">{registro.resultado || '-'}</td>
                      <td className="px-4 py-2">
                        {registro.pagamento
                          ? new Date(registro.pagamento).toLocaleDateString('pt-BR')
                          : '-'}
                      </td>
                      <td className="px-4 py-2">{registro.atribuido || '-'}</td>
                      <td className="px-4 py-2 text-center">
                        <Link
                          href={`/reembolsos/${registro.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center p-4 border-t">
                <button
                  onClick={() => setPaginacao(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={paginacao.page === 1}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Anterior
                </button>
                <span>
                  Página {paginacao.page} de {paginacao.totalPages}
                </span>
                <button
                  onClick={() => setPaginacao(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={paginacao.page === paginacao.totalPages}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Próxima
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
