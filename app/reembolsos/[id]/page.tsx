'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function DetalhesReembolso() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [reembolso, setReembolso] = useState<any>(null);
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    carregarReembolso();
  }, [id]);

  async function carregarReembolso() {
    try {
      const response = await fetch(`/api/reembolsos/${id}`);
      if (!response.ok) throw new Error('Reembolso não encontrado');
      const data = await response.json();
      setReembolso(data);
      setFormData(data);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao carregar');
    } finally {
      setCarregando(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro('');

    try {
      const response = await fetch(`/api/reembolsos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao salvar');
      }

      const atualizado = await response.json();
      setReembolso(atualizado);
      setEditando(false);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao salvar');
    } finally {
      setSalvando(false);
    }
  }

  async function handleDeletar() {
    if (!confirm('Tem certeza que deseja deletar este reembolso?')) return;

    setSalvando(true);
    try {
      const response = await fetch(`/api/reembolsos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao deletar');

      router.push('/');
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao deletar');
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    );
  }

  if (!reembolso) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Voltar para Painel
          </Link>
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
            {erro || 'Reembolso não encontrado'}
          </div>
        </div>
      </div>
    );
  }

  const campos = [
    { label: 'DATA', key: 'data', type: 'date' },
    { label: 'PROCESSO', key: 'processo', type: 'text' },
    { label: 'UPM', key: 'upm', type: 'text' },
    { label: 'BENEFICIÁRIO', key: 'beneficiario', type: 'text' },
    { label: 'REQUERENTE', key: 'requerente', type: 'text' },
    { label: 'SOLICITADO', key: 'solicitado', type: 'number' },
    { label: 'CPF TITULAR', key: 'cpfTitular', type: 'text' },
    { label: 'DISTRIBUIÇÃO', key: 'distribuicao', type: 'date' },
    { label: 'CONFORMIDADE', key: 'conformidade', type: 'date' },
    { label: 'PEG', key: 'peg', type: 'text' },
    { label: 'ESPECIALIDADE', key: 'especialidade', type: 'text' },
    { label: 'DECISÃO', key: 'decisao', type: 'text' },
    { label: 'RESULTADO', key: 'resultado', type: 'text' },
    { label: 'PAGAMENTO', key: 'pagamento', type: 'date' },
    { label: 'ATRIBUIDO', key: 'atribuido', type: 'text' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Voltar para Painel
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Detalhes do Reembolso
          </h1>
        </div>

        {erro && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
            {erro}
          </div>
        )}

        {editando ? (
          <form onSubmit={handleSalvar} className="bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campos.map((campo) => (
                <div key={campo.key}>
                  <label className="block text-sm font-medium mb-1">{campo.label}</label>
                  <input
                    type={campo.type}
                    name={campo.key}
                    value={
                      campo.type === 'date' && formData[campo.key]
                        ? formData[campo.key].split('T')[0]
                        : formData[campo.key] || ''
                    }
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">OB (Observação)</label>
              <textarea
                name="ob"
                value={formData.ob || ''}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={salvando}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {salvando ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditando(false);
                  setFormData(reembolso);
                }}
                className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {campos.map((campo) => (
                <div key={campo.key}>
                  <p className="text-gray-600 text-sm">{campo.label}</p>
                  <p className="text-lg font-semibold">
                    {campo.type === 'date' && reembolso[campo.key]
                      ? new Date(reembolso[campo.key]).toLocaleDateString('pt-BR')
                      : reembolso[campo.key] || '-'}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <p className="text-gray-600 text-sm">OB (Observação)</p>
              <p className="text-lg">{reembolso.ob || '-'}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setEditando(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Editar
              </button>
              <button
                onClick={handleDeletar}
                disabled={salvando}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {salvando ? 'Deletando...' : 'Deletar'}
              </button>
              <Link
                href="/"
                className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Voltar
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
